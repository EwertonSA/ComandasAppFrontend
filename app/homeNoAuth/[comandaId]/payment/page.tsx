'use server'
import { comandaService } from "@/src/services/comandaService"
import { cookies } from "next/headers"
import PaymentForm from "./form"

interface PageProps {
  params: Promise<{ comandaId: string }>
  searchParams?: Promise<{ formaPagamento?: string }>
}

const Page = async ({ params, searchParams }: PageProps) => {
  const { comandaId } = await params
  const cookieStore = await cookies()
  const token = cookieStore.get('clientes-token')?.value || ''
 const search = searchParams ? await searchParams : {}
  const comanda = await comandaService.getClientOrders(token)
  if (!comanda) throw new Error("Comanda inexistente.")

  const delivered = comanda.pedidos.reduce((acc: number, pedido: any) => {
    return pedido.status.toLowerCase() === 'entregue' ? acc + Number(pedido.total || 0) : acc
  }, 0)
   const formaPagamento = search?.formaPagamento || ""

  return (
    <PaymentForm
      params={{ comandaId }}
      valor={delivered.toFixed(2)}
      formaPagamento={formaPagamento || ""}
    />
  )
}

export default Page
