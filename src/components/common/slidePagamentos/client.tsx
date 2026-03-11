'use client'

import SlideComponent from "@/src/components/common/slideComponent"
import Link from "next/link"
import { Button, Container } from "reactstrap"
import PagamentosCard from "./PagamentoCard"
import styles from '../slideSection/styles.module.scss';
import { PagamentosParams } from "@/src/services/pagamentoService"
interface Props{
    pagamentosArray:PagamentosParams[];
    totalData:number;
}
const PagamentoSlide=({ pagamentosArray, totalData }: Props)=>{
return(
     <Container className="d-flex flex-column align-items-center">
      <Link href="/employeeApp/payments" className="text-center">
        <p className={styles.title}>Pagamentos</p>
      </Link>

      <SlideComponent itemsLength={pagamentosArray.length}>
        {pagamentosArray.map((pagamento) => (
     
            <PagamentosCard pagamentos={pagamento} />

        ))}
      </SlideComponent>

      <p className={styles.total}>
        Total de hoje: {Number(totalData).toFixed(2)}
      </p>

      <Link href='/employeeApp/payments'>
        <Button outline>Veja todos os pagamentos</Button>
      </Link>
    </Container>
)
}
export default PagamentoSlide