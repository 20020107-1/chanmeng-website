'use client'

import { useState, useEffect, useCallback } from 'react'

interface TypewriterSwapProps {
  phrases: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
  className?: string
}

export default function TypewriterSwap({
  phrases,
  typingSpeed = 60,
  deletingSpeed = 30,
  pauseDuration = 2000,
  className = '',
}: TypewriterSwapProps) {
  const [text, setText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [paused, setPaused] = useState(false)

  const tick = useCallback(() => {
    const current = phrases[phraseIndex]

    if (paused) return

    if (!deleting) {
      if (charIndex < current.length) {
        setText(current.slice(0, charIndex + 1))
        setCharIndex((c) => c + 1)
      } else {
        setPaused(true)
        setTimeout(() => {
          setPaused(false)
          setDeleting(true)
        }, pauseDuration)
      }
    } else {
      if (charIndex > 0) {
        setText(current.slice(0, charIndex - 1))
        setCharIndex((c) => c - 1)
      } else {
        setDeleting(false)
        setPhraseIndex((p) => (p + 1) % phrases.length)
      }
    }
  }, [charIndex, deleting, paused, phraseIndex, phrases, pauseDuration])

  useEffect(() => {
    const speed = deleting ? deletingSpeed : typingSpeed
    const timer = setTimeout(tick, speed)
    return () => clearTimeout(timer)
  }, [tick, deletingSpeed, typingSpeed])

  return (
    <span className={className}>
      {text}
      <span className="inline-block w-[2px] h-[1em] bg-blue-500 ml-0.5 align-middle animate-pulse" />
    </span>
  )
}
