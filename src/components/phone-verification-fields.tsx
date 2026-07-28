'use client'

type PhoneVerificationFieldsProps = {
  id: string
  name: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  inputClassName: string
}

export default function PhoneVerificationFields({
  id,
  name,
  value,
  onChange,
  error,
  inputClassName,
}: PhoneVerificationFieldsProps) {
  return (
    <div>
      <div>
        <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-700">
          手机号码 *
        </label>
        <input
          id={id}
          name={name}
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          maxLength={11}
          required
          value={value}
          onChange={onChange}
          placeholder="请输入11位手机号码"
          className={inputClassName}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {error && <p id={`${id}-error`} className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  )
}
