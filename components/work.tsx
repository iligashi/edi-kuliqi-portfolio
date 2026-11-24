"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "motion/react"
import { projects, type Project } from "@/lib/site"
import { ease } from "./motion-primitives"

function CardArt({ p }: { p: Project }) {
  const cover = p.images[0]
  return (
    <motion.div
      className="card__art"
      style={{ background: p.tone }}
      variants={{ hover: { scale: 0.97 } }}
      transition={{ duration: 0.6, ease }}
    >
      <motion.div className="card__inner" variants={{ hover: { scale: 1.08 } }} transition={{ duration: 0.8, ease }}>
        {cover ? (
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes="(min-width: 900px) 30vw, (min-width: 600px) 50vw, 100vw"
            className="card__img"
          />
        ) : (
          <div className="card__web" aria-hidden>
            <span className="card__web-bar">
              <i />
              <i />
              <i />
              <small>{p.url?.replace(/^https?:\/\//, "")}</small>
            </span>
            <span className="card__web-title">
              One
              <br />
              <em className="serif">Posters</em>
            </span>
            <span className="card__web-cta">Visit site ↗</span>
          </div>
        )}
      </motion.div>
      {p.images.length > 1 && <span className="card__count">1 / {p.images.length}</span>}
    </motion.div>
  )
}

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

function Lightbox({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = document.documentElement
    // Remember what opened the dialog so focus can go back there on close.
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null
    root.classList.add("modal-open")
    closeRef.current?.focus({ preventScroll: true })

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
        return
      }
      if (e.key !== "Tab" || !panelRef.current) return
      // Keep Tab / Shift+Tab cycling inside the dialog.
      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement
      const outside = !panelRef.current.contains(active)
      if (e.shiftKey && (active === first || outside)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && (active === last || outside)) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => {
      root.classList.remove("modal-open")
      window.removeEventListener("keydown", onKey)
      opener?.focus({ preventScroll: true })
    }
  }, [onClose])

  return (
    <motion.div
      className="lb"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lb-title"
      data-lenis-prevent
      data-cursor="Close"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease }}
      onClick={onClose}
    >
      <motion.div
        ref={panelRef}
        className="lb__panel"
        data-cursor=""
        initial={{ y: 60 }}
        animate={{ y: 0 }}
        exit={{ y: 60 }}
        transition={{ duration: 0.6, ease }}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="lb__head">
          <div>
            <p className="eyebrow">{project.category}</p>
            <h3 id="lb-title">{project.title}</h3>
            <p className="lb__summary">{project.summary}</p>
          </div>
          <button ref={closeRef} type="button" className="lb__close" onClick={onClose} aria-label="Close project">
            ✕
          </button>
        </header>
        <div className="lb__images">
          {project.images.map((img) => (
            <Image
              key={img.src}
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              sizes="(min-width: 1100px) 1000px, 100vw"
              className="lb__img"
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

/** Pinned section whose vertical scroll drives a horizontal gallery (desktop); a plain grid on small screens. */
export function Work() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLOListElement>(null)
  const [distance, setDistance] = useState(0)
  const [horizontal, setHorizontal] = useState(false)
  const [open, setOpen] = useState<Project | null>(null)
  const close = useCallback(() => setOpen(null), [])

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px) and (prefers-reduced-motion: no-preference)")
    const measure = () => {
      setHorizontal(mq.matches)
      const track = trackRef.current
      // Slide until the last card lines up with the right edge of the content column.
      if (track?.parentElement) setDistance(Math.max(0, track.scrollWidth - track.parentElement.clientWidth))
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
            // The title's button/link is stretched over the whole card (see .card__hit::after),
            // so the card stays clickable while the title remains a real heading.
            <motion.li
              key={p.slug}
              className="card"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover="hover"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, ease, delay: (i % 3) * 0.08 }}
            >
              <CardArt p={p} />
              <div className="card__info">
                <span className="card__num">{String(i + 1).padStart(2, "0")}</span>
                <h3>
                  {p.url ? (
                    <a className="card__hit" href={p.url} target="_blank" rel="noopener noreferrer" data-cursor="Visit">
                      {p.title}
                      <span className="sr-only"> — visit live site (opens in a new tab)</span>
                    </a>
                  ) : (
                    <button type="button" className="card__hit" data-cursor="View" onClick={() => setOpen(p)}>
                      {p.title}
                      <span className="sr-only"> — open project gallery</span>
                    </button>
                  )}
                </h3>
                <p>{p.summary}</p>
                <span className="card__year">{p.category}</span>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>

      <AnimatePresence>{open && <Lightbox key={open.slug} project={open} onClose={close} />}</AnimatePresence>
    </section>
  )
}
