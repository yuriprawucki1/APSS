"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { FiCompass, FiHome } from "react-icons/fi"

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center">
      <div className="absolute inset-0 z-0 overflow-hidden"></div>

      <motion.div
        className="relative z-10 flex flex-col items-center text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <FiCompass className="h-16 w-16 text-blue-500 dark:text-blue-400" />

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          Página Não Encontrada
        </h1>
        <p className="mt-4 max-w-lg text-lg text-zinc-600 dark:text-zinc-400">
          Parece que você se perdeu. A página que você está procurando não
          existe ou foi movida.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            <FiHome className="h-4 w-4" />
            Voltar para o Início
          </Link>
        </div>
      </motion.div>
    </main>
  )
}
