"use server";

import { cookies } from "next/headers";
import authService from "@/src/services/authService";
import { redirect } from "next/navigation";

export async function Verify2FAAction(userId: number, token: string) {
  const res = await authService.verify2fa({ userId, token });

  if (res?.status !== 200) {
    throw new Error("Código inválido");
  }
 const setcookie = await cookies();
    setcookie.set("comandas-token", res.data.token, { httpOnly: true });
   const userRole = res.data.user.role;
   console.log('userRole:', res.data.user.role)
    if (userRole === "admin") redirect("/admin");
    if (userRole === "user") redirect("/employeeApp");
    if (userRole === "cliente") redirect("/clientApp");
  
  // 🔹 Falha no login
  redirect("/login/index");

}