import api from "./api";

export interface RegisterParams {
  nome: string;
  telefone: string;
  mesaId: string;
}

interface ComandasParams {
  mesaId: string;
  clienteId: string;

}

interface MesasParams {
  numero: number;
  capacidade: number;
}
export interface PagamentosParams{
comandaId:string
valor:string
formaPagamento:string
status:string
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
      console.log("Resposta da API:", res);
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
  
      const clientesFiltrados = clientesComComandas.filter((cliente) => {
        return !cliente.comandas || cliente.comandas.status.toLowerCase() !== "pago";
      });
  
      return clientesFiltrados;
  
    } catch (err: any) {
      console.error("Erro ao buscar info dos clientes:", err);
      return [];
    }
  },
  
  
  
  getComanda:async()=>{
    try {
    const res=await api.get('/comandas')
    return res.data.comandas  
    } catch (error:any) {
      return []
    }
  },
  getPedidosComanda:async(comandaId:string)=>{
try {
  const res=await api.get(`/comandas/${comandaId}`)
 
  return res.data
} catch (error:any) {
  console.error("Erro ao buscar dados da comanda:", error);
  return null; 
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

  registerComanda: async (params: ComandasParams) => {
    try {
      const res = await api.post("/comandas", params);
      return res.data;
    } catch (err: any) {
      return{
        error: err.response?.data?.message || err.message || "Erro desconhecido",
        status: err.response?.status || 500
      }; 
    }
  },

  registerMesa: async (params: MesasParams) => {
    try {
      const res = await api.post("/mesas", params);
      return res.data;
    } catch (err: any) {
      return {
        error: err.response?.data?.message || err.message || "Erro desconhecido",
        status: err.response?.status || 500
      };
    }
  },
  getMesas: async () => {
    try {
      const response = await api.get("/mesas"); // use a URL correta
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar mesas:", error);
      return { error: true };
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
  
      const comandaRes = await clienteService.registerComanda({ clienteId, mesaId });
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
  pagamento:async(params:PagamentosParams)=>{
    try {
      console.log("Dados enviados ao back:", params);
      const res=await api.post('/pagamentos',params)
      return res.data
    } catch (err:any) {
      return {
        error: err.response?.data?.message || err.message || "Erro desconhecido",
        status: err.response?.status || 500
      }; 
    }
  }
  
};

export default clienteService;
