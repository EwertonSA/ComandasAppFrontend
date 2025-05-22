import produtService, { ProductSearchResponse } from "@/src/services/productService";
import useSWR from "swr";

const useProducts = (page: number, perPage: number) => {
  const { data, error } = useSWR<{ data: ProductSearchResponse }>(
    [`/produtos?page=${page}&perPage=${perPage}`],
    () => produtService.getProduct(page, perPage)
  );

  return {
    produtos: data?.data.produtos || [],
    total: data?.data.total || 0,
    totalPages: data ? Math.ceil(data.data.total / perPage) : 1,
    error,
  };
};

export default useProducts;
