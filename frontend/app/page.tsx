"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { AuthLayout } from "@/components/layouts/auth-layout"

export default function LoginPage() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [isRegistering, setIsRegistering] = useState(true) // Começa com o cadastro visível

  const handleRegister = async (name: string, email: string, password: string) => {
    setIsLoading(true)

    // Simula criação de usuário e login automático
    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify({ name, email }))
      setIsLoading(false)
      setIsRegistering(false) // Vai para tela de login após cadastro
    }, 1000)
  }

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true)

    // Simula autenticação
    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify({ email, name: "Usuário" }))
      setIsLoading(false)
      router.push("/deliveries")
    }, 1000)
  }
  return (
    <AuthLayout>
      <div className="w-full max-w-md flex flex-col items-center space-y-4">
        {isRegistering ? (
          <>
            <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
            <p className="text-sm text-center">
              Já tem conta?{" "}
              <button
                onClick={() => setIsRegistering(false)}
                className="text-blue-600 hover:underline"
              >
                Entrar
              </button>
            </p>
          </>
        ) : (
          <>
            <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
            <p className="text-sm text-center">
              Ainda não tem conta?{" "}
              <button
                onClick={() => setIsRegistering(true)}
                className="text-blue-600 hover:underline"
              >
                Cadastrar
              </button>
            </p>
          </>
        )}
      </div>
    </AuthLayout>
  )
}
