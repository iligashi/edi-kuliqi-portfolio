"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { profile } from "@/lib/site"
import { Magnetic, SplitChars } from "./motion-primitives"

export function Contact() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] })
  const rotate = useTransform(scrollYProgress, [0, 1], [-90, 0])
  const radius = useTransform(scrollYProgress, [0, 1], ["40% 40% 0 0", "0% 0% 0 0"])

  return (
    <motion.section ref={ref} id="contact" className="contact" style={{ borderRadius: radius }} aria-labelledby="contact-title">
      <p className="eyebrow">( 07 ) — Contact</p>
      <h2 id="contact-title" className="contact__title">
        <span className="sr-only">Got a book, brand or campaign? Let&apos;s talk.</span>
        <span className="line" aria-hidden>
          <SplitChars text="Got a book," />
        </span>
        <span className="line" aria-hidden>
          <SplitChars text="brand or" delay={0.15} />{" "}
          <em className="serif">campaign?</em>
        </span>
      </h2>

      <div className="contact__row">
        <Magnetic strength={0.25}>
          <a href={`mailto:${profile.email}`} className="contact__btn" data-cursor="Write">
            <span>{profile.email}</span>
            <motion.span className="contact__star" style={{ rotate }} aria-hidden>
              ✦
            </motion.span>
          </a>
        </Magnetic>
        <div className="contact__side">
          <a href={`tel:${profile.phoneHref}`} className="roll">
            <span data-text={profile.phone}>{profile.phone}</span>
          </a>
          <span>Pristina, Kosovo — working worldwide</span>
        </div>
      </div>

      <footer className="footer">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>Designed in Pristina</span>
        <a href="#top" className="roll">
          <span data-text="Back to top ↑">Back to top ↑</span>
        </a>
      </footer>
    </motion.section>
  )
}
