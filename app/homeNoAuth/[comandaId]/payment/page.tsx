import { comandaService } from "@/src/services/comandaService"
import { cookies } from "next/headers"
import PaymentForm from "./form"
import { pagamentoService } from "@/src/services/pagamentoService"
interface Params{
    params:{comandaId:string}
    formaPagamento:string

}
const Page=async({params,formaPagamento}:Params)=>{
    const comandaId=params.comandaId
console.log('comandaIdxx',comandaId)
const cookie=await cookies()
const token=cookie.get('clientes-token')?.value||''
const comanda=await comandaService.getPedidosComanda(token,comandaId)
if(!comanda){
    throw new Error("Comanda inexistente.")
}
const delivered= comanda.pedidos.reduce((acc:any,pedido:any)=>{
    return pedido.status.toLowerCase() === 'entregue'?  acc + Number(pedido.total||0):acc 
},0)||0

return(
    <PaymentForm formaPagamento={formaPagamento} params={{comandaId:comanda.id.toString()}} valor={delivered.toFixed(2)}/>
)
}
export default Page