"use client"

import { useSidebar } from "@/contexts/SidebarContext"
import { Sidebar } from "@/components/ui/Sidebar"
import { adminMenuItems } from "@/constants/adminMenuItens"

interface AdminLayoutContextProps {
  children: React.ReactNode
}

export function AdminLayoutContext({ children }: AdminLayoutContextProps) {
  const { sidebarWidth } = useSidebar()

  return (
    // TODO: Implementar usuário dinâmico
    <div className="flex h-screen w-full">
      <Sidebar
        menuItems={adminMenuItems}
        avatarSrc="https://img.heroui.chat/image/avatar?w=200&h=200&u=1"
        userName="John Doe"
        userEmail="john@example.com"
      />
      <main 
        className="flex-1 min-h-screen transition-all duration-300 ease-[cubic-bezier(0.4,0.0,0.2,1)]"
        style={{ marginLeft: `${sidebarWidth}px` }}
      >
        {children}
      </main>
    </div>
  )
}
