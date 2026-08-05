export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL
  || 'https://20020107-1.github.io/chanmeng-website'
).replace(/\/$/, '')

export const ORGANIZATION_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`

export function absoluteUrl(pathname = '/') {
  return `${SITE_URL}${pathname.startsWith('/') ? pathname : `/${pathname}`}`
}
