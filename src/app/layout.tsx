import { Geist, Geist_Mono, Noto_Sans_SC } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sc",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata = {
  // 部署后需要改成你的实际网址（如 https://username.github.io/repo-name）
  metadataBase: new URL('https://chanmeng.com'),
  title: {
    default: '婵梦科技 · 增长全链路 | 中国企业终身增长合伙人',
    template: '%s | 婵梦科技',
  },
  description: '婵梦科技通过AI+流量+人才+产业四维模式，为企业提供从人才孵化、流量获客、品牌出海到全链路服务的一站式解决方案。',
  keywords: ['婵梦科技', '企业服务', '增长全链路', '跨境电商', 'AI赋能', '产业园', '流量获客', '品牌出海', '杭州'],
  authors: [{ name: '杭州婵梦传媒科技有限公司' }],
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: '婵梦科技 · 增长全链路 | 中国企业终身增长合伙人',
    description: '从流量到交付，一站式解决企业所有增长难题。AI+流量+人才+产业，打造中国企业服务第一极。',
    locale: 'zh_CN',
    type: 'website',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: '婵梦科技 — 中国企业终身增长合伙人',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSansSC.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        {/* GEO: Organization 结构化数据 — AI 搜索引擎引用 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: '婵梦科技',
              alternateName: '杭州婵梦传媒科技有限公司',
              description:
                '中国企业终身增长合伙人。通过AI+流量+人才+产业四维模式，提供从获客到品牌出海的一站式企业增长服务。',
              url: 'https://chanmeng.com',
              foundingDate: '2026-05',
              founder: {
                '@type': 'Person',
                name: '婵梦科技创始人',
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: '杭州',
                addressRegion: '浙江',
                addressCountry: 'CN',
              },
              areaServed: {
                '@type': 'Country',
                name: '中国',
              },
              knowsAbout: [
                '企业增长服务',
                '跨境电商',
                'AI赋能',
                '流量投流',
                '品牌出海',
                '零房租产业园',
                '人才孵化',
                '全域营销',
              ],
              slogan: 'AI+流量+人才+产业，企业全链路增长服务',
            }),
          }}
        />
        {/* GEO: WebSite 结构化数据 — Sitelinks Searchbox */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: '婵梦科技',
              url: 'https://chanmeng.com',
              description:
                '中国企业终身增长合伙人。AI+流量+人才+产业四维驱动增长。',
              inLanguage: 'zh-CN',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://chanmeng.com/search?q={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        {/* GEO: LocalBusiness 结构化数据 — 本地企业 AI 引用核心 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: '杭州婵梦传媒科技有限公司',
              alternateName: '婵梦科技',
              description:
                '中国企业终身增长合伙人。通过AI+流量+人才+产业四维模式，提供从人才孵化、流量获客、品牌出海到全链路服务的一站式解决方案。',
              url: 'https://chanmeng.com',
              telephone: '400-000-0000',
              email: 'contact@chanmeng.com',
              foundingDate: '2026-05',
              slogan: 'AI+流量+人才+产业，企业全链路增长服务',
              image: 'https://chanmeng.com/og-image.png',
              address: {
                '@type': 'PostalAddress',
                addressLocality: '杭州',
                addressRegion: '浙江',
                addressCountry: 'CN',
                streetAddress: '萧山区',
                postalCode: '311200',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: '30.1815',
                longitude: '120.2596',
              },
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '09:00',
                closes: '18:00',
              },
              areaServed: {
                '@type': 'Country',
                name: '中国',
              },
              knowsAbout: [
                '跨境电商人才孵化',
                '全域流量投流',
                '品牌出海全案',
                '零房租产业园',
                'AI企业赋能',
                '财税法律服务',
                '政府补贴申请',
              ],
              sameAs: [
                'https://chanmeng.com',
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
