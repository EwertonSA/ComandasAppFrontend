import pedidoService from "@/src/services/pedidoService";
import { Button, Container } from "reactstrap";
import useSWR from "swr";
import styles from '../slideSection/styles.module.scss'
import SlideComponent from "../../../components/common/slideComponent";

import PagamentosCard from "./PagamentoCard";
import Link from "next/link";
import Footer from "../../../components/common/footer";
import { pagamentoService, PagamentosParams } from "@/src/services/pagamentoService";
const SlidePagamentos=()=>{
    const {data,error}=useSWR('/pagamentos',pagamentoService.pagamentos)
    const {data:totalData,error:totalError}=useSWR('/pagamentos/total',pagamentoService.total)
    if(error  || totalError) return error
    if(!data || totalData === undefined) return <p>Loading....</p>
    return(
       <Container className="d-flex flex-column align-items-center">
         <Link href="/allPayments"  className="text-center">
        <p className={styles.title}>Pagamentos</p>
     
        <SlideComponent items={data.pagamentos} renderItem={(pagamento:PagamentosParams)=> <PagamentosCard pagamentos={pagamento}/>}/> </Link>
        <p className={styles.total}>
            Total de hoje: {Number(totalData).toFixed(2)}
            
        </p>
       
        <Link href='/allPayments'>
        <Button outline>
         Veja todos os pagamentos
        </Button>
        </Link>
        <Footer/>
       </Container>

    )

}
export default SlidePagamentos