"use server";

import authService from "@/src/services/authService";

export async function LoginAction(formData: FormData) {
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";
  const role = formData.get("role")?.toString() as "admin" | "user" | "cliente";

  const res = await authService.login({ email, password, role });

  // Backend retornou necessidade de 2FA
  if (res.data.twoFARequired) {
    return {
      twoFARequired: true,
      userId: res.data.userId,
      qrCode: res.data.qrCodeDataURL || null,
    };
  }

  // Login sem 2FA → backend já retornou token via cookie
  return {
    twoFARequired: false,
    user: res.data.user || null,
  };
}
