"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import authService from "@/src/services/authService";

export async function LoginAction(formData: FormData) {
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";
  {/*const recaptchaToken = formData.get("recaptchaToken")?.toString() || "";*/}
  const role = formData.get("role")?.toString() as "admin" | "user" | "cliente";

  const res = await authService.login({ email, password, role });

  // 🔹 Se o backend pedir 2FA, devolve isso pro frontend
  if (res.data.twoFARequired) {
    return {
      twoFARequired: true,
      userId: res.data.userId,
      qrCode: res.data.qrCodeDataURL || null,
    };
  }

  // 🔹 Se o login for normal (sem 2FA)
  if (res.status === 200 && res.data.token) {
    const setcookie = await cookies();
    setcookie.set("comandas-token", res.data.token, { httpOnly: true });

  }
}
