import { comandaService } from "@/src/services/comandaService"
import pedidoService from "@/src/services/pedidoService"
import { cookies } from "next/headers"
import OrderStatus from "./abaAtiva"

interface OrderCardProps{
    params:Promise<{comandaId:string}>
}
const OrderCard=async({params}:OrderCardProps)=>{
const cookie=await cookies()
const token = cookie.get('clientes-token')?.value||''
const {comandaId}=await params
const res=await comandaService.getPedidosComanda(token,comandaId)
if(!res){
     throw new Error("Comanda não existe no banco.")
    }
const details=await Promise.all((res.pedidos|| []).map(async(pedido:any)=>{
    const detail=await pedidoService.getOrdersById(token,pedido.id)
    return{
        detail,id:pedido.id
    }
}))


return(
    <>
   <OrderStatus id={comandaId} token={token} />
    </>
)
}
export default OrderCard