/** @type {import('next').NextConfig} */
// 在 GitHub Actions 中构建时启用 GitHub Pages 部署配置
const isGitHubPages = !!process.env.GITHUB_ACTIONS;

const nextConfig = {
  // GitHub Pages 静态导出
  ...(isGitHubPages && { output: 'export' }),

  // GitHub Pages 需要 basePath (仅部署时生效)
  ...(isGitHubPages && { basePath: '/chanmeng-website' }),

  // 静态导出需要关闭默认的图片优化
  images: {
    unoptimized: true,
  },

  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
};

export default nextConfig;
