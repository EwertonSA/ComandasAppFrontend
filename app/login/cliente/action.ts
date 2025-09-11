'use server'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const LoginAction = async (formData: FormData) => {
  const nome = formData.get("nome") as string;
  const email = formData.get("email") as string;
  const mesaId = formData.get("mesaId") as string;

  if (!nome || !email || !mesaId) throw new Error("Todos os campos são obrigatórios");

  const BASE = process.env.NEXT_PUBLIC_BASEURL;

  // 1️⃣ AutoLogin
  const loginRes = await fetch(`${BASE}/api/auth/autoLogin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email, mesaId }),
  });
  if (!loginRes.ok) throw new Error("Falha no login");
  let { token } = await loginRes.json();

  // 2️⃣ Registrar cliente
  const registerRes = await fetch(`${BASE}/api/cliente`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` 
    },
    body: JSON.stringify({ nome, mesaId }),
  });
  if (!registerRes.ok) {
    const err = await registerRes.text();
    console.error("Erro register:", err);
    throw new Error("Falha no registro de cliente na mesa");
  }
  const registerData = await registerRes.json();
  token = registerData.token; // token atualizado com clienteId

  // 3️⃣ Criar comanda
  const comandaRes = await fetch(`${BASE}/api/clientComanda`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` 
    },
  });
  if (!comandaRes.ok) {
    const err = await comandaRes.text();
    console.error("Erro comanda:", err);
    throw new Error("Falha na criação da comanda");
  }
  const comandaData = await comandaRes.json();
  token = comandaData.token; // token atualizado com comandaId

  // 4️⃣ Salvar token no cookie via API server-side
  const cookieStore = await cookies();
  cookieStore.set({
    name: 'clientes-token',
    value: token,
    path: '/',
    maxAge: 7 * 24 * 60 * 60, // 7 dias
    httpOnly: true,
  });

  // 5️⃣ Redireciona
  redirect("/homeNoAuth");
};

export default LoginAction;
