import api from "./api";

export interface RegisterParams {
  nome: string;
  mesaId: string;
 
}

const clienteService = {
  getClientes:async(page=1,perPage=10)=>{
    try {
      const token=sessionStorage.getItem("comandas-token")
      const res=await api.get('/clientes',{
        params:{page,perPage},
        headers: {
          Authorization: `Bearer ${token}`
      },
      })
   
      return res.data.clientes
    }  catch (err: any) {
      return []
    }
  },
getClientesInfo: async (page = 1, perPage = 10, status?: string) => {
  
  try {
    const token = sessionStorage.getItem("comandas-token")?.trim() ?? sessionStorage.getItem('cliente-token');

    if (!token) {
      throw new Error("Usuário não autenticado: token ausente");
    }

    console.log('Fazendo requisição para /clientes');

    const res = await api.get('/clienteCompleto', {
      params: { page, perPage, status },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Resposta recebida:', res.data);

    return {
      clientes: res.data.clientes || [],
      total: res.data.total || 0,
      totalPages: Math.ceil(res.data.total / perPage),
    };
  } catch (err: any) {
    console.error("Erro ao buscar info dos clientes:", err);
    return {
      clientes: [],
      total: 0,
      totalPages: 1,
    };
  }
},



  register: async (params: RegisterParams) => {
    const token=sessionStorage.getItem("comandas-token")??sessionStorage.getItem('cliente-token')
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
