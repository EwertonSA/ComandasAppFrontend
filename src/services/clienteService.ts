import api from "./api";

export interface RegisterParams {
  nome: string;
  mesaId: string;
}

const clienteService = {
  getClientes:async()=>{
    try {
      const token=sessionStorage.getItem("comandas-token")
      const res=await api.get('/clientes',{
        headers: {
          Authorization: `Bearer ${token}`
      },
      })
   
      return res.data.clientes
    }  catch (err: any) {
      return []
    }
  },
  getClientesInfo: async () => {
    try {
      const token=sessionStorage.getItem("comandas-token")
      const res = await api.get('/clientes',{
        headers: {
          Authorization: `Bearer ${token}`
      },
      });
      const clientes = res.data.clientes;
      
      const clientesComComandas = await Promise.all(
        clientes.map(async (cliente: any) => {
          const detalhesRes = await api.get(`/clientes/${cliente.id}`,{
            headers: {
              Authorization: `Bearer ${token}`
          },
          });
          const comandaBase = detalhesRes.data.comandas || null;
          let comandaDetalhada = null;
  
          if (comandaBase?.id) {
            const comandaRes = await api.get(`/comandas/${comandaBase.id}`,{
              headers: {
                Authorization: `Bearer ${token}`
            },
            });
            comandaDetalhada = {
              ...comandaRes.data,
              pedidos: comandaRes.data.pedidos || [],
            };
          }
  
          return {
            ...cliente,
            comandas: comandaDetalhada,
          };
        })
      );
  
    return clientesComComandas
  
    } catch (err: any) {
      console.error("Erro ao buscar info dos clientes:", err);
      return [];
    }
  },
  register: async (params: RegisterParams) => {
    const token=sessionStorage.getItem("comandas-token")
    try {
    
      const res = await api.post('/clientes', params,{
        headers: {
          Authorization: `Bearer ${token}`
      },
      });
      return res.data;
    } catch (err: any) {
      return {
        error: err.response?.data?.message || err.message || "Erro desconhecido",
        status: err.response?.status || 500
      };
    }
  },

 

 
 

  
};

export default clienteService;
