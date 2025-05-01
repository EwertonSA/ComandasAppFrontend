import { Button } from "reactstrap";
import Link from "next/link";
import styles from "../../../../styles/getStyles.module.scss";
import { PagamentosParams } from "@/src/services/pagamentoService";


export interface PagamentoCardProps {
  pagamento: PagamentosParams;
}

const PagamentoCard = ({ pagamento }: PagamentoCardProps) => {
  return (
    <div className={styles.container}>
      <p>Comanda: {pagamento.comandaId}</p>
      <p>Valor: R$ {pagamento.valor}</p>
      <p>Forma de Pagamento: {pagamento.formaPagamento}</p>
      <p>Status: {pagamento.status}</p>

      <Link href="/clienteInfo">
        <Button outline color="success">Ver pagamento</Button>
      </Link>
    </div>
  );
};

export default PagamentoCard;
