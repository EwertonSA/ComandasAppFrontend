  'use server'
  import { cookies } from "next/headers";
  import SearchHomeNoAuth from "./form2";

  import produtService from "@/src/services/productService";
  import SlideCategorias, { SlideCategoriasProps } from "@/src/components/homeNoAuth/slideProdutos";
  import authService from "@/src/services/authService";
  interface PageProps {
    params:Promise<{ comandaId: string }>;
  searchParams: Promise<{ state?: string }>;
  }

  const HomeNoAuth=async({params,searchParams}:PageProps)=>{
    const { comandaId } = await params;
  const cookie= await cookies()
  const token=cookie.get('clientes-token')?.value||'';
 

  const categorias = ["Bebidas", "Entradas", "Pratos", "Sobremesas"];
  const produtosPorCategoria: SlideCategoriasProps["produtosPorCategoria"] = {};
  for (const categoria of categorias) {
      const produtos = await produtService.getByCategories(token, categoria);
      produtosPorCategoria[categoria] = produtos;
  }

  return <>
  <main >
  <div className="d-flex flex-column align-items-center justify-content-center">
  <SearchHomeNoAuth />
  <SlideCategorias produtosPorCategoria={produtosPorCategoria}  comandaId={comandaId}/>
  </div>
  </main>
    </>
  }
  export default HomeNoAuth