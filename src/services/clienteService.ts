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



  register: async (token:string|null,params: RegisterParams) => {

    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await api.post('/api/clientes', params,{headers});
      console.log('respostado Front',res)
      return res.data;
    } catch (err: any) {
      return {
        error: err.response?.data?.message || err.message || "Erro desconhecido",
        status: err.response?.status || 500
      };
    }
  },
 registerClient: async (params:RegisterParams) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/cliente`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // 🔑 mantém o cookie
      body: JSON.stringify(params), // envia dados
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Erro ao registrar cliente");
    }

    const data = await res.json();
    console.log("Cliente registrado:", data);
    return data;
  } catch (error) {
    console.error("Erro no registerClient:", error);
    throw error;
  }
}


 

 
 

  
};

export default clienteService;
