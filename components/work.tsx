"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useSpring, useTransform } from "motion/react"
import { projects } from "@/lib/site"
import { Art } from "./art"
import { ease } from "./motion-primitives"

/** Pinned section whose vertical scroll drives a horizontal gallery (desktop); a plain grid on small screens. */
export function Work() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLOListElement>(null)
  const [distance, setDistance] = useState(0)
  const [horizontal, setHorizontal] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px) and (prefers-reduced-motion: no-preference)")
    const measure = () => {
      setHorizontal(mq.matches)
      const track = trackRef.current
      if (track) setDistance(Math.max(0, track.scrollWidth - window.innerWidth))
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (trackRef.current) ro.observe(trackRef.current)
    mq.addEventListener("change", measure)
    window.addEventListener("resize", measure)
    return () => {
      ro.disconnect()
      mq.removeEventListener("change", measure)
      window.removeEventListener("resize", measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] })
  const raw = useTransform(scrollYProgress, [0, 1], [0, -distance])
  const x = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 })
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section
      id="work"
      ref={sectionRef}
      className={`work ${horizontal ? "work--h" : ""}`}
      style={horizontal ? { height: `calc(100vh + ${distance}px)` } : undefined}
      aria-labelledby="work-title"
    >
      <div className="work__pin">
        <div className="work__head">
          <p className="eyebrow">( 01 ) — Selected work</p>
          <h2 id="work-title" className="h2">
            Work that lives on <em className="serif">shelves,</em> streets &amp; screens.
          </h2>
          <div className="work__progress" aria-hidden>
            <motion.span style={{ scaleX: horizontal ? progress : 1 }} />
          </div>
        </div>

        <motion.ol ref={trackRef} className="work__track" style={horizontal ? { x } : undefined}>
          {projects.map((p, i) => (
            <motion.li
              key={p.slug}
              className="card"
              data-cursor="View"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, ease, delay: (i % 3) * 0.08 }}
            >
              <motion.div
                className={`card__art art-${p.art}`}
                whileHover={{ scale: 0.97 }}
                transition={{ duration: 0.6, ease }}
              >
                <motion.div className="card__inner" whileHover={{ scale: 1.12, rotate: -2 }} transition={{ duration: 0.8, ease }}>
                  <Art kind={p.art} />
                </motion.div>
              </motion.div>
              <div className="card__info">
                <span className="card__num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{p.title}</h3>
                <p>{p.tags}</p>
                <span className="card__year">{p.year}</span>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}
