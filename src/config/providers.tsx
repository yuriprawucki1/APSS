"use client"

import { ToastProvider } from "@heroui/react"
import { HeroUIProvider } from "@heroui/system"
import { useRouter } from "next/navigation"
import type { ThemeProviderProps } from "next-themes"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type * as React from "react"
import { ThemeRippleEffect } from "@/components/ui/ThemeRippleEffect"
import { RippleProvider } from "@/contexts/RippleContext"

interface ProvidersProps {
  children: React.ReactNode
  themeProps?: ThemeProviderProps
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >
  }
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter()

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <RippleProvider>
          <ToastProvider />
          {children}
          <ThemeRippleEffect />
        </RippleProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  )
}
