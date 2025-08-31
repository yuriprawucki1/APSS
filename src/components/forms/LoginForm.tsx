"use client"

import { Button, Card, CardBody, CardHeader, Input } from "@heroui/react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { EyeFilledIcon, EyeSlashFilledIcon } from "../ui/EyeIcon"

type LoginForm = {
  username: string
  password: string
}

export default function LoginFormHeroUI() {
  const router = useRouter()

  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>()

  const [error, setError] = useState("")

  async function onSubmit(data: LoginForm) {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    })

    if (res.ok) {
      return router.push("/admin")
    }

    switch (res.status) {
      case 403:
        setError("Acesso negado — verifique suas permissões.")
        break
      case 401:
        setError("Credenciais inválidas — tente novamente.")
        break
      default:
        console.error("Erro inesperado:", res)
        setError("Ocorreu um erro ao processar sua solicitação.")
    }
  }

  return (
    <motion.div
      key="login"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md"
    >
      <Card shadow="lg" className="rounded-2xl border border-content3">
        <CardHeader className="flex flex-col items-start pb-0">
          <h2 className="text-xl font-bold">Login</h2>
          <p className="text-sm text-gray-500">Área administrativa</p>
        </CardHeader>
        <CardBody className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Usuário"
              placeholder="Digite seu usuário"
              {...register("username", { required: "Campo obrigatório" })}
              isInvalid={!!errors.username}
              errorMessage={errors.username?.message}
            />
            <Input
              label="Senha"
              placeholder="Digite sua senha"
              type={isVisible ? "text" : "password"}
              {...register("password", { required: "Campo obrigatório" })}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
              endContent={
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-solid outline-transparent cursor-pointer"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
            />
            <Button type="submit" color="primary" className="w-full">
              Entrar
            </Button>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
          </form>
          <Button
            className="w-full"
            variant="light"
            onPress={() => {
              router.push("/")
            }}
          >
            Início
          </Button>
        </CardBody>
      </Card>
    </motion.div>
  )
}
