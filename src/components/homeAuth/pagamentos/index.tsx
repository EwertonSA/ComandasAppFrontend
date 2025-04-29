import { Container } from "reactstrap";

import styles from "../../../../styles/getStyles.module.scss";
import { usePagamentos } from "@/src/hooks/usePagamentos";
import PagamentoCard from "@/src/component/pagamentoCard";
import { PagamentosParams } from "@/src/services/pagamentoService";

interface PagamentosResponse {
    pagamentos: PagamentosParams[];
  }
const GetPagamentos = () => {
  const { pagamentos, error } = usePagamentos();

  if (error) return <p>Erro ao carregar pagamentos.</p>;

  if (pagamentos.length === 0) return <p>Nenhum pagamento encontrado.</p>;

  return (
    <Container className="d-flex flex-wrap justify-content-center py-5 pb-3">
      <h1 className={styles.title}>Pagamentos</h1>

      {pagamentos.map((pagamento) => (
        <PagamentoCard key={pagamento.id} pagamento={pagamento} />
      ))}
    </Container>
  );
};

export default GetPagamentos;
