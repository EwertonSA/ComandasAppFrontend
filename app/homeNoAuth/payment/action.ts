'use server'

import { comandaService } from "@/src/services/comandaService"
import { pagamentoService } from "@/src/services/pagamentoService"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const PaymentAction = async (formData: FormData) => {
  const formaPagamento = formData.get('formaPagamento') as string

  const cookieStore = await cookies()
  const token = cookieStore.get("clientes-token")?.value || ''
console.log("TOKEN:", token)
  try {
    // Recupera a comanda do cliente pelo token
    const comanda = await comandaService.getClientOrders(token)
    console.log("Comanda retornada:", comanda)
    if (!comanda || !comanda.pedidos) {
      throw new Error("Comanda inválida ou sem pedidos.")
    }

    // Soma os pedidos entregues
    const total = comanda.pedidos.reduce((acc: number, pedido: any) => {
      const delivered = pedido.status.toLowerCase() === 'entregue'
      return acc + (delivered ? Number(pedido.total ?? 0) : 0)
    }, 0)

    // Envia apenas valor e forma de pagamento
    const payResult = await pagamentoService.paymentClient(token, {
      valor: total.toFixed(2),
      formaPagamento,
      status: "Pago"
    })

if (!payResult || payResult.error) {
  console.error("Erro no pagamento:", payResult.error)
  throw new
  (payResult?.error || "Erro no pagamento")
}

  } catch (err: any) {
    console.error("Erro ao registrar pagamento:", err.message || err)
    redirect('/erro-pagamento')
  }

  redirect('/login/index')
}

export default PaymentAction
