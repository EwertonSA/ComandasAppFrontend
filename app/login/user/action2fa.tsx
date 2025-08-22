"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import authService from "@/src/services/authService";


export async function LoginAction2fa(formData: FormData) {
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";
  const recaptchaToken = formData.get("recaptchaToken")?.toString() || "";

  const res = await authService.login({ email, password,recaptchaToken });
if (res.status !== 200) {
  console.error("❌ Erro no login:", res);
  return { error: true, message: res.data?.message || "Erro no login" };
}


  // 🔹 3. Se backend pediu 2FA → front mostra QR ou input de código
  if (res.data.twoFARequired) {
    return {
      twoFARequired: true,
      qrCode: res.data.qrCodeDataURL || null,
      userId: res.data.userId,
    };
  }

  // 🔹 4. Se não precisa 2FA → salva JWT direto
  const cookie = await cookies();
  cookie.set("comandas-token", res.data.token, { httpOnly: true });
  redirect("/employeeApp");
}
