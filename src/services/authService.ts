import axios from "axios"
import api from "./api"

interface RegisterLogin{
name:string
phone:string 
email:string
password:string
role:'user'

}
interface ClienteLogin{
  name:string
  phone:string 
  email:string
  role:'cliente'
  
  }
interface LoginParams{
  email:string
  password:string,
  recaptchaToken: string;
  role: "admin" | "user" | "cliente"
}
interface LoginParamsTest{
  email:string
  password:string,

  role: "admin" | "user" | "cliente"
}
interface clienteParams{
  nome:string
  email:string
  mesaId:string
}
interface stateParams{
  comandaId:string,state:string
}

interface VerifyStateResponse {
  valid: boolean;
}


const authService={
    register: async (params: RegisterLogin) => {
        try {
          const res = await api.post('/api/auth/register', params);
          return {
            status: res.status,
            data: res.data
          };
        } catch (err: any) {
          console.error("Erro capturado no authService:", err);
          return {
            error: err.response?.data?.message || err.message || "Erro desconhecido",
            status: err.response?.status || 500
          };
        }
      },
login: async (params: LoginParamsTest) => {
  try {
    const res = await api.post("/api/auth/login", params);
    console.log("✅ Resposta do login:", res.status, res.data);
    console.log("Role::",params.role)
    return { status: res.status, data: res.data };
  } catch (error: any) {
    console.log("🔎 Função login chamada com:", params);

    if (error.response) {
      console.log("❌ Erro no login:", error.response.status, error.response.data);
      return { status: error.response.status, data: error.response.data };
    }

    // Retorno garantido mesmo sem error.response
    return { status: 500, data: { message: "Erro inesperado no login" } };
  }
}
,
reset2fa:async({userId}:{userId:string})=>{
try {
  const res=await api.post('/api/auth/reset2fa',{userId})
  return res
} catch (error) {
  console.error(error)
}
},
autoLogin: async (params:clienteParams) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/autoLogin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // 🔑 envia/recebe cookies
    body: JSON.stringify(params),
  });

  if (!res.ok) throw new Error("Falha no login");
  return await res.json(); // retorna { authenticated, clienteId, email, role, mesaId }
}


 ,
loginAndRegister : async (email: string, nome: string, mesaId: string) => {
  // 1️⃣ login / criação do cliente
  const loginRes = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/auth/autoLogin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, nome, mesaId }),
    credentials: "include", // 🔑 importante para enviar e receber cookies
  });

  if (!loginRes.ok) {
    throw new Error('Não foi possível logar');
  }

  // 2️⃣ registra comanda
  const comandaRes = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/clientComanda`, {
    method: "POST",
    credentials: "include", // 🔑 cookie enviado automaticamente
  });

  if (!comandaRes.ok) {
    throw new Error('Não foi possível criar comanda');
  }

  const comandaData = await comandaRes.json();
  return comandaData.id;
},
verify2fa : async ({
  userId,
  token,
  cookieHeader // <- aqui você passa os cookies que vieram do navegador
}: {
  userId: number;
  token: string | null;
  cookieHeader?: string;
}) => {
  try {
    const headers: any = token ? { Authorization: `Bearer ${token}` } : {};
    
    if (cookieHeader) {
      headers.Cookie = cookieHeader; // envia cookie do navegador
    }

    const res = await axios.post(
      'https://esadev.com.br/api/auth/verify',
      { userId, token },
      { headers, withCredentials: true }
    );

    console.log("Verificando 2FA para userId:", userId, "com token:", token);
    return res;
  } catch (error) {
    console.error(error);
  }
},
 setup2faService:async(userId: string) =>{
  try {
    const res = await api.get(`/api/auth/verify-2fa/setup?userId=${userId}`);
    return res.data; // { qrCodeDataURL, secret? }
  } catch (err) {
    console.error(err);
    return { qrCodeDataURL: null };
  }
},
verifyStateClient:async({comandaId,state}: stateParams): Promise<boolean>=>{
  try {
    const res=await api.get<VerifyStateResponse>(`/api/auth/verifystate/${comandaId}`,{
      params:{state}
    })
    return res.data.valid
  } catch (error) {
    console.error("Erro ao verificar state:", error);
    return false;
  }
}

      
    }
export default authService