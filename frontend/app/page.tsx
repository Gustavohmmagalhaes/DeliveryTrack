"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LoginForm } from "@/components/auth/login-form"
import { AuthLayout } from "@/components/layouts/auth-layout"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true)

    // Simulação de login
    setTimeout(() => {
      // Armazena informações do usuário no localStorage
      localStorage.setItem("user", JSON.stringify({ email, name: " Guilherme " }))
      setIsLoading(false)
      router.push("/deliveries")
    }, 1000)
  }

  return (
    <AuthLayout>
      <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
    </AuthLayout>
  )
}
