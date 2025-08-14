'use server'
import { cookies } from "next/headers"
import produtService from "@/src/services/productService"

import { redirect } from "next/navigation"
import OrderFormView from "./form"

export interface Props {
  params: { id: string }
  searchParams?: { comandaId?: string }
}

const Page = async ({ params, searchParams }: Props) => {
  const cookieStore =await cookies()
  const token = cookieStore.get("comandas-token")?.value || ""

  const produto = await produtService.getProductById(token, params.id)

  if (!produto) {
    console.error("Produto não encontrado")
    redirect("/erro") // ou outro fallback
  }

  const comandaId = searchParams?.comandaId || ""

  return (
    <OrderFormView
      produto={produto}
      produtoId={params.id}
      comandaId={comandaId}
    />
  )
}

export default Page
