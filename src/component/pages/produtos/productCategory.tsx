import { useEffect, useState } from "react";
import productService from "@/src/services/productService";

import { ProductType } from "@/src/services/productService";
import SlideCategorias from "../../slides/slideProdutos";

const SlideProdutosPorCategoria = () => {
  const [produtosPorCategoria, setProdutosPorCategoria] = useState<{ [key: string]: ProductType[] }>({});
  const categorias = ["Bebidas", "Entradas", "Pratos", "Sobremesas"];

  useEffect(() => {
    async function fetchProdutos() {
      const resultado: { [key: string]: ProductType[] } = {};
      for (const categoria of categorias) {
        const data = await productService.getByCategories(categoria);
        resultado[categoria] = data;
      }
      setProdutosPorCategoria(resultado);
    }

    fetchProdutos();
  }, []);

  return <SlideCategorias produtosPorCategoria={produtosPorCategoria} />;
};

export default SlideProdutosPorCategoria;
