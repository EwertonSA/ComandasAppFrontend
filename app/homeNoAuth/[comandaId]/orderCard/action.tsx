'use server'
import pedidoService from "@/src/services/pedidoService"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"


const CancelAction=async(formData:FormData)=>{
const id=formData.get("pedidoId") as string
const status=formData.get('status') as string
if(!id||!status){
    throw new Error('Forneça todos os dados')
}
const cookie=await cookies()
const token=cookie.get('clientes-token')?.value||''
if(!token){
    throw new Error("Token ausente")
}
const res=await pedidoService.delete(token,id,status)
if(!res){
    throw new Error("Erro ao cancelar pedido.")
}
redirect('/homeNoAuth/[comandaId]')
}
export default CancelAction
