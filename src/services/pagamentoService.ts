import api from "./api"

export interface PagamentosParams{
  id?: number;
    comandaId:string
    valor:string
    formaPagamento:string
    status:string
    }
export const pagamentoService={
    pagamento:async(params:PagamentosParams)=>{
      const token=sessionStorage.getItem("comandas-token")??sessionStorage.getItem('cliente-token')
        try {
          console.log("Dados enviados ao back:", params);
          const res=await api.post('/pagamentos',params,{
            headers: {
              Authorization: `Bearer ${token}`
          },
          })
          return res.data
        } catch (err:any) {
          return {
            error: err.response?.data?.message || err.message || "Erro desconhecido",
            status: err.response?.status || 500
          }; 
        }
      },
      pagamentos:async()=>{
        try {
          const token=sessionStorage.getItem("comandas-token")
          const res=await api.get('/pagamentos',{
            headers: {
              Authorization: `Bearer ${token}`
          },
          })
          return res.data
        } catch (error) {
          return []
        }
        },
        
        total:async()=>{
            try {
              const token=sessionStorage.getItem("comandas-token")
              const res=await api.get('/pagamentos/total',{
                headers: {
                  Authorization: `Bearer ${token}`
              },
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