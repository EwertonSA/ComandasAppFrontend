import clienteService from "@/src/services/clienteService"
import useSWR from "swr"

const useGetClientes = (page: number, perPage: number) => {
  const { data, error } = useSWR(
    ["/clientes", page, perPage],
    () => clienteService.getClientes(page, perPage)
  );

  const totalPages = data && typeof data.total === "number"
    ? Math.ceil(data.total / perPage)
    : 1;

  return {
    clientes: data || [],
    totalPages,
    error,
  };
};

export default useGetClientes