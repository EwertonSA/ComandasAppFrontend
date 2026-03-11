"use client";
import { useRouter } from "next/navigation";
import TabsSwitcher from "@/src/components/common/switch/switchComponent";

import PaginationComponent from "@/src/components/common/pagination";
import styles from "../../../styles/getStyles.module.scss";
import ClienteCard from "./clienteCard";

interface Props {
  clientes: any[];
  totalPages: number;
  page: number;
  abaAtiva: "pendente" | "pago";
}

const ClienteListClient = ({ clientes, totalPages, page, abaAtiva }: Props) => {
  const router = useRouter();

function changePage(newPage: number) {
  const url = new URL(window.location.href);
  url.searchParams.set("page", newPage.toString());
  url.searchParams.set("aba", abaAtiva); // usa o valor recebido como prop

  router.push(url.pathname + "?" + url.searchParams.toString());
}


  function changeAba(newAba: "pendente" | "pago") {
    const url = new URL(window.location.href);
    url.searchParams.set("aba", newAba);
    url.searchParams.set("page", "1"); // reset page
    router.push(url.toString());
  }

  return (
    <div className={styles.div}>
      <TabsSwitcher
        abaAtiva={abaAtiva}
        setAbaAtiva={changeAba}
        btnClassName={styles.btn}
        options={[
          { label: "Em andamento", value: "pendente", color: "primary" },
          { label: "Comandas pagas", value: "pago", color: "primary" },
        ]}
      />

      <div className={styles.main}>
        {clientes.map((cliente) => (
          <ClienteCard key={cliente.id} cliente={cliente} />
        ))}
      </div>

      {totalPages > 1 && (
        <PaginationComponent
          page={page}
          totalPages={totalPages}
       
        />
      )}
    </div>
  );
};

export default ClienteListClient;
