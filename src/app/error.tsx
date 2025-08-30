"use client"

import type { Variants } from "framer-motion"
import { motion } from "framer-motion"
import Link from "next/link"
import { useEffect } from "react"
import { FiAlertTriangle, FiHome, FiRefreshCw } from "react-icons/fi"

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
      },
    },
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center">
      <div className="absolute inset-0 z-0 overflow-hidden"></div>

      <motion.div
        className="relative z-10 flex flex-col items-center text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <FiAlertTriangle className="h-16 w-16 text-red-500 dark:text-red-400" />
        </motion.div>

        <motion.h1
          className="mt-6 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl"
          variants={itemVariants}
        >
          Ops! Algo deu errado.
        </motion.h1>

        <motion.p
          className="mt-4 max-w-lg text-lg text-zinc-600 dark:text-zinc-400"
          variants={itemVariants}
        >
          Não se preocupe, nossa equipe já foi notificada. Por favor, tente
          recarregar a página ou volte para o início.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-4"
          variants={itemVariants}
        >
          <button
            type="button"
            onClick={() => reset()}
            className="cursor-pointer flex items-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            <FiRefreshCw className="h-4 w-4" />
            Tentar Novamente
          </button>

          <Link
            href="/"
            className="flex items-center gap-2 rounded-md border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-200 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            <FiHome className="h-4 w-4" />
            Voltar para o Início
          </Link>
        </motion.div>
      </motion.div>
    </main>
  )
}
