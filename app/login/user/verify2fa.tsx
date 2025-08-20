"use server";

import { cookies } from "next/headers";
import authService from "@/src/services/authService";
import { redirect } from "next/navigation";

export async function Verify2FAAction(userId: number, token: string) {
  const res = await authService.verify2fa({ userId, token });

  if (res?.status !== 200) {
    throw new Error("Código inválido");
  }

  // 🔹 backend deve devolver o JWT definitivo aqui
 const cookie=await cookies()
 cookie.set("comandas-token", res.data.token, { httpOnly: true });

  redirect("/employeeApp");
}
