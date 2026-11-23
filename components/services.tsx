"use client"

import { useRef, useState, type PointerEvent } from "react"
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react"
import { services } from "@/lib/site"
import { Reveal, ease } from "./motion-primitives"

/** Hover list: a preview tile follows the pointer and swaps per row. */
export function Services() {
  const listRef = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState<number | null>(null)
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 24, mass: 0.5 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 24, mass: 0.5 })

  const onMove = (e: PointerEvent<HTMLUListElement>) => {
    const r = listRef.current?.getBoundingClientRect()
    if (!r) return
    x.set(e.clientX - r.left)
    y.set(e.clientY - r.top)
  }

  return (
    <section id="services" className="services" aria-labelledby="services-title">
      <div className="section-head">
        <p className="eyebrow">( 02 ) — Services</p>
        <h2 id="services-title" className="h2">
          What I can <em className="serif">make</em> for you.
        </h2>
      </div>

      <ul ref={listRef} className="svc" onPointerMove={onMove} onPointerLeave={() => setActive(null)}>
        {services.map((s, i) => (
          <Reveal as="li" key={s.title} delay={i * 0.06} className="svc__row">
            <div className="svc__hit" onPointerEnter={() => setActive(i)}>
              <span className="svc__n">0{i + 1}</span>
              <h3 className="svc__t">
                <span>{s.title}</span>
              </h3>
              <p className="svc__d">{s.body}</p>
              <span className="svc__arrow" aria-hidden>
                ↗
              </span>
            </div>
          </Reveal>
        ))}

        <motion.div
          className="svc__preview"
          aria-hidden
          style={{ x, y }}
          animate={{ scale: active === null ? 0 : 1, opacity: active === null ? 0 : 1 }}
          transition={{ duration: 0.4, ease }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {active !== null && (
              <motion.div
                key={active}
                className={`pv pv--${services[active].tone}`}
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.5, ease }}
              >
                <span>{services[active].glyph}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </ul>
    </section>
  )
}
