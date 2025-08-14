import api from "./api";

interface PedidosProdutosParams{
    produtoId:string;
    pedidoId:string;
    quantidade:number
  }

export const pedidosProdutosService={
    createPedidosProdutos:async(token:string|null,params:PedidosProdutosParams)=>{
        try {
     const headers = token ? { Authorization: `Bearer ${token}` } : {};
          const res=await api.post('/api/pedidosProdutos',params,{
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
}