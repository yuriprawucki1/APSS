import { FaHome as Home } from "react-icons/fa"
import { IoSettingsSharp as Setting } from "react-icons/io5"
import { RiTestTubeFill as Test } from "react-icons/ri"

export const adminMenuItems = [
  { icon: <Home />, label: "Início", href: "/admin" },
  { icon: <Test size={16} />, label: "Testes", href: "/admin/tests" },
  {
    icon: <Setting />,
    label: "Configurações",
    href: "/admin/settings",
  },
]
