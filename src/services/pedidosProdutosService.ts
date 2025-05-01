import api from "./api";

interface PedidosProdutosParams{
    produtoId:string;
    pedidoId:string;
    quantidade:number
  }

export const pedidosProdutosService={
    createPedidosProdutos:async(params:PedidosProdutosParams)=>{
        try {
          const token=sessionStorage.getItem("comandas-token")
          const res=await api.post('/pedidosProdutos',params,{
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
}