import { useRouter } from "next/router";
import {  useMemo, useState } from "react";
import styles from '../../../../styles/getStyles.module.scss'
import pedidoService from "@/src/services/pedidoService";
import { Button } from "reactstrap";
import Link from "next/link";
import { comandaService } from "@/src/services/comandaService";
import useSWR from "swr";
import TabsSwitcher from "@/src/components/common/switch/switchComponent";
import PedidosList from "@/src/component/render/cards/pedidoList";
import { usePedidosComanda } from "../../hooks/pedidos/usePedidosComanda";



const Comanda = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    pedidos,error,mutate,abaAtiva,setAbaAtiva,pedidosPendentes,pedidosEntregues,handleCancel,delivered,totalDelivered}=usePedidosComanda(id as string)
  

  if (error) return <p>Erro ao carregar pedidos</p>;

  return (
    <div className={styles.div}>
      <main>
 
        <p className={styles.title}>Pedidos da Comanda {id}</p>

        <TabsSwitcher
  abaAtiva={abaAtiva}
  setAbaAtiva={setAbaAtiva}
  options={[
    { label: "Pedidos pendentes", value: "pendentes", color: "warning" },
    { label: "Pedidos entregues", value: "entregues", color: "success" },
  ]}
/>
{abaAtiva === "pendentes" ? (
  <PedidosList
    pedidos={pedidosPendentes}
    tipo="pendentes"
    onEntregar={delivered}
    onCancelar={handleCancel}
  />
) : (
  <PedidosList
    pedidos={pedidosEntregues}
    tipo="entregues"
  />
)}


        <p className={styles.title}>Valor total entregue: R$ {totalDelivered}</p>

        <Link href={`/pagamentos?comandaId=${id}`} className={styles.btn}>
          <Button>Pagamento</Button>
        </Link>

      </main>
    </div>
  );
};

export default Comanda;
