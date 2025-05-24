import { useState } from "react";

import { Table } from "reactstrap";
import PaginationComponent from "@/src/components/common/pagination";
import styles from '../../../../styles/getStyles.module.scss';
import { usePagamentos } from "../../hooks/usePagamentos";
import { useRouter } from "next/router";

const Payments = () => {
  const router=useRouter()
  const [page, setPage] = useState(1);
  const perPage = 10;

  const { pagamentos, totalPages, error } = usePagamentos(page, perPage);

  if (error) return <p>Erro ao carregar os pagamentos.</p>;
  if (!pagamentos) return <p>Loading...</p>;

  return (
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
          {pagamentos.map((pagament: any) => (
            <tr key={pagament.id} onClick={()=>router.push(`/comandas/${pagament.comandaId}`)}>
              <td className={styles.row}>{pagament.id}</td>
              <td className={styles.row}>{pagament.comandaId}</td>
              <td className={styles.row}>{pagament.valor}</td>
              <td className={styles.row}>{pagament.formaPagamento}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <PaginationComponent page={page} setPage={setPage} totalPages={totalPages} />
    </main>
  );
};

export default Payments;
