export default function BrandMark() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

  return (
    <span data-brand-mark className="relative block w-14 h-9 translate-x-[5px] -translate-y-[4px] overflow-hidden flex-shrink-0" aria-hidden="true">
      <img
        src={`${basePath}/chanmeng-logo-light.png`}
        alt=""
        className="absolute inset-x-0 top-0 w-full h-auto"
      />
    </span>
  )
}
