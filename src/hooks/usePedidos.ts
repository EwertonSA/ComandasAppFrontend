import useSWR from "swr"
import pedidoService, { PedidoParams } from "../services/pedidoService"

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