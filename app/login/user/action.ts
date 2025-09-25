"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import authService from "@/src/services/authService";

export async function LoginAction(formData: FormData) {
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";
const recaptchaToken = formData.get("recaptchaToken")?.toString() || "";
    const role = formData.get("role")?.toString() as "admin" | "user" | "cliente";
  const res = await authService.login({ email, password,recaptchaToken,role });

  if (res.status === 200) {
    const setcookie=await cookies()
    setcookie.set("comandas-token", res.data.token, { httpOnly: true });
    redirect("/employeeApp");
  }

  // Se falhar, redireciona para a mesma página com mensagem de erro
  redirect("/login/index");
}
