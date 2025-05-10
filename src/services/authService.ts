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
  password:string
}
interface clienteParams{
  name:string
  phone:string
  email:string
}
const authService={
    register: async (params: RegisterLogin) => {
        try {
          const res = await api.post('/auth/register', params);
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
        const res=await api.post('/auth/login',params).catch((error)=>{
          if(error.response.status === 400 || error.response.status === 401){
            return error.response
          }
          return error;
        })
        if(res.status === 200){
          sessionStorage.setItem("comandas-token",res.data.token)
        }
        return res
      },
   autoLogin:async(params:LoginParams)=>{
    try {
      const res=await api.post("auth/autoLogin",params)
      if(res.status ===200 || res.status ===201 ){
        sessionStorage.setItem("cliente-token",res.data.token)
        return{ ...res.data, status:res.status} 
      } 
    
    } catch (err:any) {
      console.error("Erro capturado no authService:", err);
      return {
        error: err.response?.data?.message || err.message || "Erro desconhecido",
        status: err.response?.status || 500
      };
    }
    
   }
      
    }
export default authService