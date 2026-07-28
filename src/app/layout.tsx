import "./globals.css";
import HomeShortcut from "@/components/home-shortcut";
import CookieConsent from "@/components/cookie-consent";

export const metadata = {
  metadataBase: new URL('https://20020107-1.github.io/chanmeng-website'),
  title: {
    default: '婵梦科技 · 企业增长解决方案',
    template: '%s | 婵梦科技',
  },
  description: '婵梦科技是AI驱动的合伙制企业增长全链路平台，以AI赋能人才，以合伙成就事业。',
  keywords: ['婵梦科技', 'AI搜索获客', 'GEO', 'AEO', 'LLMO', 'AI内容营销', '全域流量', '商业转化', '杭州'],
  authors: [{ name: '杭州婵梦传媒科技有限公司' }],
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: '婵梦科技 · 企业增长解决方案',
    description: '以AI技术和自研系统为底座，提供搜索获客、内容营销、全域流量与商业转化服务。',
    locale: 'zh_CN',
    type: 'website',
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
                'AI驱动的合伙制企业增长全链路平台，以AI赋能人才，以合伙成就事业。',
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
                streetAddress: '萧山区新街街道垦辉六路799号2号楼901-1室',
              },
              areaServed: {
                '@type': 'Country',
                name: '中国',
              },
              knowsAbout: [
                '企业增长服务',
                'AI赋能',
                '流量投流',
                '零房租产业园',
                '人才孵化',
                '全域营销',
              ],
              slogan: '以AI赋能人才，以合伙成就事业',
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
                'AI驱动，合伙共创，连接企业增长与创业者事业成长。',
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
                'AI驱动的全链路增长服务商，覆盖AI搜索获客、内容营销、全域流量与商业转化。',
              url: 'https://chanmeng.com',
              email: 'yaoyuan@chanmengtech.cn',
              foundingDate: '2026-05',
              slogan: '以AI赋能人才，以合伙成就事业',
              image: 'https://chanmeng.com/og-image.png',
              address: {
                '@type': 'PostalAddress',
                addressLocality: '杭州',
                addressRegion: '浙江',
                addressCountry: 'CN',
                streetAddress: '萧山区新街街道垦辉六路799号2号楼901-1室',
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
                '全域流量投流',
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
