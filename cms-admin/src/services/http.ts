/**
 * Axios 实例：挂载 Mock adapter，统一处理响应与错误
 */
import axios from 'axios'
import { toast } from 'sonner'
import { mockAdapter } from '@/mock/server'
import type { ApiResponse } from '@/types'
import { useAuthStore } from '@/stores/auth'

export const http = axios.create({
  baseURL: '/api',
  adapter: mockAdapter, // 演示环境使用 Mock；接真实后端时删除此行即可
  timeout: 10000,
})

// 请求拦截：附带 token 与用户名（Mock 日志用）
http.interceptors.request.use((config) => {
  const { token, user } = useAuthStore.getState()
  if (token) config.headers.Authorization = `Bearer ${token}`
  if (user) config.headers['X-User-Name'] = user.name
  return config
})

// 响应拦截：统一拆包 { code, data, message }，业务错误全局 Toast
http.interceptors.response.use(
  (res) => {
    const body = res.data as ApiResponse
    if (body.code === 0) return body.data as never
    toast.error(body.message || '操作失败')
    return Promise.reject(new Error(body.message))
  },
  (err) => {
    toast.error(err?.message || '网络异常，请稍后重试')
    return Promise.reject(err)
  },
)

/**
 * 类型化门面：拦截器已把响应拆包成 data，
 * 这里把类型对齐，业务代码拿到的直接是 T
 */
export const api = {
  get: <T>(url: string, config?: Parameters<typeof http.get>[1]) =>
    http.get(url, config) as unknown as Promise<T>,
  post: <T>(url: string, data?: unknown, config?: Parameters<typeof http.post>[2]) =>
    http.post(url, data, config) as unknown as Promise<T>,
  put: <T>(url: string, data?: unknown) => http.put(url, data) as unknown as Promise<T>,
  patch: <T>(url: string, data?: unknown) => http.patch(url, data) as unknown as Promise<T>,
  delete: <T>(url: string) => http.delete(url) as unknown as Promise<T>,
}
