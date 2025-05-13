import { comandaService } from "@/src/services/comandaService";
import pedidoService from "@/src/services/pedidoService";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import useSWR from "swr";

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

export const usePedidosComanda = (id: string | undefined) => {
  const router = useRouter();


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
  return{
    pedidos,error,mutate,abaAtiva,setAbaAtiva,pedidosPendentes,pedidosEntregues,handleCancel,delivered,totalDelivered}
  }
