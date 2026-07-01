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

    return { status: res.status, data: res.data };
  } catch (error: any) {
    console.log("🔎 Função login chamada com:", params);

    if (error.response) {
      console.log("❌ Erro no login:", error.response.status, error.response.data);
      return { status: error.response.status, data: error.response.data };
    }


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
    credentials: "include",
    body: JSON.stringify(params),
  });

  if (!res.ok) throw new Error("Falha no login");
  return await res.json(); 
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

}: {
  userId: number;
  token: string | null;
 
}) => {
  try {

    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASEURL}/api/auth/verify`,
      { userId, token },
      { withCredentials: true }
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
    return res.data;
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
},
forgotPassword:async(email:string)=>{
  try {
    const res=await api.post('/api/forgotpassword',{email})
return res.data
  } catch (error) {
    return console.error(error)
  }

},
updatePassword:async(token:string|null,newPassword:string, confirmPassword:string)=>{
     const headers = token ? { Authorization: `Bearer ${token}` } : {};
  try {
    
    const res = await api.put(
  '/api/updatepassword',
   {newPassword, confirmPassword },{headers}
);
console.log("newPassword:",newPassword)
console.log("confirmPassword:",confirmPassword)
    return res.data
  } catch (error) {
    return console.error(error)
  }
  
}

      
    }
export default authService