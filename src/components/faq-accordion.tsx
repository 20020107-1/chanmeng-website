'use client'

import { useState } from 'react'

type FaqItem = {
  question: string
  answer: string
}

export default function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number>(0)

  return (
    <div className="mt-10 divide-y divide-gray-200 border-y border-gray-200">
      {faqs.map((faq, index) => {
        const open = openIndex === index
        return (
          <div key={faq.question} className="py-6">
            <button
              type="button"
              onClick={() => setOpenIndex(open ? -1 : index)}
              aria-expanded={open}
              className="flex w-full cursor-pointer items-center justify-between gap-6 text-left text-lg font-semibold transition-colors duration-300 hover:text-[#C93A26]"
            >
              <span>
                <span className="mr-5 text-[#E2492F]">{String(index + 1).padStart(2, '0')}</span>
                {faq.question}
              </span>
              <span
                className={`text-2xl font-light text-gray-400 transition-transform duration-500 ease-out ${open ? 'rotate-45' : ''}`}
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-all duration-500 ease-in-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pb-2 pl-12 pt-5 text-base leading-8 text-gray-600">{faq.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
