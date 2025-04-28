
import { PagamentosParams } from '@/src/services/pagamentoService'
import styles from '../../../common/slideCard/styles.module.scss'
interface props{
    pagamentos:PagamentosParams
}
const PagamentosCard=({pagamentos}:props)=>{
return(
    <div className={styles.slide}>
        <p className={styles.slideTitle}>{pagamentos.comandaId}</p>
        <p className={styles.slideDescription}>{pagamentos.valor}</p>
        <p className={styles.slideDescription}>{pagamentos.status}</p>
        <p className={styles.slideDescription}>{pagamentos.formaPagamento}</p>
    </div>
)
}
export default PagamentosCard