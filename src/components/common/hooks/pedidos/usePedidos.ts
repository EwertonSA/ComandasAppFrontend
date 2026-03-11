import pedidoService, { PedidoParams } from "@/src/services/pedidoService";
import useSWR from "swr"


interface pedidosResponse{
    pedidos:PedidoParams[]
}
export const usePedidos=()=>{
   const token = typeof window !== "undefined" ? sessionStorage.getItem("comandas-token") : null;
const {data,error}=useSWR<pedidosResponse>('/pedidos',()=>pedidoService.getPedidos(token))
return {
    pedidos: data?.pedidos || [],
    error,
   
  };
}