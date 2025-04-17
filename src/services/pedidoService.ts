import api from "./api";

interface PedidoParams{
comandaId:string;
total:0


status:string
}
interface PedidosProdutosParams{
  produtoId:string;
  pedidoId:string;
  quantidade:number
}
const pedidoService={
  getPedidos:async()=>{
    try {
      const res=await api.get('/pedidos')
      return res.data     
    } catch (error) {
      return []
    }

  },
  getOrdersById: async (id: number | string) => {
try {
  const response = await api.get(`/pedidos/${id}`);
   
    return response.data;
  
} catch (error) {
  return []
}
    },
  
  
  create:async(params:PedidoParams)=>{
    try {
        const res=await api.post('/pedidos',params)
        return res.data
    } catch (error) {
        if(error instanceof Error){
            return{status:500,error:error.message}
        }
        
    }
  },
  createPedidosProdutos:async(params:PedidosProdutosParams)=>{
try {
  const res=await api.post('/pedidosProdutos',params)
  return res.data
} catch (err:any) {
  return {
    error: err.response?.data?.message || err.message || "Erro desconhecido",
    status: err.response?.status || 500
  };
}
  },
        getProduct:async()=>{
    try {
      const res=await api.get("/produtos");
      console.log(res.data)
      return{data:res.data.produtos|| [] };
    } catch (error) {
      console.error("Erro ao buscar produto",error)
    }

},
updateStatus: async (id: string, status: string) => {
  const res = await api.put(`/pedidos/${id}`, { status });
  return res.data;
},

pagamentos:async()=>{
try {
  const res=await api.get('/pagamentos')
  return res.data
} catch (error) {
  return []
}
},
registerAll: async ({
  total,
  quantidade,
  comandaId,
  produtoId
}: {
  total:any
  quantidade: number;
  comandaId: string;
  produtoId: string;
}) => {
  try {
    const status = "andamento"; // fixa o status aqui
    const pedidoRes = await pedidoService.create({ comandaId,total, status });

    if (!pedidoRes || 'error' in pedidoRes || !pedidoRes.id) {
      return { status: 400, message: "Erro ao registrar o pedido." };
    }

    const pedidoId = pedidoRes.id;
    const pedidosProdutos = await pedidoService.createPedidosProdutos({
      pedidoId,
      produtoId,
      quantidade
    });

    if (!pedidosProdutos || 'error' in pedidosProdutos || !pedidosProdutos.id) {
      return { status: 400, message: "Erro ao vincular produto ao pedido." };
    }

    return { status: 200, message: "Pedido com produto cadastrado com sucesso." };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Erro no registerAll:", {
        message: error.message,
        stack: error.stack
      });
    } else {
      console.error("Erro desconhecido no registerAll:", error);
    }

    return { status: 500, message: "Erro interno no servidor." };
  }
}



} 
export default pedidoService