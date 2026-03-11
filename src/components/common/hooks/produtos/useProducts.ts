import useSWR from "swr";
import { useEffect, useState } from "react";
import api from "@/src/services/api";


const fetcher = async ([url, token]: [string, string]) => {
  const res = await api.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
const useProducts = (page: number, perPage: number) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const t = sessionStorage.getItem("comandas-token");
      setToken(t);
    }
  }, []);

  const { data, error } = useSWR(
    token ? [`/api/produtos?page=${page}&perPage=${perPage}`, token] : null,
    fetcher
  );

  return {
    produtos: data?.produtos || [],
    total: data?.total || 0,
    error,
  };
};

export default useProducts;
