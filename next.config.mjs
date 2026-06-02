/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages 静态导出
  output: 'export',

  // GitHub Pages 需要 basePath
  basePath: '/chanmeng-website',

  // 静态导出需要关闭默认的图片优化
  images: {
    unoptimized: true,
  },

  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
};

export default nextConfig;
