
'use client'
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {  useMemo, useState } from "react";
import styles from '../../../../styles/getStyles.module.scss'
import pedidoService from "@/src/services/pedidoService";
import { Button } from "reactstrap";
import Link from "next/link";
import { comandaService } from "@/src/services/comandaService";
import useSWR from "swr";
import TabsSwitcher from "@/src/components/common/switch/switchComponent";
import PedidosList from "@/app/employeeApp/comandas/[id]/pedidoList";
import { usePedidosComanda } from "../../hooks/pedidos/usePedidosComanda";



const Comanda = () => {
  const params=useParams()

  const id  = params.id;
     const token = typeof window !== "undefined"
        ? sessionStorage.getItem("comandas-token")
        : null;
  const {
    pedidos,error,mutate,abaAtiva,setAbaAtiva,pedidosPendentes,pedidosEntregues,handleCancel,delivered,totalDelivered}=usePedidosComanda(token,id as string)
  

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
   pedidos={pedidosEntregues} tipo="pendentes"
    onCancelar={handleCancel}
  />
) : (
  <PedidosList
    pedidos={pedidosEntregues}
    tipo="entregues"
    onCancelar={handleCancel}
  />
)}


        <p className={styles.title}>Valor total entregue: R$ {totalDelivered}</p>

        <Link href={`/employeeApp/payments/pay?comandaId=${id}`} className={styles.btn}>
          <Button>Pagamento</Button>
        </Link>

      </main>
    </div>
  );
};

export default Comanda;
