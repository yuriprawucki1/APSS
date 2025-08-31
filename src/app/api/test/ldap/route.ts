import { NextResponse } from "next/server"

export async function GET() {
  try {
    const { ldap } = await import("@/libs/ldapts")

    console.log("🧪 Iniciando teste de conectividade LDAP...")
    const isConnected = await ldap.testConnection()

    if (isConnected) {
      return NextResponse.json({
        success: true,
        message: "Conectividade LDAP estabelecida com sucesso!",
        timestamp: new Date().toISOString(),
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message:
            "Falha na conectividade LDAP. Verifique os logs do servidor.",
          timestamp: new Date().toISOString(),
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Erro no teste de conectividade:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro interno no teste de conectividade LDAP",
        error: error instanceof Error ? error.message : "Erro desconhecido",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
