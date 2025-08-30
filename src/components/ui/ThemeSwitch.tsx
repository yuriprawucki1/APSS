"use client"

import { type SwitchProps, useSwitch } from "@heroui/react"
import { VisuallyHidden } from "@react-aria/visually-hidden"
import clsx from "clsx"
import { AnimatePresence, motion } from "framer-motion"
import { useTheme } from "next-themes"
import React, { useEffect, useMemo, useState } from "react"
import { IoMoon as MoonIcon, IoSunny as SunIcon } from "react-icons/io5"
import { useRipple } from "@/contexts/RippleContext"

interface ThemeSwitchProps {
  className?: string
  classNames?: SwitchProps["classNames"]
}

const iconVariants = {
  hidden: { opacity: 0, rotate: -20 },
  visible: { opacity: 1, rotate: 0 },
  exit: { opacity: 0, rotate: 20 },
}

const ToggleIcon = ({ isSelected }: { isSelected: boolean }) => (
  <motion.div
    key={isSelected ? "moon" : "sun"}
    initial="hidden"
    animate="visible"
    exit="exit"
    variants={iconVariants}
    transition={{ duration: 0.25 }}
  >
    {isSelected ? <MoonIcon size={22} /> : <SunIcon size={22} />}
  </motion.div>
)

export const ThemeSwitch = React.memo<ThemeSwitchProps>(
  ({ className, classNames }) => {
    const [mounted, setMounted] = useState(false)
    const { resolvedTheme, setTheme } = useTheme()

    useEffect(() => {
      setMounted(true)
      if (typeof window !== "undefined") {
        const storedTheme = window.localStorage.getItem("theme")
        if (!storedTheme) {
          setTheme(resolvedTheme ?? "light")
          window.localStorage.setItem("theme", resolvedTheme ?? "light")
        }
      }
    }, [setTheme, resolvedTheme])

    const { startRipple } = useRipple()

    const {
      Component,
      slots,
      isSelected: rawIsSelected,
      getBaseProps,
      getInputProps,
      getWrapperProps,
    } = useSwitch({
      isSelected: resolvedTheme === "light",
      "aria-label": `Switch to ${resolvedTheme === "light" ? "dark" : "light"} mode`,
    })

    const isSelected: boolean = rawIsSelected ?? false

    const wrapperClass = useMemo(
      () =>
        clsx(
          [
            "w-auto h-auto bg-transparent rounded-lg flex items-center justify-center",
            "group-data-[selected=true]:bg-transparent !text-default-500 pt-px px-0 mx-0",
          ],
          classNames?.wrapper,
        ),
      [classNames?.wrapper],
    )

    if (!mounted) {
      return <div className="w-6" />
    }

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
      const newTheme = resolvedTheme === "light" ? "dark" : "light"
      startRipple(e.clientX, e.clientY, newTheme)
    }

    return (
      <Component
        {...getBaseProps({
          className: clsx(
            "px-px transition-opacity hover:opacity-80 cursor-pointer",
            className,
            classNames?.base,
          ),
        })}
        onClick={handleClick}
      >
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>

        <div
          {...getWrapperProps()}
          className={slots.wrapper({ class: wrapperClass })}
        >
          <AnimatePresence mode="wait" initial={false}>
            <ToggleIcon isSelected={isSelected} />
          </AnimatePresence>
        </div>
      </Component>
    )
  },
)

ThemeSwitch.displayName = "ThemeSwitch"
