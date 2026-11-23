"use client"

import { motion } from "motion/react"
import { education, experience, tools } from "@/lib/site"
import { Reveal, ease } from "./motion-primitives"

export function Experience() {
  return (
    <section id="experience" className="exp" aria-labelledby="exp-title">
      <div className="section-head">
        <p className="eyebrow">( 05 ) — Experience</p>
        <h2 id="exp-title" className="h2">
          Where I&apos;ve <em className="serif">worked.</em>
        </h2>
      </div>

      <ol className="exp__list">
        {experience.map((e, i) => (
          <li key={e.company} className="exp__row">
            <motion.span
              className="exp__line"
              aria-hidden
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease, delay: i * 0.1 }}
            />
            <Reveal className="exp__inner" delay={0.1 + i * 0.1}>
              <span className="exp__date">{e.date}</span>
              <div className="exp__main">
                <h3>
                  {e.role} <span>@ {e.company}</span>
                </h3>
                <p>{e.body}</p>
              </div>
              <span className="exp__loc">Pristina</span>
            </Reveal>
          </li>
        ))}
      </ol>

      <div className="edu">
        {education.map((e, i) => (
          <Reveal key={e.label} className="edu__item" delay={i * 0.08}>
            <p className="eyebrow">{e.label}</p>
            <h3>{e.title}</h3>
            <p>{e.meta}</p>
          </Reveal>
        ))}
      </div>

      <div className="tools" aria-labelledby="tools-title">
        <p className="eyebrow" id="tools-title">
          ( 06 ) — Toolkit
        </p>
        <ul className="tools__grid">
          {tools.map((t, i) => (
            <motion.li
              key={t.name}
              className={`tool tool--${t.tone}`}
              initial={{ opacity: 0, y: 60, rotate: i % 2 ? 6 : -6 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ type: "spring", stiffness: 120, damping: 14, delay: i * 0.08 }}
              whileHover={{ y: -10, rotate: i % 2 ? 3 : -3 }}
            >
              <b>{t.short}</b>
              <span>{t.name}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
