
import { useState } from "react";
import TabsSwitcher from "@/src/components/common/switch/switchComponent";

import styles from "../../../../styles/getStyles.module.scss";


import { useClientes } from "@/src/component/hooks/clientes/useClientes";
import ClienteCard from "../../render/cards/clienteCard";

const ClienteInfo = () => {
  const { clientes, error } = useClientes();
  const [abaAtiva, setAbaAtiva] = useState<"andamento" | "paga">("andamento");

  if (error) return <p>Erro ao carregar dados dos clientes.</p>;


  const clientesFiltrados = clientes.filter((cliente: any) => {
    const status = typeof cliente.comandas?.status === "string"
      ? cliente.comandas?.status.toLowerCase()
      : "";
    if (!cliente.comandas) return abaAtiva === "andamento";
    return abaAtiva === "andamento" ? status !== "pago" : status === "pago";
  });
  return (
    <div className={styles.div}>
      <TabsSwitcher
        abaAtiva={abaAtiva}
        setAbaAtiva={setAbaAtiva}
        btnClassName={styles.btn}
        options={[
          { label: "Em andamento", value: "andamento", color: "primary" },
          { label: "Comandas pagas", value: "paga", color: "primary" },
        ]}
      />
      <div className={styles.main}>
        {clientesFiltrados.map((cliente: any, index: number) => (
          <ClienteCard key={index} cliente={cliente} />
        ))}
      </div>
    </div>
  );
};

export default ClienteInfo;
