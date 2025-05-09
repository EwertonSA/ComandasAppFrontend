import { pagamentoService, PagamentosParams } from "@/src/services/pagamentoService";
import useSWR from "swr"

interface PagamentosResponse {
  pagamentos: PagamentosParams[];
}
export const usePagamentos=()=>{
  const { data, error} = useSWR<PagamentosResponse>(
    '/pagamentos',
    pagamentoService.pagamentos
  );

  return {
    pagamentos: data?.pagamentos || [],
    error,
   
  };
}