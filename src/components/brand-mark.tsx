export default function BrandMark() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

  return (
    <span data-brand-mark className="relative block h-9 w-12 flex-shrink-0 overflow-hidden" aria-hidden="true">
      <img
        src={`${basePath}/chanmeng-logo-light.png`}
        alt=""
        className="absolute inset-x-0 -top-px h-auto w-full"
      />
    </span>
  )
}
