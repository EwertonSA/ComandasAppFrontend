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
}
interface clienteParams{
  nome:string
  email:string
  mesaId:string
}
interface verirfy{userId:number,token:string|null}
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
      login:async(params:LoginParams)=>{
        const res=await api.post('/api/auth/login',params).catch((error)=>{
          if(error.response.status === 400 || error.response.status === 401){
            return error.response
          }
          return error;
        })
       
        return res
      },
   autoLogin:async(params:clienteParams)=>{
    try {

      const res=await api.post("/api/auth/autoLogin",params)
      if(res.status ===400 || res.status ===401 ){
    throw new Error('Impossível logar')
       
      } 
     return{ ...res.data, status:res.status} 
    } catch (err:any) {
      console.error("Erro capturado no authService:", err);
      return {
        error: err.response?.data?.message || err.message || "Erro desconhecido",
        status: err.response?.status || 500
      };
    }
    
   },
   verify2fa:async({ userId,token}: { userId: number,token:string|null})=>{
    try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res=await api.post('/api/auth/verify',{
       userId,token
      })
      return res
    } catch (error) {
      console.error(error)
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
}

      
    }
export default authService