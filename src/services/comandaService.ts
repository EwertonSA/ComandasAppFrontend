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

getPedidosComanda: async (token: string | null, comandaId: string) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  try {
    const res = await api.get(`/api/comandas/${comandaId}`, { headers });

    // se o backend retornar 404, res.data pode estar vazio
    if (!res.data) {
      console.warn(`Comanda ${comandaId} não encontrada para o cliente logado.`);
      return null;
    }

    return res.data; // contém a comanda e pedidos do cliente
  } catch (error: any) {
    if (error.response?.status === 401) {
      console.error("Cliente não autorizado");
    } else if (error.response?.status === 404) {
      console.error("Comanda não encontrada");
    } else {
      console.error("Erro ao buscar dados da comanda:", error);
    }
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