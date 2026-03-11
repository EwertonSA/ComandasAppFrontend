'use server'
import { comandaService } from "@/src/services/comandaService"
import { pagamentoService } from "@/src/services/pagamentoService"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

const Pay=async(formData:FormData)=>{
const comandaId=formData.get('comandaId') as string
const formaPagamento=formData.get('formaPagamento') as string
const cookie=await cookies()
try{
    
const token=cookie.get('comandas-token')?.value||''
 const comanda = await comandaService.getPedidosComanda(token, comandaId);
  const total = comanda.pedidos?.reduce((acc: number, pedido: any) => {
    const isEntregue = pedido.status?.toLowerCase() === "entregue";
    const valorPedido = isEntregue ? Number(pedido.total || 0) : 0;
    return acc + valorPedido;
  }, 0) || 0;
const res=await pagamentoService.pagamento(token,
    {comandaId,
        valor:total.toFixed(2),
        formaPagamento, 
        status: "Pago"})

}catch(err){
     console.error('Erro ao registrar pagamento:', err)
}
redirect('/employeeApp/comandas')
}
export default Pay