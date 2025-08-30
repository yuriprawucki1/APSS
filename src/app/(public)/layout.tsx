import type { Metadata, Viewport } from "next"
import { Navbar } from "@/components/ui/Navbar"

export const metadata: Metadata = {
  title: "APSS - Autoatendimento",
  description: "Autoatendimento de senha de conta",
  icons: {
    icon: "/icon.svg",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col h-screen w-full">
      <nav className="h-16 w-full">
        <Navbar />
      </nav>
      <main className="flex-1 min-h-0">{children}</main>
    </div>
  )
}
