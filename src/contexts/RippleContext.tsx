"use client"

import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useState,
} from "react"

type RippleState = {
  isActive: boolean
  x: number
  y: number
  theme: "light" | "dark"
}

interface RippleContextProps {
  startRipple: (x: number, y: number, newTheme: "light" | "dark") => void
  ripple: RippleState
  setRipple: Dispatch<SetStateAction<RippleState>>
}

const RippleContext = createContext<RippleContextProps | undefined>(undefined)

export const RippleProvider = ({ children }: { children: ReactNode }) => {
  const [ripple, setRipple] = useState<RippleState>({
    isActive: false,
    x: -1,
    y: -1,
    theme: "light",
  })

  const startRipple = (x: number, y: number, newTheme: "light" | "dark") => {
    setRipple({ isActive: true, x, y, theme: newTheme })
  }

  const value = { startRipple, ripple, setRipple }

  return (
    <RippleContext.Provider value={value}>{children}</RippleContext.Provider>
  )
}

export const useRipple = () => {
  const context = useContext(RippleContext)
  if (!context) {
    throw new Error("useRipple must be used within a RippleProvider")
  }
  return context
}
