
import { pagamentoService, PagamentosParams } from "@/src/services/pagamentoService";
import { cookies } from "next/headers";
import PagamentoSlide from "./client";

const SlidePagamentos = async() => {
    const cookie= await cookies()
const token=cookie.get('comandas-token')?.value || null;
const data=await pagamentoService.pagamentos(token)
const totalData=await pagamentoService.total(token)
  if (!token) return <p>Erro de autenticação.</p>;
  if (!data || totalData === undefined) return <p>Loading....</p>;

  const pagamentosArray: PagamentosParams[] = data?.pagamentos || [];

  return (
   <PagamentoSlide pagamentosArray={data.pagamentos} totalData={totalData}/>
  );
};

export default SlidePagamentos;
