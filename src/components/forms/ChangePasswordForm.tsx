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

type ChangePasswordForm = {
  username: string
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export default function ChangePasswordForm({ setMode }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ChangePasswordForm>()

  const [isVisibleCurrent, setIsVisibleCurrent] = useState(false)
  const [isVisibleNew, setIsVisibleNew] = useState(false)
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false)

  const toggleVisibilityCurrent = () => setIsVisibleCurrent(!isVisibleCurrent)
  const toggleVisibilityNew = () => setIsVisibleNew(!isVisibleNew)
  const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm)

  const onChangePassword = (data: ChangePasswordForm) => {
    console.log("Trocar Senha:", data)
    // TODO: Chamar API AD para troca de senha
  }

  return (
    <motion.div
      key="change"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md"
    >
      <Card shadow="lg" className="rounded-2xl border border-content3">
        <CardHeader className="flex flex-col items-start pb-0">
          <h2 className="text-xl font-bold">Trocar senha</h2>
          <p className="text-sm text-gray-500">Se já possui uma</p>
        </CardHeader>
        <CardBody className="space-y-4">
          <form onSubmit={handleSubmit(onChangePassword)} className="space-y-4">
            <Input
              label="Usuário"
              placeholder="Apenas o nome, sem o @..."
              {...register("username", { required: "Campo obrigatório" })}
              isInvalid={!!errors.username}
              errorMessage={errors.username?.message}
            />
            <Input
              label="Senha atual"
              type={isVisibleCurrent ? "text" : "password"}
              {...register("currentPassword", {
                required: "Campo obrigatório",
              })}
              isInvalid={!!errors.currentPassword}
              errorMessage={errors.currentPassword?.message}
              endContent={
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-solid outline-transparent cursor-pointer"
                  type="button"
                  onClick={toggleVisibilityCurrent}
                >
                  {isVisibleCurrent ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
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
            <Button type="submit" color="primary" className="w-full">
              Alterar senha
            </Button>
          </form>
          <p className="text-sm text-center text-gray-500">
            Esqueceu sua senha ou não tem uma?{" "}
            <Link
              underline="hover"
              className="cursor-pointer"
              onPress={() => setMode("recover")}
            >
              Recuperar/Criar
            </Link>
          </p>
        </CardBody>
      </Card>
    </motion.div>
  )
}
