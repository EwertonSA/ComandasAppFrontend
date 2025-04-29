import api from "./api"

interface RegisterLogin{
name:string
phone:string 
email:string
password:string
role:'user'

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
      }
    }
export default authService