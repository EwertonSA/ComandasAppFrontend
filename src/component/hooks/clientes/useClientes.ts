import useSWR from "swr";
import clienteService from "@/src/services/clienteService";

export const useClientes = () => {
  const { data, error } = useSWR("/clientes", clienteService.getClientesInfo);

  return {
    clientes: data || [],
    error
  };
};
export const getClientes=()=>{
const {data,error}=useSWR('/cliente',clienteService.getClientes)
return{
  clientes:data|| [],
  error
}
}