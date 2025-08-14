'use server'
import { comandaService } from "@/src/services/comandaService"

import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export default async function ClientAction(formdata:FormData){
const mesaId= formdata.get('mesaId')?.toString()|| "";
const nome=formdata.get('nome')?.toString()|| "";
const cookie=await cookies()
const token=cookie.get('comandas-token')?.value || ''
  if (!nome || !mesaId) {
    console.error("Campos obrigatórios")
  }
const res=await comandaService.registrarTudo(token,{mesaId,nome})
if(res.status===200){
    redirect(`/employeeApp/orders/register?comandaId=${res.comandaId}&registred=true`)
}

}
