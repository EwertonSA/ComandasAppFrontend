'use server'
import { cookies } from "next/headers"
import { comandaService } from "@/src/services/comandaService"
import PaymentForm from "./form"


interface Props {
  params: { id: string }
}

const Page = async ({ params }: Props) => {
  const comandaId = params.id
  const cookieStore =await cookies()
  const token = cookieStore.get('comandas-token')?.value || ''

 
  const data = await comandaService.getPedidosComanda(token, comandaId)

  if (!data) {
  console.error("Dados da comanda não encontrados ou inválidos")
  throw new Error("Dados da comanda não encontrados")
}
  const totalDelivered = data.pedidos?.reduce((acc: number, pedido: any) => {
    return pedido.status.toLowerCase() === "entregue" ? acc + Number(pedido.total || 0) : acc
  }, 0) || 0

  return (
    <PaymentForm
      comandaId={comandaId}
      totalDelivered={totalDelivered.toFixed(2)}
    />
  )
}

export default Page
