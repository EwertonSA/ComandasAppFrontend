

import { PedidoParams } from "@/src/services/pedidoService";
import styles from "../../../../styles/getStyles.module.scss";
import Link from "next/link";
import { Button } from "reactstrap";
interface pedidosProps{
    pedido:PedidoParams
}
const pedidoCard=({pedido}:pedidosProps)=>{
    <div key={pedido.id} className={styles.container} >
          
    <p className={styles.data}>{pedido.id}</p>
    <p className={styles.data}>{pedido.comandaId}</p>
    <p className={styles.data}>{pedido.total}</p>
    <p className={styles.data}>{pedido.status}</p>
   <Link href='/clienteInfo'>
   <Button outline color="success">Ver pedido
      
      </Button></Link>
</div>
}
export default pedidoCard