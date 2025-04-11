import pedidoService from "@/src/services/pedidoService";
import { Button, Container } from "reactstrap";
import useSWR from "swr";
import styles from '../slideSection/styles.module.scss'
import SlideComponent from "../../common/slideComponent";
import { PagamentosParams } from "@/src/services/clienteService";
import PagamentosCard from "./PagamentoCard";
import Link from "next/link";
import Footer from "../../common/footer";
const SlidePagamentos=()=>{
    const {data,error}=useSWR('/pagamentos',pedidoService.pagamentos)
    if(error) return error
    if(!data) return <p>Loading....</p>
    return(
       <Container className="d-flex flex-column align-items-center">
        <p className={styles.sectionTitle}>Pagamentos pendentes</p>
        <SlideComponent items={data.pagamentos} renderItem={(pagamento:PagamentosParams)=> <PagamentosCard pagamentos={pagamento}/>}/>
        <Link href='/pagamentos'>
        <Button outline>
            Faça seu pagamento
        </Button>
        </Link>
        <Footer/>
       </Container>

    )

}
export default SlidePagamentos