import clienteService from "@/src/services/clienteService";
import useSWR from "swr";

export const useClientes = (page: number, perPage: number, status = "pendente") => {
  const { data, error } = useSWR(["clientes", page, perPage, status], () =>
    clienteService.getClientesInfo(page, perPage, status)
  );

  return {
    clientes: data?.clientes || [],
    totalPages: data?.totalPages || 1,
    error,
  };
};
