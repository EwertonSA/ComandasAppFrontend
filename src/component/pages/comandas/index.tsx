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

const fetchPedidos = async (id: string) => {
  const res = await comandaService.getPedidosComanda(id);
  const details = await Promise.all(
    (res.pedidos || []).map(async (pedido: any) => {
      const detail = await pedidoService.getOrdersById(pedido.id);
      return { ...detail, id: pedido.id };
    })
  );
  return details;
};

const Comanda = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: pedidos, error, mutate } = useSWR(
    id ? `/comanda/${id}` : null,
    () => fetchPedidos(id as string)
  );

  const [abaAtiva, setAbaAtiva] = useState<'pendentes' | 'entregues'>('pendentes');

  const pedidosPendentes = pedidos?.filter(p => p.status.toLowerCase() !== 'entregue') || [];
  const pedidosEntregues = pedidos?.filter(p => p.status.toLowerCase() === 'entregue') || [];

  const totalDelivered = useMemo(() => {
    return pedidosEntregues.reduce((acc, pedido) => {
      return acc + Number(pedido.total || 0);
    }, 0).toFixed(2);
  }, [pedidosEntregues]);

  const delivered = async (pedido: any) => {
    try {
      await pedidoService.updateStatus(pedido.id, 'entregue');
      mutate(); // refaz o fetch para atualizar a tela
    } catch (error) {
      console.error("Erro ao atualizar status", error);
    }
  };

  const handleCancel = async (pedido: any) => {
    try {
      await pedidoService.delete(pedido.id, 'cancelado');
      mutate(); // refaz o fetch para atualizar a tela
    } catch (error) {
      console.error('Erro ao cancelar pedido');
    }
  };

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
