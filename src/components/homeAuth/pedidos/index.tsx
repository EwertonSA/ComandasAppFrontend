import pedidoService from "@/src/services/pedidoService"
import { PedidosType } from "@/src/services/productService"

import { Button, Container } from "reactstrap"
import useSWR from "swr"
import styles from "../../../../styles/getStyles.module.scss"
import Link from "next/link"
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
    
          <div key={pedido.id} className={styles.container} >
          
            <p className={styles.data}>{pedido.id}</p>
            <p className={styles.data}>{pedido.comandaId}</p>
            <p className={styles.data}>{pedido.total}</p>
            <p className={styles.data}>{pedido.status}</p>
           <Link href='/clienteInfo'>
           <Button outline color="success">Ver pedido
              
              </Button></Link>
        </div>
       
      </div>
    ))}
    </Container>

    </>)
}
export default GetPedidos