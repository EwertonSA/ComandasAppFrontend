import { pagamentoService } from "@/src/services/pagamentoService"
import { Table } from "reactstrap"
import useSWR from "swr"
import styles from '../../../../styles/getStyles.module.scss'
const Payments=()=>{
    const {data,error}=useSWR('/pagamentos',pagamentoService.pagamentos)
    const {data:totalData,error:totalError}=useSWR('/pagamnetos/total',pagamentoService.total)
    if(!data || totalData === undefined) return <p>Loading...</p>
    if(error || totalError) return <p>Erro</p>
return(
<main className={styles.main3}>
    <p className={styles.title}>Pagamentos</p>
<Table className={styles.table}>
    <thead>
    <tr>
        <th className={styles.row}>ID</th>
        <th className={styles.row}>Comanda Id</th>
        <th className={styles.row}>Valor</th>
        <th className={styles.row}>Forma de pagamento</th>
    </tr>
    </thead>
<tbody>
{Array.isArray(data.pagamentos) && data.pagamentos.map((pagament:any)=>(

    <tr key={pagament.id}>
<td className={styles.row}>{pagament.id}</td>
<td className={styles.row}>{pagament.comandaId}</td>
<td className={styles.row}>{pagament.valor}</td>
<td className={styles.row}>{pagament.formaPagamento}</td>
           </tr> 
))}
</tbody>
</Table>
<p className={styles.total}>Total de hoje: {Number(totalData).toFixed(2)}</p>
</main>

)
}
export default Payments