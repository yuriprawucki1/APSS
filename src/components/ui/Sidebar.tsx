"use client"

import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tooltip,
} from "@heroui/react"
import { AnimatePresence, motion } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"
import React from "react"
import {
  LuChevronDown,
  LuChevronLeft,
  LuChevronRight,
  LuChevronUp,
} from "react-icons/lu"
import { PiSignOut as SignOut } from "react-icons/pi"
import { useSidebar } from "@/contexts/SidebarContext"
import { AdminIcon } from "./AdminIcon"
import SystemIcon from "./SystemIcon"
import SystemLogo from "./SystemLogo"
import { ThemeSwitch } from "./ThemeSwitch"

interface SubMenuItem {
  icon: React.ReactNode
  label: string
  href: string
}

interface MenuItem {
  icon: React.ReactNode
  label: string
  href?: string
  subItems?: SubMenuItem[]
}

interface SidebarProps {
  menuItems: MenuItem[]
  avatarSrc: string
  userName: string
  userEmail: string
}

export const Sidebar: React.FC<SidebarProps> = ({
  menuItems,
  avatarSrc,
  userName,
  userEmail,
}) => {
  const { isCollapsed, setIsCollapsed } = useSidebar()
  const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null)
  const [isAnimating, setIsAnimating] = React.useState(false)

  const router = useRouter()
  const pathname = usePathname()

  const toggleCollapse = () => {
    setIsAnimating(true)
    setIsCollapsed(!isCollapsed)
    if (!isCollapsed) {
      setOpenSubmenu(null)
    }
  }

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label)
  }

  const handleAnimationComplete = () => {
    setIsAnimating(false)
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    })
    router.push("/login")
  }

  const MenuItem = ({ item }: { item: MenuItem }) => {
    const isActive = pathname === item.href
    const hasSubItems = item.subItems && item.subItems.length > 0
    const shouldShowTooltip = isCollapsed && !isAnimating

    const handleItemClick = () => {
      if (item.href) {
        router.push(item.href)
      }
      if (hasSubItems && !isCollapsed) {
        toggleSubmenu(item.label)
      }
    }

    return (
      <li className={isCollapsed ? "flex justify-center" : ""}>
        <Tooltip
          content={shouldShowTooltip ? item.label : ""}
          placement="right"
          isDisabled={!shouldShowTooltip}
        >
          <Button
            className={`transition-all duration-300 ${
              isActive ? "bg-primary text-primary-foreground" : ""
            } ${
              isCollapsed
                ? "w-12 min-w-12 max-w-12 px-0 flex items-center justify-center"
                : "w-full justify-start"
            }`}
            variant={isActive ? "solid" : "light"}
            onPress={handleItemClick}
          >
            <span
              className="flex items-center justify-center"
              style={{ width: 20, height: 20 }}
            >
              {item.icon}
            </span>
            <AnimatePresence>
              {!isCollapsed && !isAnimating && (
                <motion.span
                  className="ml-3 truncate"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15, delay: 0.1 }}
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
            {hasSubItems && !isCollapsed && (
              <motion.span
                className="ml-auto flex items-center justify-center"
                style={{ width: 16, height: 16 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {openSubmenu === item.label ? (
                  <LuChevronUp />
                ) : (
                  <LuChevronDown />
                )}
              </motion.span>
            )}
          </Button>
        </Tooltip>
        <AnimatePresence>
          {hasSubItems && openSubmenu === item.label && !isCollapsed && (
            <motion.ul
              className="ml-4 mt-2 space-y-2 overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {item.subItems?.map((subItem) => (
                <MenuItem key={subItem.label || subItem.href} item={subItem} />
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </li>
    )
  }

  return (
    <motion.aside
      className="fixed left-0 top-0 z-50 flex flex-col h-screen bg-content1 border-r border-divider group"
      initial={false}
      animate={{ width: isCollapsed ? 80 : 240 }}
      transition={{
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1],
      }}
      onAnimationComplete={handleAnimationComplete}
      onAnimationStart={() => setIsAnimating(true)}
    >
      <div
        className="flex items-center justify-center p-4"
        style={{ minHeight: 78 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isCollapsed ? "icon" : "logo"}
            aria-label="Logo"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            {isCollapsed ? (
              <SystemIcon
                className="text-[#1f1f1f] dark:text-white"
                height={30}
                width={30}
              />
            ) : (
              <SystemLogo
                className="text-[#1f1f1f] dark:text-white"
                height={30}
                width={78}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute top-1/20 right-[-16px] -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button
          isIconOnly
          size="sm"
          radius="full"
          variant="solid"
          aria-label="Toggle sidebar"
          onPress={toggleCollapse}
        >
          {isCollapsed ? (
            <LuChevronRight size={14} />
          ) : (
            <LuChevronLeft size={14} />
          )}
        </Button>
      </div>

      <nav className="flex-grow overflow-y-auto">
        <ul className="space-y-2 p-2">
          {menuItems.map((item) => (
            <MenuItem key={item.label || item.href} item={item} />
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-divider">
        <div className="relative">
          <Tooltip
            content={isCollapsed && !isAnimating ? "Alterar tema" : ""}
            placement="right"
            isDisabled={!isCollapsed || isAnimating}
          >
            <div className="flex items-center">
              <motion.div
                className="flex items-center"
                animate={{
                  justifyContent: isCollapsed ? "center" : "flex-start",
                  width: isCollapsed ? "100%" : "auto",
                }}
                transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
              >
                <ThemeSwitch />
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      className="text-sm ml-3 whitespace-nowrap"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.1,
                        delay: isAnimating ? 0.4 : 0.1,
                      }}
                    >
                      Alterar tema
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </Tooltip>
        </div>

        <Tooltip
          content={
            isCollapsed && !isAnimating ? `${userName}\n${userEmail}` : ""
          }
          placement="right"
          isDisabled={!isCollapsed || isAnimating}
        >
          <Dropdown placement="top-start">
            <DropdownTrigger>
              <div
                className={`flex items-center mt-4 transition-all duration-300 ${
                  isCollapsed ? "justify-center" : ""
                } cursor-pointer`}
              >
                <Avatar
                  as="div"
                  className="transition-transform"
                  color="default"
                  name={userName}
                  size="sm"
                  fallback={<AdminIcon />}
                  src={avatarSrc}
                />
                <AnimatePresence>
                  {!isCollapsed && !isAnimating && (
                    <motion.div
                      className="ml-3 min-w-0 flex-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15, delay: 0.1 }}
                    >
                      <p className="text-sm font-medium truncate">{userName}</p>
                      <p className="text-xs text-default-500 truncate">
                        {userEmail}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </DropdownTrigger>

            <DropdownMenu aria-label="Ações do perfil" variant="flat">
              <DropdownItem
                key="logout"
                color="danger"
                onPress={handleLogout}
                endContent={<SignOut className="text-lg" />}
              >
                Sair
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Tooltip>
      </div>
    </motion.aside>
  )
}
