import type { Metadata, Viewport } from "next"
import { AdminLayoutContext } from "@/contexts/AdminLayoutContext"
import { SidebarProvider } from "@/contexts/SidebarContext"

export const metadata: Metadata = {
  title: "APSS - Admin",
  description: "Área administrativa do APSS",
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

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AdminLayoutContext>{children}</AdminLayoutContext>
    </SidebarProvider>
  )
}
