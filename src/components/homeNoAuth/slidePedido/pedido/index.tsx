import { PedidosType } from "@/src/services/productService";
import styles from "../../../common/slideCard/styles.module.scss";


interface pedidoProps{
    pedido:PedidosType
}


const PedidoCard=({pedido}:pedidoProps)=>{
    return <>
    <div className={styles.slide}>
    <p className={styles.slideDescription}>{pedido.id}</p>
    <p className={styles.slideDescription}>{pedido.comandaId}</p>
        <p className={styles.slideTitle}>{pedido.total}</p>
        <p className={styles.slideDescription}>{pedido.status}</p>
        
        
   
    </div>
    </>
}
export default PedidoCard