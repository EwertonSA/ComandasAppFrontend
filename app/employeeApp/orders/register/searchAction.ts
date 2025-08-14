'use server'
import produtService from "@/src/services/productService"
import { cookies } from "next/headers"

const SearchAction=async(nome:string)=>{
const cookie=await cookies()
const token=cookie.get('comandas-token')?.value || ''
const res=await produtService.findByName(token,nome,1,5)
return res?.produtos || []
}
export default SearchAction