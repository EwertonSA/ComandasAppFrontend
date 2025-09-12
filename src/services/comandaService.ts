import api from "./api"
import clienteService from "./clienteService";
interface ComandasParams {
    mesaId: string;
    clienteId: string;
  
  }
export const comandaService={
      
  getComanda:async(token:string|null)=>{ 
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    try {
     
    const res=await api.get('/api/comandas',{
      headers
    })
    return res.data.comandas  
    } catch (error:any) {
      return []
    }
  },

  getPedidosComanda:async(token:string|null,comandaId:string)=>{

  
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

    try {
      const res=await api.get(`/api/comandas/${comandaId}`,{
        headers
      })
     
      return res.data
    } catch (error:any) {
      console.error("Erro ao buscar dados da comanda:", error);
      return null; 
    }
      },
getClientOrders: async (token: string | null) => {
  if (!token) return null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/comanda`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Erro ao buscar dados da comanda:", await res.text());
      return null;
    }

    return await res.json();
  } catch (error: any) {
    console.error("Erro ao buscar dados da comanda:", error);
    return null;
  }
},
 

      registerComanda: async (token:string |null ,params: ComandasParams) => {
         const headers = token ? { Authorization: `Bearer ${token}` } : {};
        try {
          const res = await api.post("/api/comandas", params,{
            headers
          });
          return res.data;
        } catch (err: any) {
          return{
            error: err.response?.data?.message || err.message || "Erro desconhecido",
            status: err.response?.status || 500
          }; 
        }
      },
  registerClientComanda :async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/registerClientComanda`, {
    method: "POST",
    credentials: "include", // 🔑 cookie será enviado
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Erro ao criar comanda");
  }

  return await res.json(); // retorna { id: comandaId }
},

 registerAllForClient: async ({ nome, mesaId }: { nome: string; mesaId: string }) => {
  try {
    // 1. registra cliente
    const clienteRes = await clienteService.registerClient({ nome, mesaId });
    if ("error" in clienteRes || !clienteRes.id) {
      return { status: 400, message: "Erro ao registrar cliente." };
    }

    // 2. registra comanda → backend devolve cookie atualizado
    const comandaRes = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/clientComanda`, {
      method: "POST",
      credentials: "include", // 🔑 garante envio/recebimento de cookies
    }).then(r => r.json());

    if (!comandaRes || "error" in comandaRes || !comandaRes.id) {
      return { status: 400, message: "Erro ao criar comanda." };
    }

    return {
      status: 200,
      message: "Tudo registrado com sucesso!",
      comandaId: comandaRes.id,
    };
  } catch (error) {
    console.error("Erro no registrarTudo:", error);
    return { status: 500, message: "Erro interno no servidor." };
  }
},


      registrarTudo: async (
          token: string | null,{
        mesaId,
        nome,
     
      }: {
        mesaId: string;
        nome: string;
       
      }) => {
        try {
          const clienteRes = await clienteService.register({ nome,mesaId });
          if ("error" in clienteRes || !clienteRes.id) {
            return { status: 400, message: "Erro ao registrar cliente." };
          }
      
          const clienteId = clienteRes.id.toString();
      
          const comandaRes = await comandaService.registerComanda(token,{ clienteId, mesaId });
          if ("error" in comandaRes || !comandaRes.id) {
            return { status: 400, message: "Erro ao criar comanda." };
          }
      
          const comandaId = comandaRes.id.toString();
      
          return { status: 200, message: "Tudo registrado com sucesso!", comandaId };
        } catch (error) {
          console.error("Erro no registrarTudo:", error);
          return { status: 500, message: "Erro interno no servidor." };
        }
      }
      ,
}