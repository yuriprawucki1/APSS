import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  serverExternalPackages: ['ldapts'], // Trata ldapts como pacote externo do servidor
  experimental: {
    // Configurações experimentais se necessário
  },
}

export default nextConfig
