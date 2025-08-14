'use client'
import CardLocal from "@/src/component/render/cards/carrinho"
import TabsSwitcher from "@/src/components/common/switch/switchComponent"
import { comandaService } from "@/src/services/comandaService"
import pedidoService from "@/src/services/pedidoService"
import { useEffect, useMemo, useState } from "react"
import { Container, Label } from "reactstrap"
interface OrdersProps{
token:string|null,id:string
}
const OrderStatus=({token,id}:OrdersProps)=>{

const [abaAtiva,setAbaAtiva]=useState<'entregues'|'pendentes'>('pendentes')
const [ordersDelivered,setOrdersDelivered]=useState<any[]>([])
const [ordersTodeliver,setOrdersToDelivered]=useState<any[]>([])

useEffect(()=>{
    const fetchData=async()=>{
const res=await comandaService.getPedidosComanda(token,id)
if(!res){
    throw new Error('Nenhum pedido registrado nesa comnanda')
}
const details=await Promise.all(res.pedidos.map((pedido:any)=>{
   return pedidoService.getOrdersById(token,pedido.id)
}))
const validDetail=details.filter((detail):detail is {status:string}=>Boolean(detail))
const ordersDelivered=validDetail.filter(detail=>detail.status.toLowerCase()==='entregue')
const ordersTodeliver=validDetail.filter(detail=>detail.status.toLowerCase()==='pendente')
setOrdersDelivered(ordersDelivered)
setOrdersToDelivered(ordersTodeliver)
}
fetchData()
},[token,id])


const totalDelivered = useMemo(() => {
  return ordersDelivered
    .reduce((acc, pedido) => acc + Number(pedido.total || 0), 0)
    .toFixed(2);
}, [ordersDelivered]);

    
const delivered=(async(pedido:any)=>{
 try {
    await pedidoService.updateStatus(token,pedido.id,'entregue')
 } catch (error) {
    console.error('Nenhum pedido registrado foi entregue')
 }
})
const handleCancel=async(pedido:any)=>{
    try {
        await pedidoService.delete(token,pedido,'Cancelado')
    } catch (error) {
        
    }
}
return(
    <Container>
        <TabsSwitcher abaAtiva={abaAtiva} setAbaAtiva={setAbaAtiva} options={[
            {label:'Pedidos pendentes',value:'pendentes',color:'warning'},
            {label:'Pedidos entregues',value:'entregues',color:'success'}
] } ></TabsSwitcher>
{abaAtiva === 'pendentes'?(<CardLocal pedidos={ordersTodeliver} tipo="pendentes" cancelar={handleCancel}/>)
:
(<CardLocal pedidos={ordersDelivered} tipo="entregues" cancelar={handleCancel}/>)}
    </Container>
)
}



export default OrderStatus