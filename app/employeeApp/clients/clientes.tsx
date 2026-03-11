'use server'

import { Table } from "reactstrap";
import styles from "../../../styles/getStyles.module.scss"
import PaginationComponent from "@/src/components/common/pagination";
import clienteService from "@/src/services/clienteService";
import { OrdersPageProps } from "@/app/employeeApp/orders/allORders";
import { cookies } from "next/headers";
import Link from "next/link";
export interface ClienteParams {
  id: number;
  nome: string;
  mesaId: string;
  comandas?: Comanda;  // comanda opcional, já que pode não existir
}
interface Comanda{
  id:string
}

const Clientes =async ({searchParams}:OrdersPageProps) => {
const cookie=await cookies()
const token=cookie.get('comandas-token')?.value|| ''
    const page = parseInt(searchParams.page || '1', 10);
   const perPage =10;
  const response = await clienteService.getClientes(token,page,perPage)
  const clientes=response.clientes

  if ( clientes?.error) return <p>Erro ao retornar os clientes.</p>;
  if (!clientes || (clientes.length === 0)) return <p>No results</p>;
const totalPages = Math.ceil(response.total / response.perPage);
  return (
    <main className={styles.main3}>
      <p className={styles.title}>Clientes:</p>
            <Table  className={styles.table}>
     <thead>
      <tr>
          <th className={styles.row}>Nome:</th>
        <th className={styles.row}>Mesa ID:</th>
          
     </tr>
     </thead>
<tbody>
  {clientes.map((cliente: ClienteParams, index: number) => (
    <tr key={index} className={styles.rowLink}>
      <td className={styles.row}>
        {cliente.comandas?.id ? (
          <Link href={`/comandas/${cliente.comandas.id}`}>{cliente.nome}</Link>
        ) : (
          cliente.nome
        )}
      </td>
      <td className={styles.row}>{cliente.mesaId}</td>
    </tr>
  ))}
</tbody>

         </Table>
            {!isNaN(totalPages) && (
  <PaginationComponent page={page}  totalPages={totalPages} />
)}
    </main>
  );
};

export default Clientes;
