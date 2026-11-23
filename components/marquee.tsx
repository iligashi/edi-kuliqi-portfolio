"use client"

import { useRef } from "react"
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useReducedMotion,
} from "motion/react"
import { marqueeWords } from "@/lib/site"

const wrap = (min: number, max: number, v: number) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

/** Infinite marquee that speeds up, reverses and skews with scroll velocity. */
export function Marquee({ baseVelocity = -3 }: { baseVelocity?: number }) {
  const reduce = useReducedMotion()
  const base = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const factor = useTransform(velocity, [-1000, 0, 1000], [-4, 0, 4], { clamp: false })
  const skew = useTransform(velocity, [-2000, 0, 2000], [8, 0, -8])
  const x = useTransform(base, (v) => `${wrap(-50, 0, v)}%`)
  const direction = useRef(1)

  useAnimationFrame((_, delta) => {
    if (reduce) return
    let move = direction.current * baseVelocity * (delta / 1000)
    const f = factor.get()
    if (f < 0) direction.current = -1
    else if (f > 0) direction.current = 1
    move += direction.current * move * f
    base.set(base.get() + move)
  })

  const items = [...marqueeWords, ...marqueeWords]

  return (
    <div className="marquee" aria-hidden>
      <motion.div className="marquee__track" style={{ x, skewX: skew }}>
        {items.map((w, i) => (
          <span key={i} className="marquee__item">
            <span className={i % 2 ? "serif" : undefined}>{w}</span>
            <b>✦</b>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
