"use client"

import { useRef, type ReactNode, type PointerEvent } from "react"
import { motion, useMotionValue, useSpring, type Variants } from "motion/react"

export const ease = [0.22, 1, 0.36, 1] as const

/** Pulls its child toward the pointer while hovered. */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15, mass: 0.3 })
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15, mass: 0.3 })

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div ref={ref} className="magnetic" style={{ x, y }} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </motion.div>
  )
}

const charParent: Variants = {
  hidden: {},
  show: (delay: number = 0) => ({ transition: { staggerChildren: 0.035, delayChildren: delay } }),
}
const charChild: Variants = {
  hidden: { y: "110%", rotate: 6 },
  show: { y: "0%", rotate: 0, transition: { duration: 0.9, ease } },
}

/** Splits text into characters that rise out of a mask. Screen readers get the plain string. */
export function SplitChars({
  text,
  delay = 0,
  className,
  animateOnMount = false,
}: {
  text: string
  delay?: number
  className?: string
  animateOnMount?: boolean
}) {
  const trigger = animateOnMount ? { animate: "show" } : { whileInView: "show", viewport: { once: true, amount: 0.6 } }
  return (
    <motion.span className={`split ${className ?? ""}`} variants={charParent} initial="hidden" custom={delay} {...trigger} aria-hidden>
      {Array.from(text).map((c, i) => (
        <span className="split__mask" key={i}>
          <motion.span className="split__char" variants={charChild}>
            {c === " " ? " " : c}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

/** Simple fade-up on enter. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: "div" | "li" | "p"
}) {
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </Comp>
  )
}
