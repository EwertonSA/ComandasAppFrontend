import api from "./api";

export interface RegisterParams {
  nome: string;
  mesaId: string;
 
}

const clienteService = {
  getClientes:async(token:string|null,page=1,perPage=10)=>{
    try {    
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res=await api.get('/api/clientes',{
        params:{page,perPage},
        headers
      })
   
      return res.data
    }  catch (err: any) {
      return []
    }
  },
getClientesInfo: async ( token: string | null,page = 1, perPage = 10, status?: string) => {
  
  try {
    

    if (!token) {
      throw new Error("Usuário não autenticado: token ausente");
    }



    const res = await api.get('/api/clienteCompleto', {
      params: { page, perPage, status },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  

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



  register: async (token:string |null ,params: RegisterParams) => {

    try {
     const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await api.post('/api/clientes', params,{headers});
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
