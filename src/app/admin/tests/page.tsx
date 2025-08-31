"use client"

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
} from "@heroui/react"
import { useState } from "react"

interface TestResult {
  success: boolean
  message: string
  error?: string
  timestamp?: string
  user?: {
    username: string
    displayName: string
    email: string
    department: string
    title: string
    groupCount: number
  }
}

const routes = {
  connectivity: "/api/test/ldap",
  network: "/api/test/network",
  user: "/api/user/info",
}

export default function TestsPage() {
  const [result, setResult] = useState<TestResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState("")

  const testConnectivity = async () => {
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch(routes.connectivity)
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        success: false,
        message: "Erro ao fazer a requisição",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      })
    } finally {
      setLoading(false)
    }
  }

  const testNetwork = async () => {
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch(routes.network)
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        success: false,
        message: "Erro ao fazer a requisição de rede",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      })
    } finally {
      setLoading(false)
    }
  }

  const searchUser = async () => {
    if (!username.trim()) {
      alert("Digite um nome de usuário")
      return
    }

    setLoading(true)
    setResult(null)

    try {
      const response = await fetch(
        `${routes.user}?username=${encodeURIComponent(username)}`,
      )
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        success: false,
        message: "Erro ao buscar usuário",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Teste de LDAP e Conectividade</h1>

      <div className="grid gap-6">
        <div className="flex gap-6 flex-wrap">
          <Card shadow="lg" className="rounded-2xl border border-content3 flex-1 min-w-[280px]">
            <CardHeader className="flex flex-col items-start pb-0">
              <h2 className="text-xl font-bold">Teste de Conectividade</h2>
              <p className="text-sm text-gray-500">
                Teste a conectividade LDAP com o servidor.
              </p>
            </CardHeader>
            <CardBody>
              <Button
                color="primary"
                onPress={testConnectivity}
                isLoading={loading}
                disabled={loading}
              >
                {loading ? "Testando..." : "Testar Conectividade"}
              </Button>
            </CardBody>
          </Card>

          <Card shadow="lg" className="rounded-2xl border border-content3 flex-1 min-w-[280px]">
            <CardHeader className="flex flex-col items-start pb-0">
              <h2 className="text-xl font-bold">Teste de Rede</h2>
              <p className="text-sm text-gray-500">
                Teste a conectividade de rede TCP com o servidor.
              </p>
            </CardHeader>
            <CardBody>
              <Button
                color="secondary"
                onPress={testNetwork}
                isLoading={loading}
                disabled={loading}
              >
                {loading ? "Testando..." : "Testar Rede"}
              </Button>
            </CardBody>
          </Card>
        </div>

        <Card shadow="lg" className="rounded-2xl border border-content3">
          <CardHeader className="flex flex-col items-start pb-0">
            <h2 className="text-xl font-bold">Buscar Usuário</h2>
            <p className="text-sm text-gray-500">
              Busque informações de um usuário específico no LDAP/Active
              Directory.
            </p>
          </CardHeader>
          <CardBody>
            <div className="flex gap-2 mb-4">
              <Input
                isClearable
                type="text"
                placeholder="Nome do usuário (sAMAccountName)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onClear={() => setUsername("")}
              />
              <Button
                color="default"
                variant="flat"
                onPress={searchUser}
                isLoading={loading}
                disabled={loading || !username.trim()}
              >
                {loading ? "Buscando..." : "Buscar"}
              </Button>
            </div>
          </CardBody>
        </Card>

        {result && (
          <Card shadow="lg" className="rounded-2xl border border-content3">
            <CardHeader className="flex flex-col items-start pb-2">
              <h2 className="text-xl font-bold">Resultado</h2>
            </CardHeader>
            <Divider />
            <CardBody>
              <div
                className={`p-4 rounded-md ${result.success
                  ? "bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800"
                  : "bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800"
                  }`}
              >
                <div className="flex items-center mb-2">
                  <span
                    className={`inline-block w-3 h-3 rounded-full mr-2 ${result.success ? "bg-green-500" : "bg-red-500"}`}
                  ></span>
                  <span
                    className={`font-medium ${result.success
                      ? "text-green-800 dark:text-green-200"
                      : "text-red-800 dark:text-red-200"
                      }`}
                  >
                    {result.success ? "Sucesso" : "Erro"}
                  </span>
                </div>
                <p className="mb-3 text-sm text-gray-700 dark:text-gray-300">
                  {result.message}
                </p>

                {result.user && (
                  <div className="mt-4 p-3 bg-white dark:bg-gray-800/50 rounded border border-gray-200 dark:border-gray-700">
                    <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                      Informações do Usuário:
                    </h4>
                    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <p>
                        <strong>Usuário:</strong> {result.user.username}
                      </p>
                      <p>
                        <strong>Nome:</strong> {result.user.displayName}
                      </p>
                      <p>
                        <strong>Email:</strong> {result.user.email}
                      </p>
                      <p>
                        <strong>Departamento:</strong> {result.user.department}
                      </p>
                      <p>
                        <strong>Cargo:</strong> {result.user.title}
                      </p>
                      <p>
                        <strong>Número de grupos:</strong>{" "}
                        {result.user.groupCount}
                      </p>
                    </div>
                  </div>
                )}

                {result.timestamp && (
                  <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                    Executado em:{" "}
                    {new Date(result.timestamp).toLocaleString("pt-BR")}
                  </p>
                )}

                <details className="mt-4">
                  <summary className="cursor-pointer text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                    Ver resposta completa (JSON)
                  </summary>
                  <pre className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs overflow-x-auto text-gray-800 dark:text-gray-200">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </details>
              </div>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  )
}
