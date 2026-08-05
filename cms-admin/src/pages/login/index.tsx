/**
 * 登录页：账号密码 + 图形验证码（前端模拟）+ 记住我
 */
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { RefreshCw } from 'lucide-react'
import { authApi } from '@/services'
import { useAuthStore } from '@/stores/auth'
import { CAPTCHA_LENGTH, STORAGE_PREFIX } from '@/constants'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

/** 生成随机验证码字符 */
function genCaptcha(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  return Array.from({ length: CAPTCHA_LENGTH }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

/** 在 canvas 上绘制带干扰线的验证码 */
function drawCaptcha(canvas: HTMLCanvasElement, code: string) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const { width, height } = canvas
  ctx.clearRect(0, 0, width, height)
  ctx.fillStyle = '#f4f1ec'
  ctx.fillRect(0, 0, width, height)
  // 干扰线
  for (let i = 0; i < 4; i++) {
    ctx.strokeStyle = `hsl(${Math.random() * 360},40%,70%)`
    ctx.beginPath()
    ctx.moveTo(Math.random() * width, Math.random() * height)
    ctx.lineTo(Math.random() * width, Math.random() * height)
    ctx.stroke()
  }
  // 字符
  code.split('').forEach((ch, i) => {
    ctx.save()
    ctx.font = `${22 + Math.random() * 6}px sans-serif`
    ctx.fillStyle = `hsl(${Math.random() * 360},55%,40%)`
    ctx.translate(18 + i * 24, height / 2 + 8)
    ctx.rotate((Math.random() - 0.5) * 0.5)
    ctx.fillText(ch, 0, 0)
    ctx.restore()
  })
}

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation() as { state?: { from?: string } }
  const login = useAuthStore((s) => s.login)
  const token = useAuthStore((s) => s.token)

  const [username, setUsername] = useState(() => localStorage.getItem(STORAGE_PREFIX + 'remember-user') ?? '')
  const [password, setPassword] = useState('')
  const [captchaInput, setCaptchaInput] = useState('')
  const [captcha, setCaptcha] = useState(genCaptcha)
  const [remember, setRemember] = useState(() => !!localStorage.getItem(STORAGE_PREFIX + 'remember-user'))
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // 已登录则直接进入后台
  useEffect(() => {
    if (token) navigate('/', { replace: true })
  }, [token, navigate])

  useEffect(() => {
    if (canvasRef.current) drawCaptcha(canvasRef.current, captcha)
    // 开发调试：暴露当前验证码，便于自动化测试（生产构建前移除）
    ;(window as unknown as Record<string, string>).__captcha = captcha
  }, [captcha])

  const refreshCaptcha = () => {
    setCaptcha(genCaptcha())
    setCaptchaInput('')
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!username.trim()) e.username = '请输入账号'
    if (!password) e.password = '请输入密码'
    else if (password.length < 6) e.password = '密码至少 6 位'
    if (!captchaInput.trim()) e.captcha = '请输入验证码'
    else if (captchaInput.toUpperCase() !== captcha) e.captcha = '验证码不正确'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) {
      if (errors.captcha) refreshCaptcha()
      return
    }
    setSubmitting(true)
    try {
      const res = await authApi.login({ username: username.trim(), password })
      login(res)
      if (remember) localStorage.setItem(STORAGE_PREFIX + 'remember-user', username.trim())
      else localStorage.removeItem(STORAGE_PREFIX + 'remember-user')
      toast.success(`欢迎回来，${res.user.name}`)
      navigate(location.state?.from || '/', { replace: true })
    } catch {
      refreshCaptcha()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader className="items-center text-center">
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-xl font-bold text-primary-foreground">
            婵
          </div>
          <CardTitle className="text-xl">婵梦科技 CMS</CardTitle>
          <CardDescription>企业官网内容管理后台</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-1.5">
              <Label htmlFor="username">账号</Label>
              <Input
                id="username" value={username} autoComplete="username"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin / editor / auditor"
              />
              {errors.username && <p className="text-xs text-destructive">{errors.username}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">密码</Label>
              <Input
                id="password" type="password" value={password} autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="演示密码见 README"
              />
              {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="captcha">验证码</Label>
              <div className="flex gap-2">
                <Input
                  id="captcha" value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  placeholder="输入右图字符"
                />
                <button type="button" onClick={refreshCaptcha} title="点击刷新验证码" className="relative shrink-0">
                  <canvas ref={canvasRef} width={110} height={40} className="rounded-md border" />
                  <RefreshCw className="absolute right-1 top-1 h-3 w-3 text-muted-foreground" />
                </button>
              </div>
              {errors.captcha && <p className="text-xs text-destructive">{errors.captcha}</p>}
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="remember" checked={remember}
                onCheckedChange={(v) => setRemember(v === true)}
              />
              <Label htmlFor="remember" className="cursor-pointer text-sm font-normal">记住我</Label>
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? '登录中…' : '登 录'}
            </Button>
          </form>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            演示账号：admin / Admin@2024（管理员）· editor / Editor@2024（编辑）· auditor / Audit@2024（审核）
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
