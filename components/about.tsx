"use client"

import { useEffect, useRef } from "react"
import { animate, motion, useInView, useMotionValue, useScroll, useTransform, type MotionValue } from "motion/react"
import { stats } from "@/lib/site"

const copy =
  "I'm Edi — a graphic designer from Pristina with three years of designing for publishing, retail and local brands. I work where craft meets commerce: covers that sell, layouts that read beautifully, and brand systems that hold together. Now studying Business & Marketing to make every design decision a smarter one."

function Word({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.12, 1])
  return (
    <span className="word">
      <motion.span style={{ opacity }}>{word}</motion.span>{" "}
    </span>
  )
}

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.8 })
  const value = useMotionValue(0)
  const text = useTransform(value, (v) => Math.round(v).toString())

  useEffect(() => {
    if (!inView) return
    const c = animate(value, to, { duration: 2, ease: [0.22, 1, 0.36, 1] })
    return () => c.stop()
  }, [inView, to, value])

  return (
    <span ref={ref} className="stat__n">
      <motion.span>{text}</motion.span>
      {suffix && <span className="stat__plus">{suffix}</span>}
    </span>
  )
}

export function About() {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] })
  const words = copy.split(" ")

  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <p className="eyebrow">( 03 ) — About</p>
      <h2 id="about-title" className="sr-only">
        About Edi Kuliqi
      </h2>
      {/* Full sentence for crawlers & screen readers; animated words are decorative. */}
      <p className="sr-only">{copy}</p>
      <p ref={ref} className="about__big" aria-hidden>
        {words.map((w, i) => (
          <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
        ))}
      </p>

      <div className="stats">
        {stats.map((s) => (
          <div className="stat" key={s.label}>
            <Counter to={s.value} suffix={s.suffix} />
            <p>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
