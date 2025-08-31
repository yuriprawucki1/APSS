import { createConnection } from "node:net"
import { NextResponse } from "next/server"
import { env } from "@/constants/env"

export async function GET() {
  try {
    console.log("🌐 Testando conectividade de rede básica...")

    const testNetworkConnection = (host: string, port: number): Promise<boolean> => {
      return new Promise((resolve) => {
        let resolved = false;
        const socket = createConnection({ host, port, timeout: 10000 });

        const finish = (result: boolean) => {
          if (!resolved) {
            resolved = true;
            socket.destroy();
            resolve(result);
          }
        };

        socket.on("connect", () => {
          console.log(`✅ Conexão TCP bem-sucedida para ${host}:${port}`);
          finish(true);
        });

        socket.on("error", (err) => {
          console.error(`❌ Erro na conexão TCP para ${host}:${port}:`, err.message);
          finish(false);
        });

        socket.on("timeout", () => {
          console.error(`❌ Timeout na conexão TCP para ${host}:${port}`);
          finish(false);
        });
      });
    };

    const host = env.LDAP_HOST
    const port = env.LDAP_PORT

    const isReachable = await testNetworkConnection(host, port)

    if (isReachable) {
      return NextResponse.json({
        success: true,
        message: `Servidor ${host} e porta ${port} está acessível via TCP`,
        host,
        port,
        timestamp: new Date().toISOString(),
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: `Servidor ${host} ou porta ${port} não está acessível`,
          host,
          port,
          suggestions: [
            "Verifique se o servidor LDAP está rodando",
            `Verifique se a porta ${port} está aberta no firewall`,
            "Teste fazer ping para o servidor",
            `Verifique se o Host ${host} está correto`,
          ],
          timestamp: new Date().toISOString(),
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Erro no teste de rede:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro interno no teste de rede",
        error: error instanceof Error ? error.message : "Erro desconhecido",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
