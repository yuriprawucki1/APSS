"use client"

import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
} from "@heroui/react"
import SystemLogo from "./SystemLogo"
import { ThemeSwitch } from "./ThemeSwitch"

export const Navbar = () => {
  return (
    <HeroUINavbar isBlurred={false} position="static">
      <NavbarContent justify="start">
        <NavbarBrand>
          <SystemLogo className="text-[#1f1f1f] dark:text-white" size={78} />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <ThemeSwitch />
      </NavbarContent>
    </HeroUINavbar>
  )
}
