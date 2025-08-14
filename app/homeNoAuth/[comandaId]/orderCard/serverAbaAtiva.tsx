'use server'
import { comandaService } from "@/src/services/comandaService"
import pedidoService from "@/src/services/pedidoService"
import Switcher from "./Switcher"
import { Pedido } from "@/app/employeeApp/comandas/[id]/pedidoList"

interface OrderProps {
  token: string
  id: string
}

const OrdersStatus = async ({ token, id }: OrderProps) => {
  const res = await comandaService.getPedidosComanda(token, id)

  if (!res) {
    throw new Error("Nenhum pedido registrado nessa comanda")
  }

  // Pega os detalhes de cada pedido pelo id correto
  const details = await Promise.all(
    res.pedidos.map((pedido: any) => pedidoService.getOrdersById(token, pedido.id))
  )

  // Combina o id original do pedido com os detalhes retornados
  const detailsWithId = res.pedidos.map((pedido: any, i: number) => ({
    ...details[i],
    id: pedido.id,
  }))

  // Filtra os válidos (com status e id)
  const validDetails = detailsWithId.filter(
    (detail:any): detail is Pedido => Boolean(detail && detail.status && detail.id)
  )

  return (
    <>
      <Switcher pedidos={validDetails}  token={token} />
    </>
  )
}

export default OrdersStatus
