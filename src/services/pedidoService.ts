import api from "./api";
import { pedidosProdutosService } from "./pedidosProdutosService";

export interface PedidoParams{
  id?:string
comandaId:string;
total:0


status:string
}

const pedidoService={
  pedidos:async(token:string|null)=>{
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

try {
  const res=await api.get('/api/pedidos',{
    headers
  })
  console.log("Resposata no service:",res.data.pedidos)
  return res.data?.pedidos || [];

} catch (error) {
   return []
}
  },
 getPedidos: async (token?: string | null, page = 1, perPage = 10) => {
    try {
      const res = await api.get("/api/pedidoCompleto", {
        params: { page, perPage },
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return res.data;
    } catch (error: any) {
      console.error("Erro em getPedidos:", error.response?.data || error);
      throw error;
    }
  },
  getOrdersById: async (token:string|null,id: number | string) => {
 const headers = token ? { Authorization: `Bearer ${token}` } : {};
try {
  const response = await api.get(`/api/pedidos/${id}`,{
    headers
  });
   
    return response.data;
  
} catch (error) {
  return []
}
    },
  
    
    create:async(token:string|null,params:PedidoParams)=>{
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
      try {
          const res=await api.post('/api/pedidos',params,{
            headers
          })
          return res.data
      } catch (error) {
          if(error instanceof Error){
              return{status:500,error:error.message}
          }
          
      }
    },
    createforClient:async(token:string|null,params:{total:number,status:string})=>{
try {
     const API_URL = process.env.NEXT_PUBLIC_BASEURL;
     const res=await fetch(`${API_URL}/api/pedidosCliente`,{
        method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  cache: "no-store",
  credentials: "include", 
   body: JSON.stringify( params )
  
     })
      return await res.json();
} catch (error) {
   console.error("Erro fetch clientComanda:", error);
    return null;
}
    },

        
updateStatus: async (token:string|null,id: string, status: string) => {
 const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const res = await api.put(`/api/pedidos/${id}`, { status },{
    headers

  });
  
  return res.data;
},
registerAllForClient:async({token,
  total,
  quantidade,
  comandaId,
  produtoId
}: {
  token: string | null;
  total?: any;
  quantidade: number;
  comandaId: string;
  produtoId: string;})=>{
try {
  const status = "andamento";
    const pedidoRes = await pedidoService.createforClient(token, { total, status });
   if (!pedidoRes || 'error' in pedidoRes || !pedidoRes.id) {
      return { status: 400, message: "Erro ao registrar o pedido." };
    }

    const pedidoId = pedidoRes.id;
    const pedidosProdutos = await pedidosProdutosService.createPedidosProdutos(token,{
      pedidoId,
      produtoId,
      quantidade
    });
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
},

registerAll: async ({
  token,
  total,
  quantidade,
  comandaId,
  produtoId
}: {
  token: string | null;
  total?: any;
  quantidade: number;
  comandaId: string;
  produtoId: string;
}) => {
  try {
    const status = "andamento";
    const pedidoRes = await pedidoService.create(token, { comandaId, total, status });

    if (!pedidoRes || 'error' in pedidoRes || !pedidoRes.id) {
      return { status: 400, message: "Erro ao registrar o pedido." };
    }

    const pedidoId = pedidoRes.id;
    const pedidosProdutos = await pedidosProdutosService.createPedidosProdutos(token,{
      pedidoId,
      produtoId,
      quantidade
    });

    if (!pedidosProdutos || 'error' in pedidosProdutos || !pedidosProdutos.id) {
      return { status: 400, message: "Erro ao vincular produto ao pedido." };
    }

    return {pedidosProdutos, status: 200, message: "Pedido com produto cadastrado com sucesso." };
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
delete:async(token:string|null,id:string,status:string)=>{
 const headers = token ? { Authorization: `Bearer ${token}` } : {};
  try {
    const res=await api.delete(`/api/pedidos/${id}`,{
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
export default pedidoService