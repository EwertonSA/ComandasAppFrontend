import { pagamentoService } from "@/src/services/pagamentoService";
import useSWR from "swr";

interface PagamentosResponse {
  pagamentos: any[]; // ou o tipo correto dos pagamentos
  total: number;
}

export const usePagamentos = (page: number, perPage: number) => {
  const { data, error } = useSWR<PagamentosResponse>(
    ['/pagamentos', page, perPage],
    () => pagamentoService.pagamentos(page, perPage)
  );

  return {
    pagamentos: data?.pagamentos || [],
    totalPages: data ? Math.ceil(data.total / perPage) : 1,
    error,
  };
};
