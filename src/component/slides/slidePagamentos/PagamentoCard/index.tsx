
import { PagamentosParams } from '@/src/services/pagamentoService'
import styles from '../../../../components/common/slideCard/styles.module.scss'
interface props{
    pagamentos:PagamentosParams
}
const PagamentosCard=({pagamentos}:props)=>{
return(
    <div className={styles.slide}>
        <img src="/pratos.jpg" alt="" className={styles.slideImg}/>
        <p className={styles.slideTitle}><strong> Comanda ID:</strong> {pagamentos.comandaId}</p>
        <p className={styles.slideDescription}><strong>Valor:</strong> {pagamentos.valor}</p>
        <p className={styles.slideDescription}><strong> Status:</strong> {pagamentos.status}</p>
        <p className={styles.slideDescription}><strong>Forma de pagamento:</strong> {pagamentos.formaPagamento}</p>
    </div>
)
}
export default PagamentosCard