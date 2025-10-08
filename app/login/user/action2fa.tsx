"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import authService from "@/src/services/authService";

export async function LoginAction2fa(formData: FormData) {
  try {
    // 🔹 1. Pega campos do formulário
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    const recaptchaToken = formData.get("recaptchaToken")?.toString() || "";
    const role = formData.get("role")?.toString() as "admin" | "user" | "cliente";

    // 🔹 2. Chama backend para login
    const res = await authService.login({ email, password,recaptchaToken, role });



    // 🔹 3. Backend pediu 2FA → retorna info para o frontend
    if (res.data.twoFARequired) {
      return {
        twoFARequired: true,
        qrCode: res.data.qrCodeDataURL || null,
        userId: res.data.userId,
      };
    }

    // 🔹 4. 2FA já validada → salva JWT no cookie HttpOnly
    const cookieStore = await cookies();
    cookieStore.set("comandas-token", res.data.token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60, // 1 dia
      sameSite: "lax",
      path: "/",
    });

    // 🔹 5. Redireciona de acordo com a role
   const userRole = res.data.user.role;
    if (userRole === "admin") {
      redirect("/admin");
    } else if (userRole === "user") {
      redirect("/employeeApp");
    } else if (userRole === "cliente") {
      redirect("/clientApp");
    } else {
      redirect("/login/index");
    }
  } catch (err) {
    console.error("Erro ao verificar 2FA:", err);
    redirect("/login/index");
  }
}
