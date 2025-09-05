'use server'
import { comandaService } from "@/src/services/comandaService"
import { pagamentoService } from "@/src/services/pagamentoService"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const PaymentAction = async (formData: FormData) => {
  const comandaId = formData.get('comandaId') as string
  const formaPagamento = formData.get('formaPagamento') as string

  const cookieStore = await cookies()
  const token = cookieStore.get("clientes-token")?.value || ''

  try {
    // Pega os pedidos da comanda usando fetch no service
    const comanda = await comandaService.getClientOrders(token)
    if (!comanda || !comanda.pedidos) {
      throw new Error("Comanda inválida ou sem pedidos.")
    }

    // Soma somente os pedidos entregues
    const total = comanda.pedidos.reduce((acc: number, pedido: any) => {
      const delivered = pedido.status.toLowerCase() === 'entregue'
      return acc + (delivered ? Number(pedido.total ?? 0) : 0)
    }, 0)

    // Chama o pagamento e espera a resposta
    const payResult = await pagamentoService.pagamento(token, {
      comandaId,
      valor: total.toFixed(2),
      formaPagamento,
      status: "Pago"
    })

    if (payResult.error) {
      console.error("Erro no pagamento:", payResult.error)
      throw new Error(payResult.error)
    }

  } catch (err: any) {
    console.error("Erro ao registrar pagamento:", err.message || err)
    // opcional: você pode redirecionar para uma página de erro
    redirect('/erro-pagamento')
  }

  // Redireciona após pagamento
  redirect('/login/index')
}

export default PaymentAction
