import { useEffect, useRef, useState, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
}

export default function FadeInSection({ children, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`fade-in-section ${visible ? 'visible' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
