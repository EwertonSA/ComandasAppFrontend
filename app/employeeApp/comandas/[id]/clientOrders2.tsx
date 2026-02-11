import { useMemo, useState } from "react"
import styles from '../../../../styles/getStyles.module.scss'
interface Props{
    id:number
    pedidos:any[],
    onCancelar:(pedido:any)=>void
}
const ClientOrders=({id,pedidos,onCancelar}:Props)=>{
    const [abaAtiva,setAbaAtiva]=useState<'pendentes'|'entregues'>('pendentes')

    const pedidosPendentes=useMemo(()=>pedidos.filter((pedido)=>pedido.status.toLowerCase !== 'entregue')

,[pedidos])

const pedidosEntregues= useMemo(()=>pedidos.filter((pedido)=>pedido.status.toLowerCase === 'entregue'),[pedidos])

const totalDelivered= useMemo(()=>pedidos.reduce((acc,pedido)=>{
    return acc+Number(pedido.total||0)
},0).toFixed(2),[pedidosEntregues])

return(
    <p className={styles.title}>Pedidos da comanda {id}</p>
)
}
export default ClientOrders