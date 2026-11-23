"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, type MotionValue } from "motion/react"
import { steps } from "@/lib/site"

function Step({
  step,
  i,
  total,
  progress,
}: {
  step: (typeof steps)[number]
  i: number
  total: number
  progress: MotionValue<number>
}) {
  // Each card shrinks slightly as later cards stack over it.
  const target = 1 - (total - 1 - i) * 0.04
  const scale = useTransform(progress, [i / total, 1], [1, target])
  return (
    <li className="step" style={{ top: `calc(14vh + ${i * 28}px)` }}>
      <motion.div className={`step__card step__card--${i}`} style={{ scale }}>
        <span className="step__n">0{i + 1}</span>
        <h3>{step.title}</h3>
        <p>{step.body}</p>
        <span className="step__tag">{step.tag}</span>
      </motion.div>
    </li>
  )
}

/** Sticky cards that stack and scale back as you scroll. */
export function Process() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })

  return (
    <section className="process" aria-labelledby="process-title">
      <div className="section-head">
        <p className="eyebrow">( 04 ) — Process</p>
        <h2 id="process-title" className="h2">
          From brief to <em className="serif">press.</em>
        </h2>
      </div>
      <ol ref={ref} className="steps">
        {steps.map((s, i) => (
          <Step key={s.title} step={s} i={i} total={steps.length} progress={scrollYProgress} />
        ))}
      </ol>
    </section>
  )
}
