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
getClientOrders: async (token: string) => {
  try {
    const res = await api.get("/api/comandasCliente", {
      headers: {
        Authorization: `Bearer ${token}`, // se você ainda quiser enviar o token
      },
      withCredentials: true, // <- isso garante que cookies sejam enviados
    });

    console.log("data:", res.data);
    return res.data;
  } catch (error: any) {
    console.error("Erro ao buscar dados da comanda:", error.response?.data || error.message);
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
      registerClientComanda:async(token:string |null)=>{

 try {
  const res=await api.post('/api/clientComanda',{},{ withCredentials: true })
  return res.data;
 } catch (error) {
    console.error("Erro ao buscar dados da comanda:", error);
      return null; 
 }
      },

    registerAllForClient: async (
  token: string | null,
  { mesaId, nome }: { mesaId: string; nome: string }
) => {
  try {
    // registra cliente (já vincula cliente à mesa)
    const clienteRes = await clienteService.register(token, { nome, mesaId });
    if ("error" in clienteRes || !clienteRes.id) {
      return { status: 400, message: "Erro ao registrar cliente." };
    }

    // registra comanda → backend já atualiza o cookie com o novo token (com comandaId)
    const comandaRes = await comandaService.registerClientComanda(token);
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
          const clienteRes = await clienteService.register(token,{ nome,mesaId });
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