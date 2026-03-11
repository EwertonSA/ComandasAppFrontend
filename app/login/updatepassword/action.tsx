'use server'
import authService from "@/src/services/authService";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function resetAction(formData: FormData): Promise<void> {
  const newPassword = formData.get("password")?.toString() || "";
  const confirmPassword = formData.get("confirmPassword")?.toString() || "";

  const cookieStore = await cookies();
  const token = cookieStore.get('comandas-token')?.value || null;

  if (!token) {
    console.error("Token não encontrado. Faça login novamente.");
    return;
  }

  await authService.updatePassword(token, newPassword, confirmPassword );
 console.log("Token recebido:", token);
console.log("newPassword:", newPassword);
console.log("confirmPassword:", confirmPassword);
  redirect("/login/user"); // 🔹 redireciona e encerra automaticamente
}
