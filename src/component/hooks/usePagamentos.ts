import useSWR from "swr"
import { pagamentoService, PagamentosParams } from "../services/pagamentoService"
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