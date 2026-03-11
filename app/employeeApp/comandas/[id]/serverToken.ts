'use server'
import pedidoService from "@/src/services/pedidoService";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const updateOrder=async(formData:FormData)=>{
  const id = formData.get("id");
  const status = formData.get("status");
const comandaId=formData.get('comandaId')
  if (typeof id !== "string" || typeof status !== "string") {
    throw new Error("Parâmetros inválidos");
  }
const cookie=await cookies()
    const token=cookie.get('comandas-token')?.value||''
   const res=await pedidoService.updateStatus(token,id,status)
   redirect(`/employeeApp/comandas/${comandaId}`)
}
export default updateOrder