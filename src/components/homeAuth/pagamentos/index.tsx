import pedidoService from "@/src/services/pedidoService"
import { Button, Container } from "reactstrap"
import useSWR from "swr"
import styles from "../../../../styles/getStyles.module.scss"
import Link from "next/link"
const GetPagamentos=()=>{
    const {data,error}=useSWR('/pagamentos',pedidoService.pagamentos)
    if(error) error
    if(!data){
        return <p>Loading...</p>
    }
    if (data.pagamentos.length === 0) {
        return <p>Nenhum pagamento encontrado.</p>;
      }
    return( <>
       <Container className="d-flex flex-wrap justify-content-center py-5 pb-3">
        <h1 className={styles.title}>Pagamentos</h1>
    {
        data.pagamentos.map((pagamento:{id:number,pedidoId: number, valor: number, formaPagamento: string, status: string})=>(
            <div>
                <div key={pagamento.id}  className={styles.container}>
                 
                        <p>{pagamento.pedidoId}</p>
                        <p>{pagamento.valor}</p>
                        <p>{pagamento.formaPagamento}</p>
                        <p>{pagamento.status}</p>
                        <Link href='/clienteInfo'>
           <Button outline color="success">Ver pagamento
              
              </Button></Link>
                   
                </div>
            </div>
        ))
    }
     </Container>
    </>)
}
export default GetPagamentos