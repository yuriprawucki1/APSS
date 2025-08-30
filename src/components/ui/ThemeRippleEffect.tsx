"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { useRipple } from "@/contexts/RippleContext"

export const ThemeRippleEffect = () => {
  const { ripple, setRipple } = useRipple()
  const { setTheme } = useTheme()
  const [endRadius, setEndRadius] = useState(0)

  useEffect(() => {
    if (ripple.isActive) {
      const radius = Math.hypot(
        Math.max(ripple.x, window.innerWidth - ripple.x),
        Math.max(ripple.y, window.innerHeight - ripple.y),
      )
      setEndRadius(radius)
    }
  }, [ripple.isActive, ripple.x, ripple.y])

  return (
    <AnimatePresence>
      {ripple.isActive && endRadius > 0 && (
        <motion.div
          className={
            ripple.theme === "dark"
              ? "backdrop-blur-sm bg-black/20"
              : "backdrop-blur-sm bg-white/30"
          }
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 9999,
            clipPath: `circle(0px at ${ripple.x}px ${ripple.y}px)`,
          }}
          initial={{
            clipPath: `circle(0px at ${ripple.x}px ${ripple.y}px)`,
            opacity: 1,
          }}
          animate={{
            clipPath: `circle(${endRadius}px at ${ripple.x}px ${ripple.y}px)`,
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{ duration: 0.4, ease: "circOut" }}
          onAnimationComplete={() => {
            setTheme(ripple.theme)
            setRipple((prev) => ({ ...prev, isActive: false }))
          }}
        />
      )}
    </AnimatePresence>
  )
}
