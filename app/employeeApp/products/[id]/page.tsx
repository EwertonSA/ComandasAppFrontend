'use server'
import { cookies } from "next/headers"
import produtService from "@/src/services/productService"
import { redirect } from "next/navigation"
import OrderFormView from "./form"

export interface PageProps {
  params: Promise<{ id: string }>
  searchParams?: Promise<{ comandaId?: string }>
}

const Page = async ({ params, searchParams }: PageProps) => {
  const cookieStore = await cookies()
  const token = cookieStore.get("comandas-token")?.value || ""

  const { id: produtoId } = await params
  const search = searchParams ? await searchParams : {}
  const comandaId = search?.comandaId || ""

  const produto = await produtService.getProductById(token, produtoId )

  if (!produto) {
    console.error("Produto não encontrado")
    redirect("/erro") // fallback
  }

  return (
    <OrderFormView
      produto={produto}
      produtoId={produtoId}
      comandaId={comandaId}
    />
  )
}

export default Page
