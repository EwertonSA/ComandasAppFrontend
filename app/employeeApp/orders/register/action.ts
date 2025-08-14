'use server'
import produtService from "@/src/services/productService"
import { cookies } from "next/headers"
import { OrdersPageProps } from "../allORders"
import pedidoService from "@/src/services/pedidoService"
import { redirect } from "next/navigation"

const OrderAction=async(formdata:FormData)=>{
const entrada = formdata.get("entrada") as string | null;
const comandaId = formdata.get("comandaId") as string;
if (!entrada || !entrada.includes("*")) {
    throw new Error("Entrada inválida: valor ausente ou formato incorreto");
}

const [produto, quant] = entrada.split("*");
const quantidade = parseInt(quant, 10);
if(isNaN (quantidade)){
   throw new Error('Quatidade inválida')
}
  const cookie=await cookies()
  const token=cookie.get('comandas-token')?.value||''
const page=1;
const perPage=10
const res=await produtService.findByName(token,produto.trim(),page,perPage)
  if (!res.produtos || res.produtos.length === 0) {
    console.error("Produto não encontrado");
    return;
  }

  const produtoEncontrado = res.produtos[0];
  const produtoId = produtoEncontrado.id;
  const total = produtoEncontrado.preco * quantidade;
  
const resOrder=await pedidoService.registerAll({token,total,quantidade,comandaId,produtoId})
  redirect(`/employeeApp/comandas`);

}
export default OrderAction