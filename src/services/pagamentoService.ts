import api from "./api"

export interface PagamentosParams{
  id?: number;
    comandaId:string
    valor:string
    formaPagamento:string
    status:string
    }
    interface paymentClient{
         valor:string
    formaPagamento:string
    status:string
    }
export const pagamentoService={
    pagamento:async(token:string|null,params:PagamentosParams)=>{
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
        try {
   
          const res=await api.post('/api/pagamentos',params,{
            headers
          })
          return res.data
        } catch (err:any) {
          return {
            error: err.response?.data?.message || err.message || "Erro desconhecido",
            status: err.response?.status || 500
          }; 
        }
      },
      
          paymentClient:async(token:string,params:paymentClient)=>{
      try {       
            const API_URL = process.env.NEXT_PUBLIC_BASEURL;
const res=await fetch(`${API_URL}/api/pagamento`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  cache: "no-store",
  credentials: "include",
  body: JSON.stringify({
  params
  })
})
 return await res.json()  
        } catch (err:any) {
          return {
            error: err.response?.data?.message || err.message || "Erro desconhecido",
            status: err.response?.status || 500
          }; 
        }
      },
      pagamentos:async(token:string|null,page=1,perPage=10)=>{
        try {
           const headers = token ? { Authorization: `Bearer ${token}` } : {};
          const res=await api.get('/api/pagamentos',{
            params:{page,perPage},
            headers
          })
       
          return res.data
        } catch (error) {
          return []
        }
        },
        
        total:async(token:string|null)=>{
            try {
             const headers = token ? { Authorization: `Bearer ${token}` } : {};
              const res=await api.get('/api/pagamentos/total',{
                headers
              })
         
              return res.data
            } catch (error) {
           

              if (error instanceof Error) {
                console.error("Erro:", {
                  message: error.message,
                  stack: error.stack
                });
              } else {
                console.error("Erro desconhecido :", error);
              }
          
              return { status: 500, message: "Erro interno no servidor." };
            }
          }
          
}