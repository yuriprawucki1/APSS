// import type { SecureVersion } from "node:tls"
import { Client } from "ldapts"
import { env } from "@/constants/env"

class LDAP {
  private url = env.LDAP_URL
  private timeout = env.LDAP_TIMEOUT as number
  private connectTimeout = env.LDAP_CONNECTION_TIMEOUT as number
  // private minTLSVersion = env.LDAP_MINIMUM_TLS_VERSION as SecureVersion
  private strictDN = env.LDAP_STRICT_DN as boolean
  private baseDN = env.LDAP_BASE_DN
  private bindDN = env.LDAP_BIND_DN
  private password = env.LDAP_BIND_PASSWORD
  private groupAdmin = env.LDAP_GROUP_ADMIN
  private client: Client

  constructor() {
    // TODO: Verificar opções de tls
    this.client = new Client({
      url: this.url,
      timeout: this.timeout,
      connectTimeout: this.connectTimeout,
      // tlsOptions: {
      //   minVersion: this.minTLSVersion,
      // },
      strictDN: this.strictDN,
    })
  }

  async testConnection(): Promise<boolean> {
    console.log("🧪 Iniciando teste de conectividade LDAP...")

    try {
      console.log("📡 Testando conexão com o servidor LDAP...")

      await this.client.bind(this.bindDN, this.password)
      console.log("✅ Conectado com sucesso ao servidor LDAP")

      const searchResult = await this.client.search(this.baseDN, {
        scope: "base",
        filter: "(objectClass=*)",
        attributes: ["objectClass"],
      })

      console.log("✅ Busca de teste realizada com sucesso")
      console.log(
        "Resultado da busca:",
        searchResult.searchEntries.length,
        "entrada(s) encontrada(s)",
      )

      return true
    } catch (error) {
      console.error("❌ Erro no teste de conectividade LDAP:")
      if (error instanceof Error) {
        console.error("Mensagem:", error.message)
        console.error(
          "Código:",
          (error as NodeJS.ErrnoException)?.code || "N/A",
        )
      }

      console.log("💡 Use a API /api/test/network para diagnóstico de rede")
      return false
    }
  }

  async connection(): Promise<void> {
    try {
      await this.client.bind(this.bindDN, this.password)
      console.log("Connected to LDAP server")
    } catch (error) {
      console.error("Error connecting to LDAP server:", error)
      throw error
    }
  }

  async authenticate(username: string, password: string): Promise<boolean> {
    try {
      await this.client.bind(this.bindDN, this.password)

      const searchResult = await this.client.search(this.baseDN, {
        scope: "sub",
        filter: `(sAMAccountName=${username})`,
        attributes: ["dn", "sAMAccountName"],
      })

      if (searchResult.searchEntries.length === 0) {
        console.log(`❌ Usuário ${username} não encontrado no AD`)
        return false
      }

      const userDN = searchResult.searchEntries[0].dn
      console.log(`🔍 Usuário encontrado: ${userDN}`)

      await this.client.bind(userDN, password)
      console.log(`✅ Autenticação bem-sucedida para ${username}`)
      return true
    } catch (error) {
      console.log(`❌ Falha na autenticação para ${username}`)
      console.error("Erro na autenticação LDAP:", error)
      return false
    }
  }

  async isInAdminGroup(username: string): Promise<boolean> {
    try {
      await this.client.bind(this.bindDN, this.password)

      const searchResult = await this.client.search(this.baseDN, {
        scope: "sub",
        filter: `(sAMAccountName=${username})`,
        attributes: ["dn", "memberOf"],
      })

      if (searchResult.searchEntries.length === 0) {
        return false
      }

      const memberOfRaw = searchResult.searchEntries[0].memberOf
      let memberOf: string[] = []

      if (Array.isArray(memberOfRaw)) {
        memberOf = memberOfRaw as string[]
      } else if (typeof memberOfRaw === "string") {
        memberOf = [memberOfRaw]
      }

      const adminGroups = [this.groupAdmin]

      const isAdmin = memberOf.some((group) =>
        adminGroups.some((adminGroup) => group.includes(adminGroup)),
      )

      console.log(`👤 ${username} é admin: ${isAdmin}`)
      console.log("Grupos do usuário:", memberOf)

      return isAdmin
    } catch (error) {
      console.error("Erro ao verificar grupos do usuário:", error)
      return false
    } finally {
      try {
        await this.client.unbind()
      } catch (unbindError) {
        console.error("Erro ao fechar conexão:", unbindError)
      }
    }
  }

  async getUserInfo(username: string) {
    try {
      await this.client.bind(this.bindDN, this.password)

      const searchResult = await this.client.search(this.baseDN, {
        scope: "sub",
        filter: `(sAMAccountName=${username})`,
        attributes: [
          "dn",
          "sAMAccountName",
          "displayName",
          "mail",
          "department",
          "title",
          "memberOf",
        ],
      })
      console.log("Resultado da busca:", searchResult)

      if (searchResult.searchEntries.length === 0) {
        return null
      }

      const user = searchResult.searchEntries[0]
      return {
        dn: user.dn,
        username: user.sAMAccountName as string,
        displayName: user.displayName as string,
        email: user.mail as string,
        department: user.department as string,
        title: user.title as string,
        groups: (user.memberOf as string[]) || [],
      }
    } catch (error) {
      console.error("Erro ao buscar informações do usuário:", error)
      return null
    } finally {
      try {
        await this.client.unbind()
      } catch (unbindError) {
        console.error("Erro ao fechar conexão:", unbindError)
      }
    }
  }
}

export const ldap = new LDAP()
