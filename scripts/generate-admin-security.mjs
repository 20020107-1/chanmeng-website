import { randomBytes } from 'node:crypto'
import { argon2id, hash } from 'argon2'
import { generateSecret, generateURI } from 'otplib'

const username = process.argv[2] || 'site-admin'
const password = randomBytes(24).toString('base64url')
const passwordHash = await hash(password, {
  type: argon2id,
  memoryCost: 19456,
  timeCost: 2,
  parallelism: 1,
})
const totpSecret = generateSecret()
const totpUri = generateURI({
  issuer: '婵梦科技后台',
  label: username,
  secret: totpSecret,
})

console.log('请立即保存以下信息；不要截图、不要提交到 Git。')
console.log(`ADMIN_USERNAME=${username}`)
console.log(`临时强密码=${password}`)
console.log(`ADMIN_PASSWORD_HASH=${passwordHash}`)
console.log(`ADMIN_TOTP_SECRET=${totpSecret}`)
console.log(`身份验证器 URI=${totpUri}`)
