"use client"

import { addToast, Button, closeToast } from "@heroui/react"
import { AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"
import ChangePasswordForm from "@/components/forms/ChangePasswordForm"
import RecoverPasswordForm from "@/components/forms/RecoverPasswordForm"
import { AdminIcon } from "@/components/ui/AdminIcon"

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
      icon: <AdminIcon />,
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
