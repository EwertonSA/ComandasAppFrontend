import pedidoService, { PedidoParams } from "@/src/services/pedidoService";
import useSWR from "swr"


interface pedidosResponse{
    pedidos:PedidoParams[]
}
export const usePedidos=()=>{
const {data,error}=useSWR<pedidosResponse>('/pedidos',pedidoService.getPedidos)
return {
    pedidos: data?.pedidos || [],
    error,
   
  };
}