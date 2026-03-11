'use server';

import { Table } from "reactstrap";
import PaginationComponent from "@/src/components/common/pagination";
import styles from '../../../styles/getStyles.module.scss';
import { OrdersPageProps } from "../orders/allORders";
import { cookies } from "next/headers";
import { pagamentoService } from "@/src/services/pagamentoService";
import Link from "next/link";

const Payments = async ({ searchParams }: OrdersPageProps) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("comandas-token")?.value || null;

  const page = parseInt(searchParams.page || "1", 10);
  const perPage = parseInt(searchParams.perPage || "10", 10);

  // Chamada para pegar os pagamentos
  const response = await pagamentoService.pagamentos(token,page,perPage);
  const pagamentos = response?.pagamentos || []; // Ajuste conforme o formato retornado
  const totalPages = Math.ceil((response?.total || 0) / perPage);

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
            <tr key={pagament.id}>
              <td className={styles.row}>
                <Link href={`/comandas/${pagament.comandaId}`}>
                  {pagament.id}
                </Link>
              </td>
              <td className={styles.row}>{pagament.comandaId}</td>
              <td className={styles.row}>{pagament.valor}</td>
              <td className={styles.row}>{pagament.formaPagamento}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <PaginationComponent page={page} totalPages={totalPages} />
    </main>
  );
};

export default Payments;
