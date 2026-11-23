"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "motion/react"
import { ease } from "./motion-primitives"

const IntroContext = createContext(false)
export const useIntroDone = () => useContext(IntroContext)

/** Shows a counting loader once, then flags the intro as done so the hero can play. */
export function IntroProvider({ children }: { children: ReactNode }) {
  const [done, setDone] = useState(false)
  const [showLoader, setShowLoader] = useState(true)
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v).toString().padStart(3, "0"))
  const width = useTransform(count, (v) => `${v}%`)

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      setShowLoader(false)
      setDone(true)
      return
    }
    document.documentElement.style.overflow = "hidden"
    const controls = animate(count, 100, {
      duration: 1.8,
      ease: [0.65, 0, 0.35, 1],
      onComplete: () => {
        setShowLoader(false)
        document.documentElement.style.overflow = ""
      },
    })
    return () => {
      controls.stop()
      document.documentElement.style.overflow = ""
    }
  }, [count])

  return (
    <IntroContext.Provider value={done}>
      <AnimatePresence onExitComplete={() => setDone(true)}>
        {showLoader && (
          <motion.div
            className="loader"
            aria-hidden
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="loader__top">
              <span>Edi Kuliqi</span>
              <span>Portfolio ©{new Date().getFullYear()}</span>
            </div>
            <motion.div
              className="loader__count"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease }}
            >
              <motion.span>{rounded}</motion.span>
            </motion.div>
            <div className="loader__bar">
              <motion.span style={{ width }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </IntroContext.Provider>
  )
}
