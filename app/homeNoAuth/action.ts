'use server'
import pedidoService from "@/src/services/pedidoService";
import produtService from "@/src/services/productService";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SearchOrderAction(formData:FormData){

    const comandaId = formData.get('comandaId') as string | null;
    const produtoId = formData.get('produtoId') as string | null;
    const quantidadeStr = formData.get('quantidade') as string | null;
       if (!comandaId || !produtoId || !quantidadeStr) {
      throw new Error("Dados obrigatórios não enviados.");
    }

    const quantidade = parseInt(quantidadeStr);
    if (isNaN(quantidade) || quantidade < 1) {
      throw new Error("Quantidade inválida.");
    }
 const cookieStore = await cookies();
    const token = cookieStore.get('clientes-token')?.value || '';

    // Buscar produto para obter o preço
    const produto = await produtService.getProductById(token, produtoId);
    if (!produto) {
      throw new Error("Produto não encontrado.");
    }

    const preco = parseFloat(produto.preco);
    if (isNaN(preco)) {
      throw new Error("Preço do produto inválido.");
    }

    const total = quantidade * preco;

    const response = await pedidoService.registerAll({
      token,
      comandaId,
      produtoId,
      quantidade,
      total,
    });

    if (response.status !== 200 && response.status !== 201) {
      throw new Error("Falha ao registrar pedido.");
    }

    redirect(`/employeeApp/${comandaId}`);
  } 
