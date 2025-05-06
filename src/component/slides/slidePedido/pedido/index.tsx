import { PedidosType } from "@/src/services/productService";
import styles from '../../../../components/common/slideCard/styles.module.scss'


interface pedidoProps{
    pedido:PedidosType
}


const PedidoCard=({pedido}:pedidoProps)=>{
    return <>
    <div className={styles.slide}>
    <img src="/favicon.ico" alt="" className={styles.slideImg} />
    <p className={styles.slideDescription}>Pedido Id: {pedido.id}</p>
    <p className={styles.slideDescription}>Comanda Id: {pedido.comandaId}</p>
        <p className={styles.slideTitle}>Total pedido: {pedido.total}</p>
        <p className={styles.slideDescription}>{pedido.status}</p>
        
        
   
    </div>
    </>
}
export default PedidoCard