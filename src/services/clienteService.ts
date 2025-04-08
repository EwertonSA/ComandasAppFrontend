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
          return {
            ...cliente,
            comandas: detalhesRes.data.comandas || null
          };
        })
      );
  
      return clientesComComandas;
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
      return {
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

registrarTudo:async ({
    numero,
    capacidade,
    nome,
    telefone,
  }: {
    numero: number;
    capacidade: number;
    nome: string;
    telefone: string;
  }) => {
    try {
      const mesaRes = await clienteService.registerMesa({ numero, capacidade });
      if ("error" in mesaRes || !mesaRes.id) {
        return { status: 400, message: "Erro ao registrar mesa." };
      }
  
      const mesaId = mesaRes.id.toString();
  
      const clienteRes = await clienteService.register({ nome, telefone, mesaId });
      if ("error" in clienteRes || !clienteRes.id) {
        return { status: 400, message: "Erro ao registrar cliente." };
      }
  
      const clienteId = clienteRes.id.toString();
  
      const comandaRes = await clienteService.registerComanda({ clienteId, mesaId });
      if ("error" in comandaRes || !comandaRes.id) {
        return { status: 400, message: "Erro ao criar comanda." };
      }
      const comandaId=comandaRes.id.toString()
  
      return { status: 200, message: "Tudo registrado com sucesso!",comandaId };
    } catch (error) {
      console.error("Erro no registrarTudo:", error);
      return { status: 500, message: "Erro interno no servidor." };
    }
  }
  
};

export default clienteService;
