"use client"

import { addToast, Button, closeToast } from "@heroui/react"
import { AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"
import ChangePasswordForm from "@/components/forms/ChangePasswordForm"
import RecoverPasswordForm from "@/components/forms/RecoverPasswordForm"

export default function Home() {
  const router = useRouter()
  const toastKey = useRef<string | null>(null)
  const hasShownToast = useRef(false)

  const [mode, setMode] = useState<"change" | "recover">("change")

  const handleToast = useCallback(() => {
    if (toastKey.current) {
      closeToast(toastKey.current)
    }
    router.push("/admin")
  }, [router])

  useEffect(() => {
    if (hasShownToast.current) return

    const key = addToast({
      title: "Administrador?",
      description: "Acessar o painel",
      endContent: (
        <Button
          size="sm"
          variant="flat"
          onPress={() => {
            handleToast()
          }}
        >
          Acessar
        </Button>
      ),
      shouldShowTimeoutProgress: true,
      timeout: 6000,
      icon: (
        <svg height={24} viewBox="0 0 24 24" width={24}>
          <title>Admin Icon</title>
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            strokeWidth={1.5}
          >
            <path
              d="M11.845 21.662C8.153 21.662 5 21.088 5 18.787s3.133-4.425 6.845-4.425c3.692 0 6.845 2.1 6.845 4.4s-3.134 2.9-6.845 2.9z"
              data-name="Stroke 1"
            />
            <path
              d="M11.837 11.174a4.372 4.372 0 10-.031 0z"
              data-name="Stroke 3"
            />
          </g>
        </svg>
      ),
    })

    toastKey.current = key
    hasShownToast.current = true

    return () => {
      if (toastKey.current) {
        closeToast(toastKey.current)
      }
    }
  }, [handleToast])

  return (
    <div className="flex items-center justify-center h-full p-6">
      <AnimatePresence mode="wait">
        {mode === "change" ? (
          <ChangePasswordForm setMode={setMode} />
        ) : (
          <RecoverPasswordForm setMode={setMode} />
        )}
      </AnimatePresence>
    </div>
  )
}
