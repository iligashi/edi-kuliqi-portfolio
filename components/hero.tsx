"use client"

import { useEffect, useRef } from "react"
import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "motion/react"
import { useIntroDone } from "./intro"
import { Magnetic, SplitChars, ease } from "./motion-primitives"

function Float({
  depth,
  mx,
  my,
  className,
  delay,
  children,
}: {
  depth: number
  mx: MotionValue<number>
  my: MotionValue<number>
  className: string
  delay: number
  children: React.ReactNode
}) {
  const ready = useIntroDone()
  const x = useTransform(mx, (v) => v * depth * 40)
  const y = useTransform(my, (v) => v * depth * 40)
  return (
    <motion.div className={`float ${className}`} style={{ x, y }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
        animate={ready ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
        transition={{ duration: 1.2, ease, delay }}
      >
        <motion.div
          className="float__bob"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5 + depth * 2, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.08, rotate: 0 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export function Hero() {
  const ready = useIntroDone()
  const ref = useRef<HTMLElement>(null)
  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 })
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 })

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"])
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.88])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5)
      my.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [mx, my])

  return (
    <section ref={ref} className="hero" aria-labelledby="hero-title">
      <motion.div
        className="hero__meta"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <span>( Graphic Designer )</span>
        <span>Publishing · Branding · Digital</span>
        <span>Pristina, Kosovo — 42.66° N</span>
      </motion.div>

      <motion.h1 id="hero-title" className="hero__title" style={{ y: titleY, scale: titleScale }}>
        <span className="sr-only">Edi Kuliqi — Graphic Designer in Pristina</span>
        <span className="line">{ready && <SplitChars text="Edi" animateOnMount />}</span>
        <span className="line line--indent" aria-hidden>
          <span className="split__mask">
            <motion.em
              className="serif hero__k"
              initial={{ y: "110%" }}
              animate={ready ? { y: "0%" } : undefined}
              transition={{ duration: 1.1, ease, delay: 0.15 }}
            >
              K
            </motion.em>
          </span>
          {ready && <SplitChars text="uliqi" animateOnMount delay={0.2} />}
          <motion.span
            className="hero__reg"
            initial={{ opacity: 0, rotate: -180 }}
            animate={ready ? { opacity: 1, rotate: 0 } : undefined}
            transition={{ duration: 1.2, ease, delay: 0.6 }}
          >
            ®
          </motion.span>
        </span>
      </motion.h1>

      <div className="hero__floats" aria-hidden>
        <Float depth={0.6} mx={mx} my={my} className="float--1" delay={0.5}>
          <div className="cover cover--red">
            <span>
              Deti i<br />
              Heshtur
            </span>
            <small>roman</small>
          </div>
        </Float>
        <Float depth={1.2} mx={mx} my={my} className="float--2" delay={0.65}>
          <div className="cover cover--ink">
            <span>
              Fjalë
              <br />
              &amp; Hije
            </span>
            <small>poezi</small>
          </div>
        </Float>
        <Float depth={0.9} mx={mx} my={my} className="float--3" delay={0.8}>
          <div className="swatch">
            <i />
            <i />
            <i />
            <i />
          </div>
        </Float>
        <Float depth={1.5} mx={mx} my={my} className="float--4" delay={0.95}>
          <div className="badge">
            3+
            <small>
              years in
              <br />
              print &amp; pixels
            </small>
          </div>
        </Float>
      </div>

      <motion.div className="hero__bottom" style={{ opacity: fade }}>
        <motion.p
          className="hero__lede"
          initial={{ opacity: 0, y: 30 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1, ease, delay: 0.7 }}
        >
          I design <em className="serif">books people pick up</em>, brands people remember and campaigns that perform —
          from first sketch to the press-ready file.
        </motion.p>
        <Magnetic strength={0.5}>
          <a href="#work" className="hero__scroll" aria-label="Scroll to selected work">
            <svg viewBox="0 0 100 100" className="hero__ring" aria-hidden>
              <defs>
                <path id="circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
              </defs>
              <text>
                <textPath href="#circ">Scroll to explore · Selected work · </textPath>
              </text>
            </svg>
            <span className="hero__arrow">↓</span>
          </a>
        </Magnetic>
      </motion.div>
    </section>
  )
}
