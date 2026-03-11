import clienteService from "@/src/services/clienteService"
import { useEffect, useState } from "react"
import useSWR from "swr"

const useGetClientes = (page: number, perPage: number) => {
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = sessionStorage.getItem("comandas-token")
      setToken(storedToken)
    }
  }, [])

  const { data, error } = useSWR(
    token ? ["api/clientesCompleto", page, perPage, token] : null,
    () => clienteService.getClientes(token, page, perPage)
  )

  const clientes = data?.clientes || []
  const totalPages = data && typeof data.total === "number"
    ? Math.ceil(data.total / perPage)
    : 1

  return {
    clientes,
    totalPages,
    error,
  }
}

export default useGetClientes
