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
  userInfo:async(id:string,token:string|null,)=>{
     try {
     
     const headers = token ? { Authorization: `Bearer ${token}` } : {};
     const res=await api.get('/api/users',{
      headers
     })
   return res.data
    } catch (error) {
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



  register: async (params: RegisterParams) => {

    try {
     
      const res = await api.post('/api/clientes', params);
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
