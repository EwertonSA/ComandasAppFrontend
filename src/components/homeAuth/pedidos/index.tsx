import pedidoService from "@/src/services/pedidoService"
import { PedidosType } from "@/src/services/productService"

import { Button, Container } from "reactstrap"
import useSWR from "swr"
import styles from "../../../../styles/getStyles.module.scss"
import Link from "next/link"
import PedidoCard from "../../homeNoAuth/slidePedido/pedido"
const GetPedidos=()=>{
    const {data,error}=useSWR('/pedidos',pedidoService.getPedidos)
    if(error) error
    if(!data){
        return <p>Loading</p>
    }
    return (<>

    <Container className="d-flex flex-wrap justify-content-center pb-3 py-5"> 
    <h1>Pedidos</h1>
{    data.pedidos.map((pedido:PedidosType)=>(
      <div  >
    <PedidoCard pedido={pedido}/>
         
       
      </div>
    ))}
    </Container>

    </>)
}
export default GetPedidos