import clienteService from "@/src/services/clienteService"
import ClienteListClient from "./infoClient"
import { cookies } from "next/headers";

interface Props {
  searchParams: Promise<{
    page?: string;
    aba?: "pendente" | "pago";
  }>;
}

const ClienteInf = async ({ searchParams }: Props) => {
  const cookie = await cookies()
  const token = cookie.get('comandas-token')?.value || ''

  // resolve searchParams
  const params = await searchParams
  const page = parseInt(params.page || '1', 10)
  const perPage = 10
  const status = params.aba || "pendente"

  const { clientes, totalPages } = await clienteService.getClientesInfo(token, page, perPage, status)

  if (!clientes) return <p>Erro ao carregar dados dos clientes.</p>

  return (
    <ClienteListClient 
      clientes={clientes} 
      page={page} 
      totalPages={totalPages}  
      abaAtiva={status} 
    />
  )
}

export default ClienteInf
