"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "motion/react"

/** Blend-mode cursor that grows and shows a label over elements with `data-cursor`. */
export function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 })
  const [label, setLabel] = useState<string | null>(null)
  const [hover, setHover] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)")
    if (!fine.matches) return
    setEnabled(true)
    document.documentElement.classList.add("has-cursor")

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor], a, button")
      setLabel(el?.dataset.cursor ?? null)
      setHover(Boolean(el))
    }
    window.addEventListener("pointermove", move, { passive: true })
    return () => {
      window.removeEventListener("pointermove", move)
      document.documentElement.classList.remove("has-cursor")
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden
      className={`cursor ${label ? "cursor--label" : ""}`}
      style={{ x: sx, y: sy }}
      animate={{ width: label ? 96 : hover ? 44 : 14, height: label ? 96 : hover ? 44 : 14 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <motion.span className="cursor__label" animate={{ opacity: label ? 1 : 0, scale: label ? 1 : 0.4 }}>
        {label}
      </motion.span>
    </motion.div>
  )
}
