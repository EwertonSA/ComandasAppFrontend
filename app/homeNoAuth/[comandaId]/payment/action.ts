'use server'
import { comandaService } from "@/src/services/comandaService"
import { pagamentoService } from "@/src/services/pagamentoService"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const PaymentAction=async(formData:FormData)=>{
const comandaId=formData.get('comandaId') as string
const formaPagamento=formData.get('formaPagamento') as string
const cookie=await cookies()
const token=cookie.get("clientes-token")?.value||''
try{
const comanda=await comandaService.getPedidosComanda(token,comandaId)
const total=comanda.pedidos?.reduce((acc:any,pedido:any)=>{
    const delivered=pedido.status.toLowerCase() ==='entregue'
    const total=delivered ? Number(pedido.total||0):0
    return acc+total
},0||0)
const pay=pagamentoService.pagamento(token,
    {comandaId,valor:total.toFixed(2),formaPagamento,status:"Pago"}
)


}catch(err){
console.error("Erro ao registrar pagamento")

}
redirect('/login/index')
}
export default PaymentAction