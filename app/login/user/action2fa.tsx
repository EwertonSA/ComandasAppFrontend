"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import authService from "@/src/services/authService";

export async function LoginAction2fa(formData: FormData) {
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  // 🔹 1. Login no backend
  const res = await authService.login({ email, password });

  if (res.status !== 200) {
    redirect("/login/index");
  }

  // 🔹 2. Se backend pediu 2FA → front mostra QR ou input de código
  if (res.data.twoFARequired) {
    return {
      twoFARequired: true,
      qrCode: res.data.qrCodeDataURL || null,
      userId: res.data.userId,
    };
  }

  // 🔹 3. Se não precisa 2FA → salva JWT direto
  const cookie= await   cookies()
cookie.set("comandas-token", res.data.token, { httpOnly: true });
  redirect("/employeeApp");
}
