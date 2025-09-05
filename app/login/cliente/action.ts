'use server'
import authService from "@/src/services/authService"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { comandaService } from "@/src/services/comandaService"

const LoginAction = async (formData: FormData) => {
  const mesaId = formData.get('mesaId') as string
  const nome = formData.get('nome') as string
  const email = formData.get('email') as string

  const cookie = await cookies()
  const res = await authService.autoLogin({ nome, email, mesaId })
  const token = res.token

  if (res.status === 200 || res.status === 201) {
    cookie.set('clientes-token', token, { httpOnly: true })

    // Continua registrando cliente e comanda
    const response = await comandaService.registerAllForClient(token, { nome, mesaId })
    if (!response.status) {
      throw new Error('Impossível registrar comanda')
    }

    // Redireciona para a home sem expor comandaId
    redirect('/homeNoAuth')
  }
}

export default LoginAction
