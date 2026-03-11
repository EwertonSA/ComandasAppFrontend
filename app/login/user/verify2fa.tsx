"use server";

import { redirect } from "next/navigation";
import authService from "@/src/services/authService";

export async function Verify2FAAction(userId: number, token: string) {
  const res = await authService.verify2fa({ userId, token });

  if (res!.status !== 200) {
    throw new Error("Código 2FA inválido");
  }

  // ✅ Cookie HttpOnly já setado pelo backend → frontend não precisa manipular
  const userRole = res!.data.user.role;

  if (userRole === "admin") return redirect("/admin");
  if (userRole === "user") return redirect("/employeeApp");
  if (userRole === "cliente") return redirect("/clientApp");

  // fallback
  return redirect("/login/index");
}
