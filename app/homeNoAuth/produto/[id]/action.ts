'use server'

import pedidoService from "@/src/services/pedidoService";
import produtService from "@/src/services/productService";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const OrderClientAction = async (formData: FormData) => {
  // 1️⃣ Pega dados do form
  const produtoId = formData.get('produtoId') as string | null;
  const quantidadeStr = formData.get('quantidade') as string | null;

  if (!produtoId || !quantidadeStr) throw new Error("Dados obrigatórios não enviados.");

  const quantidade = parseInt(quantidadeStr);
  if (isNaN(quantidade) || quantidade < 1) throw new Error("Quantidade inválida.");

  // 2️⃣ Pega token do cookie
  const cookieStore = await cookies();
  const token = cookieStore.get('clientes-token')?.value;
  if (!token) throw new Error("Token não encontrado");

  // 3️⃣ Decodifica o token para extrair comandaId
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error("Token inválido");

  const payloadJson = Buffer.from(parts[1], 'base64').toString('utf-8');
  const payload = JSON.parse(payloadJson) as { comandaId: string };

  const comandaId = payload.comandaId;
  if (!comandaId) throw new Error("Comanda não encontrada no token");

  // 4️⃣ Busca produto
  const produto = await produtService.getProductById(token, produtoId);
  if (!produto) throw new Error('Produto não encontrado');

  const total = parseFloat(produto.preco) * quantidade;
console.log('OrderClientAction -> produtoId:', produtoId, 'comandaId:', comandaId);
  // 5️⃣ Registra pedido
  const response = await pedidoService.registerAllForClient({
    token,
    comandaId,
    produtoId,
    quantidade,
    total,
  });

  if (response.status !== 200 && response.status !== 201) throw new Error("Falha ao registrar pedido.");

  // 6️⃣ Redireciona
  redirect(`/homeNoAuth`);
};

export default OrderClientAction;
