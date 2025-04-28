import api from "./api";

export interface RegisterParams {
  nome: string;
  telefone: string;
  mesaId: string;
}

const clienteService = {
  getClientes:async()=>{
    try {
      const res=await api.get('/clientes')
      console.log("res.data do getClientes:", res.data.clientes);
      return res.data.clientes
    }  catch (err: any) {
      return []
    }
  },
  getClientesInfo: async () => {
    try {
      const res = await api.get('/clientes');
      const clientes = res.data.clientes;
      
      const clientesComComandas = await Promise.all(
        clientes.map(async (cliente: any) => {
          const detalhesRes = await api.get(`/clientes/${cliente.id}`);
          const comandaBase = detalhesRes.data.comandas || null;
          let comandaDetalhada = null;
  
          if (comandaBase?.id) {
            const comandaRes = await api.get(`/comandas/${comandaBase.id}`);
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
    try {
      console.log("🔍 Enviando cliente:", params);
      const res = await api.post('/clientes', params);
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
