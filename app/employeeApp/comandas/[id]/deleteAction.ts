'use server'

import pedidoService from "@/src/services/pedidoService"
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export const cancelOrder = async (formData: FormData) => {
  const id = formData.get('id') as string;
  const status = formData.get('status') as string;
const comandaId=formData.get('comandaId')
  const cookie = await cookies();
  const token = cookie.get('comandas-token')?.value || '';

  try {
    await pedidoService.delete(token, id, status);
  } catch (error) {
    console.error("Erro ao cancelar pedido", error);
  }
  redirect(`/employeeApp/comandas/${comandaId}`)
};