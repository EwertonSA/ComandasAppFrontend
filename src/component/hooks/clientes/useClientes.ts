"use client";

import clienteService from "@/src/services/clienteService";
import { useEffect, useState } from "react";
import useSWR from "swr";

export const useClientes = (
  page: number,
  perPage: number,
  status = "pendente"
) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tokenFromStorage =
        sessionStorage.getItem("comandas-token")?.trim() ||
        sessionStorage.getItem("cliente-token")?.trim() ||
        null;
      setToken(tokenFromStorage);
    }
  }, []);

  const shouldFetch = !!token;

  const { data, error, isValidating, mutate } = useSWR(
    shouldFetch ? ["clientes", token, page, perPage, status] : null,
    () => clienteService.getClientesInfo(token!, page, perPage, status),
    {
      revalidateOnFocus: false, // opcional
    }
  );

  return {
    clientes: data?.clientes ?? [],
    totalPages: data?.totalPages ?? 1,
    isLoading: shouldFetch && !data && !error,
    isValidating,
    error,
    mutate,
  };
};
