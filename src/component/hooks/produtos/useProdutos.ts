import pedidoService from "@/src/services/pedidoService"
import useSWR from "swr"

const useProdutos=()=>{
const {data,error}=useSWR('/pedidos',pedidoService.create)

return {
    clientes: data || [],
    error
  };
}
export default useProdutos