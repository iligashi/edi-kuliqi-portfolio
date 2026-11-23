"use client"

import { useEffect, type ReactNode } from "react"
import Lenis from "lenis"

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    // Route in-page anchor clicks through Lenis so they glide instead of jump.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
      if (!link) return
      const id = link.getAttribute("href")
      if (!id || id === "#") return
      const target = id === "#top" ? 0 : document.querySelector<HTMLElement>(id)
      if (target === null) return
      e.preventDefault()
      lenis.scrollTo(target, { offset: 0, duration: 1.4 })
      history.replaceState(null, "", id)
    }
    document.addEventListener("click", onClick)

    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener("click", onClick)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
