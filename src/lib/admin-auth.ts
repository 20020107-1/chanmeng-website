import { timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'
import { verify as verifyHash } from 'argon2'
import { createSession, revokeSession, verifySession } from '@/lib/security-store'

const COOKIE_NAME = process.env.NODE_ENV === 'production'
  ? '__Host-chanmeng_admin_session'
  : 'chanmeng_admin_session'

function constantTimeEqual(left: string, right: string) {
  const expected = Buffer.from(left)
  const received = Buffer.from(right)
  return expected.length === received.length && timingSafeEqual(expected, received)
}

export function securityConfigured() {
  return Boolean(
    process.env.ADMIN_USERNAME &&
    process.env.ADMIN_PASSWORD_HASH,
  )
}

export async function validAdminCredentials(username: string, password: string) {
  const expectedUser = process.env.ADMIN_USERNAME || ''
  if (!expectedUser || !constantTimeEqual(expectedUser, username)) return false

  const configuredHash = process.env.ADMIN_PASSWORD_HASH
  const passwordValid = configuredHash
    ? await verifyHash(configuredHash, password).catch(() => false)
    : false
  return passwordValid
}

export async function setAdminSession(username: string, ip: string, userAgent: string) {
  const token = await createSession(username, ip, userAgent)
  const store = await cookies()
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8,
  })
}

export async function clearAdminSession() {
  const store = await cookies()
  const token = store.get(COOKIE_NAME)?.value
  await revokeSession(token)
  store.delete(COOKIE_NAME)
}

export async function getAdminSession() {
  const store = await cookies()
  return verifySession(store.get(COOKIE_NAME)?.value)
}

export async function isAdminAuthenticated() {
  return Boolean(await getAdminSession())
}
