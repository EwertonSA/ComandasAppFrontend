'use server'
import { comandaService } from "@/src/services/comandaService"
import pedidoService from "@/src/services/pedidoService"
import { cookies } from "next/headers"
import OrderStatus from "./abaAtiva"

interface OrderCardProps{
    params:Promise<{comandaId:string}>
}

const OrderCard = async({params}:OrderCardProps) => {
  const { comandaId } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get("clientes-token")?.value;
  if (!token) throw new Error("Cliente não autenticado");

  const res = await comandaService.getClientOrders(token);
  if (!res) throw new Error("Comanda não existe no banco.");

  const details = await Promise.all(
    (res.pedidos || []).map(async (pedido: any) => {
      const detail = await pedidoService.getOrdersById(token, pedido.id);
      return { detail, id: pedido.id };
    })
  );

  return (
    <>
      <OrderStatus id={comandaId} token={token} />
    </>
  );
}

export default OrderCard;
