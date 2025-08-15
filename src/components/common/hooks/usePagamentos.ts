import { pagamentoService } from "@/src/services/pagamentoService";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface PagamentosResponse {
  pagamentos: any[]; // ou o tipo correto dos pagamentos
  total: number;
}

export const usePagamentos = (page: number, perPage: number) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = sessionStorage.getItem("comandas-token");
      setToken(storedToken);
    }
  }, []);

  const { data, error } = useSWR<PagamentosResponse>(
    token ? ['/pagamentos', page, perPage] : null,
    () => pagamentoService.pagamentos(token, page, perPage)
  );

  return {
    pagamentos: data?.pagamentos || [],
    totalPages: data ? Math.ceil(data.total / perPage) : 1,
    error,
  };
};
