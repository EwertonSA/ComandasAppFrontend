'use server'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SearchHomeNoAuth from "./form2";
import produtService from "@/src/services/productService";
import SlideCategorias, { SlideCategoriasProps } from "@/src/components/homeNoAuth/slideProdutos";

interface PageProps {
  params: Promise<{ comandaId: string }>;
  searchParams: Promise<{ state?: string }>;
}

const HomeNoAuth = async ({ params }: PageProps) => {
  const { comandaId } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get('clientes-token')?.value;

  if (!token) {
    redirect('/login'); // ⚡ redireciona se não tiver token
  }

  const categorias = ["Bebidas", "Entradas", "Pratos", "Sobremesas"];

  // ⚡ paraleliza requisições
  const produtosArray = await Promise.all(
    categorias.map(categoria => produtService.getByCategories(token, categoria))
  );

  const produtosPorCategoria: SlideCategoriasProps["produtosPorCategoria"] = {};
  categorias.forEach((cat, i) => {
    produtosPorCategoria[cat] = produtosArray[i] || [];
  });

  return (
    <main>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <SearchHomeNoAuth />
        <SlideCategorias produtosPorCategoria={produtosPorCategoria} comandaId={comandaId} />
      </div>
    </main>
  );
};

export default HomeNoAuth;
