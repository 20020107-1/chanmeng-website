import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const credentialsPath = path.join(root, '.admin-security-credentials.txt')
const envPath = path.join(root, '.env.local')
const content = await readFile(credentialsPath, 'utf8')

function value(name) {
  const match = content.match(new RegExp(`^${name}=(.+)$`, 'm'))
  if (!match?.[1]?.trim()) throw new Error(`缺少 ${name}`)
  return match[1].trim()
}

const env = [
  `ADMIN_USERNAME=${value('ADMIN_USERNAME')}`,
  `ADMIN_PASSWORD_HASH=${value('ADMIN_PASSWORD_HASH').replaceAll('$', '\\$')}`,
  `ADMIN_TOTP_SECRET=${value('ADMIN_TOTP_SECRET')}`,
  'APP_ORIGIN=http://localhost:3000',
  '',
].join('\n')

await writeFile(envPath, env, { encoding: 'utf8', mode: 0o600 })
console.log('后台安全配置已写入 .env.local')
