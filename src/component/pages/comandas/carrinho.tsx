
import { Button, Container } from "reactstrap"

import styles from "../../../../styles/getStyles.module.scss"
import  { Pedido } from "../../render/cards/pedidoList"

import Link from "next/link"
import { useRouter } from "next/router"

import CardLocal from "../../render/cards/carrinho"
import TabsSwitcher from "@/src/components/common/switch/switchComponent"
import { usePedidosComanda } from "../../hooks/pedidos/usePedidosComanda"

interface CardProps{
    id:string,
  
}


const Card=({id}:CardProps )=>{
  
  const router=useRouter()
  const comandaId=router.query.comandaId as string
  const {
    pedidos,error,mutate,abaAtiva,setAbaAtiva,pedidosPendentes,pedidosEntregues,handleCancel,delivered,totalDelivered}=usePedidosComanda(id)
 

return(
    <>
      <p className={styles.title}>Pedidos da comanda #{id}</p>
    <Container className={styles.main}>
      <TabsSwitcher abaAtiva={abaAtiva} setAbaAtiva={setAbaAtiva}  options={[
    { label: "Pedidos pendentes", value: "pendentes", color: "warning" },
    { label: "Pedidos entregues", value: "entregues", color: "success" },
  ]}/>
{abaAtiva === "pendentes"?(
 <CardLocal tipo="pendentes"  cancelar={handleCancel} pedidos={pedidosPendentes} />

):(
  <CardLocal pedidos={pedidosEntregues} tipo="entregues" cancelar={handleCancel}/>
)}  
  
     
    </Container>
    <div className="d-flex flex-column align-items-center justify-content-center m-3">
           <p className={styles.title}>Valor total entregue: R$ {totalDelivered}</p>
      <Link href={`/pagamentoCliente?comandaId=${comandaId}`}><Button className={styles.btn}>Finalizar</Button></Link>
    </div>
 
    </>
)
}
export default Card