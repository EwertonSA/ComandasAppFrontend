import api from "./api";
export type PedidosType = {
  id: number;
  comandaId: number;
  total: number;
  status: string;
};
export interface Produto{  
  id: string;
  nome: string;
  descricao: string;
  preco: number | string; 
  categoria: string;
  thumbnailUrl:string
}

export type ProductType = {
  id: string;
  nome: string;
  descricao: string;
  preco: number | string; 
  categoria: string;
  pedidos?: PedidosType[];
  thumbnailUrl:string
};



const produtService={
   
getProduct: async (
  token: string | null,
  page = 1,
  perPage = 10
) => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await api.get("/api/produtos", {
      params: { page, perPage },
      headers
    });

     return {
      data: res.data.produtos || [],
      total: res.data.total || 0
    };
  } catch (error) {
    console.error("Erro ao buscar produto", error);
    return { data: [], total: 0 };
  }
},


    findByName: async (
  token: string | null,
  nome: string,
  page: number = 1,
  perPage: number = 10)=> {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await api.get(`/api/pedidos/search`, {
      headers,
      params: { nome, page, perPage }
    });
  
    return {
      produtos: res.data.produtos || [],
      total: res.data.total || 0,
       totalPages: Math.ceil(res.data.total / perPage),
    };
  } catch (error) {
    console.error("Erro ao buscar produtos por nome:", error);
    return {
      produtos: [],
      page,
      perPage,
      total: 0,
    };
  }
},

      getByCategories: async (token:string|null,categoria: string) => {
        try {
           const headers = token ? { Authorization: `Bearer ${token}` } : {};
          const res = await api.get(`/api/produtos/categoria/${categoria}`, {
            headers
          });
          if (Array.isArray(res.data)) {
            return res.data;
          }
          if (res.data && res.data[categoria]) {
            return res.data[categoria];
          }
      
          console.warn("⚠️ Resposta inesperada da API:", res.data);
          return [];
      
        } catch (error: any) {
          console.error("Erro ao buscar produto:", error?.response?.data || error.message);
          return [];
        }
      },getProductById:async(token:string | null,id:string)=>{
       const headers = token ? { Authorization: `Bearer ${token}` } : {};
        try {
          const res= await api.get(`/api/produtos/${id}`,{
            headers:{
              Authorization: `Bearer ${token}`
            }
          })
       
          return res.data
        } catch (error:any) {
        
          return []
        }
      }
      
      
}
export default produtService