import "@/styles/globals.css"
import { fontNunito } from "@/config/fonts"
import { Providers } from "@/config/providers"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang="pt-BR">
      <body className={`${fontNunito.variable} antialiased`}>
        <Providers
          themeProps={{
            attribute: "class",
            defaultTheme: "system",
            enableSystem: true,
          }}
        >
          {children}
        </Providers>
      </body>
    </html>
  )
}
