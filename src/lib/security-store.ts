import { createHash, randomBytes } from 'crypto'
import { mkdir, readFile, rename, writeFile } from 'fs/promises'
import path from 'path'

type SessionRecord = {
  tokenHash: string
  username: string
  ip: string
  userAgent: string
  createdAt: string
  lastSeenAt: string
  expiresAt: string
}

type AttemptRecord = {
  failures: number
  firstFailureAt: string
  lockedUntil?: string
}

export type AuditEvent = {
  id: string
  event: string
  actor: string
  ip: string
  detail?: string
  createdAt: string
}

// Keep frequently updated runtime state outside the Next.js source tree so
// development file watching does not trigger page refreshes/flicker.
const DATA_DIR = process.env.RUNTIME_DATA_DIR
  || path.join(process.env.LOCALAPPDATA || process.cwd(), 'chanmeng-website-runtime')
const SESSION_FILE = path.join(DATA_DIR, 'admin-sessions.json')
const ATTEMPT_FILE = path.join(DATA_DIR, 'admin-login-attempts.json')
const AUDIT_FILE = path.join(DATA_DIR, 'admin-audit-log.json')
const FORM_RATE_FILE = path.join(DATA_DIR, 'form-rate-limits.json')
const SESSION_HOURS = 8
const IDLE_MINUTES = 30
const FAILURE_WINDOW_MINUTES = 10
const LOCK_MINUTES = 15
const MAX_FAILURES = 5

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await readFile(file, 'utf8')) as T
  } catch {
    return fallback
  }
}

async function atomicWrite(file: string, value: unknown) {
  await mkdir(DATA_DIR, { recursive: true })
  const temp = `${file}.${process.pid}.${Date.now()}.tmp`
  await writeFile(temp, JSON.stringify(value, null, 2), { encoding: 'utf8', mode: 0o600 })
  await rename(temp, file)
}

function tokenHash(token: string) {
  return createHash('sha256').update(token).digest('hex')
}

export async function createSession(username: string, ip: string, userAgent: string) {
  const token = randomBytes(32).toString('base64url')
  const now = new Date()
  const sessions = await readJson<SessionRecord[]>(SESSION_FILE, [])
  const active = sessions.filter((session) => new Date(session.expiresAt).getTime() > now.getTime())
  active.push({
    tokenHash: tokenHash(token),
    username,
    ip,
    userAgent: userAgent.slice(0, 300),
    createdAt: now.toISOString(),
    lastSeenAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + SESSION_HOURS * 60 * 60 * 1000).toISOString(),
  })
  await atomicWrite(SESSION_FILE, active)
  return token
}

export async function verifySession(token: string | undefined) {
  if (!token) return null
  const sessions = await readJson<SessionRecord[]>(SESSION_FILE, [])
  const now = Date.now()
  const index = sessions.findIndex((session) => session.tokenHash === tokenHash(token))
  if (index < 0) return null
  const session = sessions[index]
  const idleExpired = now - new Date(session.lastSeenAt).getTime() > IDLE_MINUTES * 60 * 1000
  if (new Date(session.expiresAt).getTime() <= now || idleExpired) {
    sessions.splice(index, 1)
    await atomicWrite(SESSION_FILE, sessions)
    return null
  }
  if (now - new Date(session.lastSeenAt).getTime() > 60_000) {
    sessions[index] = { ...session, lastSeenAt: new Date(now).toISOString() }
    await atomicWrite(SESSION_FILE, sessions)
  }
  return { username: session.username }
}

export async function revokeSession(token: string | undefined) {
  if (!token) return
  const sessions = await readJson<SessionRecord[]>(SESSION_FILE, [])
  await atomicWrite(SESSION_FILE, sessions.filter((session) => session.tokenHash !== tokenHash(token)))
}

export async function getLoginBlock(key: string) {
  const attempts = await readJson<Record<string, AttemptRecord>>(ATTEMPT_FILE, {})
  const record = attempts[key]
  if (!record?.lockedUntil) return { blocked: false, retryAfter: 0 }
  const remaining = new Date(record.lockedUntil).getTime() - Date.now()
  return { blocked: remaining > 0, retryAfter: Math.max(0, Math.ceil(remaining / 1000)) }
}

export async function recordLoginFailure(key: string) {
  const attempts = await readJson<Record<string, AttemptRecord>>(ATTEMPT_FILE, {})
  const now = Date.now()
  const previous = attempts[key]
  const windowExpired = !previous || now - new Date(previous.firstFailureAt).getTime() > FAILURE_WINDOW_MINUTES * 60 * 1000
  const record: AttemptRecord = windowExpired
    ? { failures: 1, firstFailureAt: new Date(now).toISOString() }
    : { ...previous, failures: previous.failures + 1 }
  if (record.failures >= MAX_FAILURES) record.lockedUntil = new Date(now + LOCK_MINUTES * 60 * 1000).toISOString()
  attempts[key] = record
  await atomicWrite(ATTEMPT_FILE, attempts)
  return record
}

export async function clearLoginFailures(key: string) {
  const attempts = await readJson<Record<string, AttemptRecord>>(ATTEMPT_FILE, {})
  if (!(key in attempts)) return
  delete attempts[key]
  await atomicWrite(ATTEMPT_FILE, attempts)
}

export async function writeAudit(event: Omit<AuditEvent, 'id' | 'createdAt'>) {
  const log = await readJson<AuditEvent[]>(AUDIT_FILE, [])
  log.unshift({
    ...event,
    id: randomBytes(12).toString('hex'),
    createdAt: new Date().toISOString(),
  })
  await atomicWrite(AUDIT_FILE, log.slice(0, 5000))
}

export async function readAuditLog() {
  return readJson<AuditEvent[]>(AUDIT_FILE, [])
}

export async function consumeFormSubmission(ip: string) {
  const records = await readJson<Record<string, number[]>>(FORM_RATE_FILE, {})
  const now = Date.now()
  const recent = (records[ip] || []).filter((time) => now - time < 10 * 60 * 1000)
  if (recent.length >= 5) return { allowed: false, retryAfter: Math.ceil((recent[0] + 10 * 60 * 1000 - now) / 1000) }
  records[ip] = [...recent, now]
  await atomicWrite(FORM_RATE_FILE, records)
  return { allowed: true, retryAfter: 0 }
}
