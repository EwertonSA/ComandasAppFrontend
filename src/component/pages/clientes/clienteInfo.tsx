
import { useState } from "react";
import TabsSwitcher from "@/src/components/common/switch/switchComponent";

import styles from "../../../../styles/getStyles.module.scss";



import ClienteCard from "../../render/cards/clienteCard";
import PaginationComponent from "@/src/components/common/pagination";
import { useClientes } from "../../hooks/clientes/useClientes";

const ClienteInfo = () => {
  const [page, setPage] = useState(1);
  const perPage = 10;
  const [abaAtiva, setAbaAtiva] = useState<"pendente" | "pago">("pendente");

  const { clientes, error, totalPages } = useClientes(page, perPage, abaAtiva);

  if (error) return <p>Erro ao carregar dados dos clientes.</p>;

  return (
    <div className={styles.div}>
      <TabsSwitcher
        abaAtiva={abaAtiva}
        setAbaAtiva={(value) => {
          setPage(1);
          setAbaAtiva(value);
        }}
        btnClassName={styles.btn}
        options={[
          { label: "Em andamento", value: "pendente", color: "primary" },
          { label: "Comandas pagas", value: "pago", color: "primary" },
        ]}
      />

      <div className={styles.main}>
        {clientes.map((cliente: any) => (
          <ClienteCard key={cliente.id} cliente={cliente} />
        ))}
      </div>

      {totalPages > 1 && (
        <PaginationComponent
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};
export default ClienteInfo
