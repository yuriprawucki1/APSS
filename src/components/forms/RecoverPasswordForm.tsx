"use client"

import { Button, Card, CardBody, CardHeader, Input, Link } from "@heroui/react"
import { motion } from "framer-motion"
import { type Dispatch, type SetStateAction, useState } from "react"
import { useForm } from "react-hook-form"
import { strongPasswordPattern } from "@/constants/regex"
import { EyeFilledIcon, EyeSlashFilledIcon } from "../ui/EyeIcon"

interface Props {
  setMode: Dispatch<SetStateAction<"change" | "recover">>
}

type RecoverPasswordForm = {
  identifier: string
  newPassword: string
  confirmPassword: string
}

export default function RecoverPasswordForm({ setMode }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RecoverPasswordForm>()

  const [isVisibleNew, setIsVisibleNew] = useState(false)
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false)

  const toggleVisibilityNew = () => setIsVisibleNew(!isVisibleNew)
  const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm)

  const onRecoverPassword = (data: RecoverPasswordForm) => {
    console.log("Recuperar Senha:", data)
    // TODO: Chamar API AD para reset/registro de senha
  }

  return (
    <motion.div
      key="recover"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md"
    >
      <Card shadow="lg" className="rounded-2xl border border-content3">
        <CardHeader className="flex flex-col items-start pb-0">
          <h2 className="text-xl font-bold">Recuperar/Criar senha</h2>
          <p className="text-sm text-gray-500">Se não lembra ou nunca criou</p>
        </CardHeader>
        <CardBody className="space-y-4">
          <form
            onSubmit={handleSubmit(onRecoverPassword)}
            className="space-y-4"
          >
            <Input
              label="E-mail"
              placeholder="Digite seu e-mail"
              {...register("identifier", { required: "Campo obrigatório" })}
              isInvalid={!!errors.identifier}
              errorMessage={errors.identifier?.message}
            />
            <Input
              label="Nova senha"
              placeholder="Com pelo menos 8 caracteres"
              type={isVisibleNew ? "text" : "password"}
              {...register("newPassword", {
                required: "Campo obrigatório",
                pattern: {
                  value: strongPasswordPattern,
                  message:
                    "Mín. 8 caracteres, 1 maiúscula, 1 número e 1 símbolo",
                },
              })}
              isInvalid={!!errors.newPassword}
              errorMessage={errors.newPassword?.message}
              endContent={
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-solid outline-transparent cursor-pointer"
                  type="button"
                  onClick={toggleVisibilityNew}
                >
                  {isVisibleNew ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
            />
            <Input
              label="Confirmar nova senha"
              type={isVisibleConfirm ? "text" : "password"}
              {...register("confirmPassword", {
                validate: (value: string) =>
                  value === watch("newPassword") || "As senhas não coincidem",
              })}
              isInvalid={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword?.message}
              endContent={
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-solid outline-transparent cursor-pointer"
                  type="button"
                  onClick={toggleVisibilityConfirm}
                >
                  {isVisibleConfirm ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
            />
            <Button type="submit" color="secondary" className="w-full">
              Recuperar/Criar
            </Button>
          </form>
          <p className="text-sm text-center text-gray-500">
            Já possui uma senha?{" "}
            <Link
              underline="hover"
              className="cursor-pointer"
              onPress={() => setMode("change")}
            >
              Trocar senha
            </Link>
          </p>
        </CardBody>
      </Card>
    </motion.div>
  )
}
