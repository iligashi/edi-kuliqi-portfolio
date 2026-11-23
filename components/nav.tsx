"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValueEvent, useScroll } from "motion/react"
import { profile } from "@/lib/site"
import { useIntroDone } from "./intro"
import { Magnetic, ease } from "./motion-primitives"

const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
] as const

function Clock() {
  const [time, setTime] = useState("--:--")
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: profile.timeZone })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 15_000)
    return () => clearInterval(id)
  }, [])
  return <time suppressHydrationWarning>{time}</time>
}

export function Nav() {
  const ready = useIntroDone()
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > prev && y > 300)
    setScrolled(y > 40)
  })

  return (
    <motion.header
      className={`nav ${scrolled ? "nav--scrolled" : ""}`}
      initial={{ y: -100 }}
      animate={{ y: ready && !hidden ? 0 : -100 }}
      transition={{ duration: 0.7, ease }}
    >
      <a href="#top" className="nav__logo" aria-label={`${profile.name} — home`}>
        EK<sup>®</sup>
      </a>
      <nav aria-label="Primary">
        <ul className="nav__links">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="roll">
                <span data-text={l.label}>{l.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="nav__meta">
        <span className="nav__status">
          <i />
          Available for projects
        </span>
        <span className="nav__clock" aria-label="Local time in Pristina">
          PRN <Clock />
        </span>
      </div>
      <Magnetic>
        <a href="#contact" className="nav__cta">
          Let&apos;s talk
        </a>
      </Magnetic>
    </motion.header>
  )
}
