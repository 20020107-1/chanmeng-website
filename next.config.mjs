/** @type {import('next').NextConfig} */
// 在 GitHub Actions 中构建时启用 GitHub Pages 部署配置
const isGitHubPages = !!process.env.GITHUB_ACTIONS;
const isDevelopment = process.env.NODE_ENV !== 'production';
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self'",
  ...(!isDevelopment ? ['upgrade-insecure-requests'] : []),
].join('; ');

const nextConfig = {
  env: {
    NEXT_PUBLIC_BASE_PATH: isGitHubPages ? '/chanmeng-website' : '',
  },
  turbopack: {
    root: process.cwd(),
  },
  // GitHub Pages 静态导出 / Docker standalone 输出
  output: isGitHubPages ? 'export' : 'standalone',

  // 项目站点部署在 GitHub Pages 的仓库子路径下
  ...(isGitHubPages && { basePath: '/chanmeng-website' }),

  // 静态导出需要关闭默认的图片优化
  images: {
    unoptimized: true,
  },

  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],

  async headers() {
    if (isGitHubPages) return [];
    return [{
      source: '/(.*)',
      headers: [
        { key: 'Content-Security-Policy', value: contentSecurityPolicy },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
      ],
    }];
  },
};

export default nextConfig;
