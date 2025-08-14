'use server'
import { Props } from "@/app/employeeApp/products/[id]/page"
import ClientOrderForm from "./form"
import { cookies } from "next/headers";
import produtService from "@/src/services/productService";
interface OrderProps{
  params:{id:string,comandaId:string}
}
const Page=async({params}:OrderProps)=>{
  const token = (await cookies()).get("clientes-token")?.value || "";
const {id,comandaId}=await params

  const produto = await produtService.getProductById(token, id);

  if (!produto) {
  throw new Error("Produto não encontrado") 
  }



return(
    <ClientOrderForm produtoId={id} comandaId={comandaId} produto={produto} />
)
}
export default Page