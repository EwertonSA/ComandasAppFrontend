import useSWR from "swr";
import clienteService from "@/src/services/clienteService";

export const useClientes = () => {
  const { data, error } = useSWR("/clientes", clienteService.getClientesInfo);

  return {
    clientes: data || [],
    error
  };
};
