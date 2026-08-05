import { readFile } from 'node:fs/promises'
import { verify as verifyHash } from 'argon2'
import { generate, verify as verifyTotp } from 'otplib'

const credentials = await readFile('.admin-security-credentials.txt', 'utf8')
const env = await readFile('.env.local', 'utf8')

function extract(source, name) {
  return source.match(new RegExp(`^${name}=(.+)$`, 'm'))?.[1]?.trim() || ''
}

const usernameMatches =
  extract(credentials, 'ADMIN_USERNAME') === extract(env, 'ADMIN_USERNAME')
const passwordMatches = await verifyHash(
  extract(env, 'ADMIN_PASSWORD_HASH').replaceAll('\\$', '$'),
  extract(credentials, '临时强密码'),
).catch(() => false)
const secretMatches =
  extract(credentials, 'ADMIN_TOTP_SECRET') === extract(env, 'ADMIN_TOTP_SECRET')
const token = await generate({ secret: extract(env, 'ADMIN_TOTP_SECRET') })
const tokenResult = await verifyTotp({
  secret: extract(env, 'ADMIN_TOTP_SECRET'),
  token,
  epochTolerance: 30,
}).catch(() => ({ valid: false }))
const loginResponse = await fetch('http://localhost:3000/api/admin/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Origin: 'http://localhost:3000',
  },
  body: JSON.stringify({
    username: extract(credentials, 'ADMIN_USERNAME'),
    password: extract(credentials, '临时强密码'),
    totp: token,
  }),
}).catch(() => null)
const loginResult = loginResponse
  ? await loginResponse.json().catch(() => ({}))
  : {}

console.log(JSON.stringify({
  usernameMatches,
  passwordMatches,
  secretMatches,
  totpConfigurationValid: tokenResult.valid,
  loginEndpointAcceptsCredentials: loginResponse?.ok === true,
  loginStatus: loginResponse?.status || 0,
  loginMessage: loginResult.message || '',
}))
