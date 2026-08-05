import "./globals.css";
import HomeShortcut from "@/components/home-shortcut";
import CookieConsent from "@/components/cookie-consent";
import JsonLd from "@/components/json-ld";
import { ORGANIZATION_ID, SITE_URL, WEBSITE_ID, absoluteUrl } from "@/lib/seo";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: '婵梦科技 · 企业增长解决方案',
    template: '%s | 婵梦科技',
  },
  description: '婵梦科技围绕差异化、流量、转化与增效，通过六个结构化阶段帮助企业建立持续增长闭环。',
  keywords: ['婵梦科技', '企业增长闭环', '商业诊断', '差异化定位', '产品体系', 'GEO获客', '短视频获客', '成交转化', '招商增长', '杭州'],
  authors: [{ name: '杭州婵梦传媒科技有限公司' }],
  creator: '杭州婵梦传媒科技有限公司',
  publisher: '杭州婵梦传媒科技有限公司',
  alternates: { canonical: '/' },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: '婵梦科技 · 企业增长解决方案',
    description: '以商业诊断、产品内容、GEO获客、短视频增量、成交转化与招商增长构建六步企业增长闭环。',
    locale: 'zh_CN',
    type: 'website',
    siteName: '婵梦科技',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: '婵梦科技 — 企业增长解决方案',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="zh-CN"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        {children}
        <HomeShortcut />
        <CookieConsent />
        <JsonLd data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Organization',
              '@id': ORGANIZATION_ID,
              name: '杭州婵梦传媒科技有限公司',
              alternateName: '婵梦科技',
              url: SITE_URL,
              logo: absoluteUrl('/icon.svg'),
              image: absoluteUrl('/og-image.svg'),
              description: '围绕差异化、流量、转化与增效，为企业提供六阶段结构化增长服务。',
              foundingDate: '2026-05',
              email: 'yaoyuan@chanmengtech.cn',
              telephone: '+86-198-1234-7986',
              address: {
                '@type': 'PostalAddress',
                addressLocality: '杭州市',
                addressRegion: '浙江省',
                addressCountry: 'CN',
                streetAddress: '萧山区新街街道垦辉六路799号2号楼901-1室',
              },
              areaServed: { '@type': 'Country', name: '中国' },
              knowsAbout: ['商业模式诊断', '差异化定位', '产品服务设计', '企业知识库', 'GEO搜索优化', '短视频获客', '销售转化', '招商模式设计', '渠道复制', '营收增长'],
              slogan: 'AI赋能企业增长，让获客与成交有迹可循',
            },
            {
              '@type': 'WebSite',
              '@id': WEBSITE_ID,
              name: '婵梦科技',
              url: SITE_URL,
              inLanguage: 'zh-CN',
              publisher: { '@id': ORGANIZATION_ID },
            },
          ],
        }} />
      </body>
    </html>
  );
}
