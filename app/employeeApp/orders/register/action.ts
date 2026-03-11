'use server'
import produtService from "@/src/services/productService"
import pedidoService from "@/src/services/pedidoService"
import { IngredientService } from "@/src/services/ingredientService"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const OrderAction = async (formData: FormData) => {
  const entrada = formData.get("entrada") as string | null;
  const comandaId = formData.get("comandaId") as string;
  const ingredientesRaw = formData.getAll("ingredientes[]");
  const ingredientes = ingredientesRaw.map(v => v.toString());

  if (!entrada || !entrada.includes("*")) {
    throw new Error("Entrada inválida: valor ausente ou formato incorreto");
  }

  const [produtoNome, quant] = entrada.split("*");
  const quantidade = parseInt(quant, 10);
  if (isNaN(quantidade)) throw new Error("Quantidade inválida");

  const cookieStore = await cookies();
  const token = cookieStore.get("comandas-token")?.value || "";
console.log("TokenNaaction:",token)
  // Buscar produto pelo nome
  const res = await produtService.findByName(token, produtoNome.trim(), 1, 10);
  if (!res.produtos || res.produtos.length === 0) {
    throw new Error("Produto não encontrado");
  }
console.log("ResNaAction:",res)
  const produtoEncontrado = res.produtos[0];
  const produtoId = produtoEncontrado.id;
  const total = produtoEncontrado.preco * quantidade;
const produtoComIngredientes = await produtService.getProductById(token, produtoEncontrado.id);
  // Criar pedidoProduto
  const resOrder = await pedidoService.registerAll({ token, total, quantidade, comandaId, produtoId });
  const pedidoProdutoId = resOrder.pedidosProdutos.id;

  // Filtrar e preparar payload de ingredientes opcionais
const ingredientsToAdd = produtoComIngredientes.ingredients?.filter((ing: any) =>
  ingredientes.includes(ing.id.toString())
) || [];

  if (ingredientsToAdd.length > 0) {
    const payload = {
      pedidoProdutoId,
      ingredientes: ingredientsToAdd.map((ing: any) => ({
        ingredientId: ing.id,
        include: true
      }))
    };

    await IngredientService.saveOrderWithIngredientes(token, payload);
  }

  redirect(`/employeeApp/comandas`);
}

export default OrderAction;
