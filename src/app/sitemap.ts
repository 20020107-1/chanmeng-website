export const dynamic = "force-static";

import type { MetadataRoute } from 'next'
import { CASE_STUDIES } from '@/data/cases'
import { NEWS_ARTICLES } from '@/data/news'
import { SERVICE_DETAILS } from '@/data/services'
import { absoluteUrl } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ['/', '/about', '/services', '/geo-system', '/pricing', '/solutions', '/cases', '/news', '/contact', '/partner', '/partners', '/platforms', '/privacy', '/terms']
  const dynamicPaths = [
    ...SERVICE_DETAILS.map((item) => `/services/${item.slug}`),
    ...CASE_STUDIES.map((item) => `/cases/${item.slug}`),
    ...NEWS_ARTICLES.map((item) => `/news/${item.slug}`),
  ]
  const now = new Date()

  return [...staticPaths, ...dynamicPaths].map((pathname) => ({
    url: absoluteUrl(pathname),
    lastModified: now,
    changeFrequency: pathname === '/' ? 'weekly' : 'monthly',
    priority: pathname === '/' ? 1 : pathname.split('/').length === 2 ? 0.8 : 0.7,
  }))
}
