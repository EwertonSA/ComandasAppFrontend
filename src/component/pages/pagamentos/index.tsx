import { Container } from "reactstrap";

import styles from "../../../../styles/getStyles.module.scss";


import { pagamentoService, PagamentosParams } from "@/src/services/pagamentoService";

import PagamentoCard from "../../render/cards/pagamentoCard";
import { cookies } from "next/headers";

interface PagamentosResponse {
    pagamentos: PagamentosParams[];
  }
const GetPagamentos =async () => {
  const page = 1
const perPage = 10
const cookie=await cookies()
const token=cookie.get('comandas-token')?.value??null
  const pagamentos=await pagamentoService.pagamentos(token,page,perPage)

  if (!token) return <p>Erro ao carregar pagamentos.</p>;

  if (pagamentos.length === 0) return <p>Nenhum pagamento encontrado.</p>;

  return (
    <Container className="d-flex flex-wrap justify-content-center py-5 pb-3">
      <h1 className={styles.title}>Pagamentos</h1>

      {pagamentos.map((pagamento:PagamentosParams) => (
        <PagamentoCard key={pagamento.id} pagamento={pagamento} />
      ))}
    </Container>
  );
};

export default GetPagamentos;
