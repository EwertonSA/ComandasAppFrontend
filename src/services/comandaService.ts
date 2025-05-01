import api from "./api"
import clienteService from "./clienteService";
interface ComandasParams {
    mesaId: string;
    clienteId: string;
  
  }
export const comandaService={
      
  getComanda:async()=>{
    const token=sessionStorage.getItem('comandas-token')
    try {
    const res=await api.get('/comandas',{
      headers: {
        Authorization: `Bearer ${token}`
    },
    })
    return res.data.comandas  
    } catch (error:any) {
      return []
    }
  },
  getPedidosComanda:async(comandaId:string)=>{
    const token=sessionStorage.getItem('comandas-token')
    try {
      const res=await api.get(`/comandas/${comandaId}`,{
        headers: {
          Authorization: `Bearer ${token}`
      },
      })
     
      return res.data
    } catch (error:any) {
      console.error("Erro ao buscar dados da comanda:", error);
      return null; 
    }
      },
      registerComanda: async (params: ComandasParams) => {
        const token=sessionStorage.getItem('comandas-token')
        try {
          const res = await api.post("/comandas", params,{
            headers: {
              Authorization: `Bearer ${token}`
          },
          });
          return res.data;
        } catch (err: any) {
          return{
            error: err.response?.data?.message || err.message || "Erro desconhecido",
            status: err.response?.status || 500
          }; 
        }
      },
      registrarTudo: async ({
        mesaId,
        nome,
        telefone,
      }: {
        mesaId: string;
        nome: string;
        telefone: string;
      }) => {
        try {
          const clienteRes = await clienteService.register({ nome, telefone, mesaId });
          if ("error" in clienteRes || !clienteRes.id) {
            return { status: 400, message: "Erro ao registrar cliente." };
          }
      
          const clienteId = clienteRes.id.toString();
      
          const comandaRes = await comandaService.registerComanda({ clienteId, mesaId });
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