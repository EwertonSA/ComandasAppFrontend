import api from "./api";
import { pedidosProdutosService } from "./pedidosProdutosService";

export interface PedidoParams{
  id?:string
comandaId:string;
total:0


status:string
}

const pedidoService={
  getPedidos:async()=>{
    const token=sessionStorage.getItem("comandas-token")
    try {
      const res=await api.get('/pedidos',{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      const pedidos=res.data.pedidos
      const allOrders=await Promise.all(
        pedidos.map(async(pedido:any)=>{
          const pedidoRes= await api.get(`pedidos/${pedido.id}`,{
             headers:{
          Authorization:`Bearer ${token}`
        }
          })  
          return pedidoRes.data
        })
      )
      return allOrders
      
    } catch (error) {
      return []
    }

  },
  getOrdersById: async (id: number | string) => {
    const token=sessionStorage.getItem("comandas-token")??sessionStorage.getItem('cliente-token')
try {
  const response = await api.get(`/pedidos/${id}`,{
    headers: {
      Authorization: `Bearer ${token}`
  },
  });
   
    return response.data;
  
} catch (error) {
  return []
}
    },
  
  
  create:async(params:PedidoParams)=>{
    const token=sessionStorage.getItem("comandas-token")??sessionStorage.getItem('cliente-token')
    try {
        const res=await api.post('/pedidos',params,{
          headers: {
            Authorization: `Bearer ${token}`
        },
        })
        return res.data
    } catch (error) {
        if(error instanceof Error){
            return{status:500,error:error.message}
        }
        
    }
  },

      
updateStatus: async (id: string, status: string) => {
  const token=sessionStorage.getItem("comandas-token")
  const res = await api.put(`/pedidos/${id}`, { status },{
    headers: {
      Authorization: `Bearer ${token}`
  },
  });
  return res.data;
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
    const pedidosProdutos = await pedidosProdutosService.createPedidosProdutos({
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
,
delete:async(id:number,status:string)=>{
  const token=sessionStorage.getItem("comandas-token")??sessionStorage.getItem('cliente-token')
  try {
    const res=await api.delete(`/pedidos/${id}`,{
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
export default pedidoService