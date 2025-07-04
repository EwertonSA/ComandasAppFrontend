

import clienteService, { RegisterParams } from "@/src/services/clienteService";
import { Container, Table } from "reactstrap";
import useSWR from "swr";
import styles from "../../../../styles/getStyles.module.scss"
import { useRouter } from "next/router";
import getClientes from "../../hooks/clientes/useGetClientes";
import { useState } from "react";
import PaginationComponent from "@/src/components/common/pagination";
import useGetClientes from "../../hooks/clientes/useGetClientes";
export interface ClienteParams {
  id: number;
  nome: string;
  mesaId: string;
  comandas?: Comanda;  // comanda opcional, já que pode não existir
}
interface Comanda{
  id:string
}

const Clientes = () => {
  const router=useRouter()
    const [page, setPage] = useState(1);
    const perPage = 10;
  const { clientes,totalPages, error } = useGetClientes(page,perPage)

  if (error || clientes?.error) return <p>Erro ao retornar os clientes.</p>;
  if (!clientes || (Array.isArray(clientes) && clientes.length === 0)) return <p>Carregando...</p>;

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
      {Array.isArray(clientes)&&clientes.map((cliente: ClienteParams, index: number) => (
         
     <tr
      key={index}
      onClick={() => {
        if (cliente.comandas?.id) {
          router.push(`/comandas/${cliente.comandas.id}`);
        } else {
          alert("Comanda não encontrada para este cliente.");
        }
      }}
    >
      <td className={styles.row}>{cliente.nome}</td>      
      <td className={styles.row}>{cliente.mesaId}</td>
    </tr>
     
      

      ))}
      </tbody>
         </Table>
            {!isNaN(totalPages) && (
  <PaginationComponent page={page} setPage={setPage} totalPages={totalPages} />
)}
    </main>
  );
};

export default Clientes;
