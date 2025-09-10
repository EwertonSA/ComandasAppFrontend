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

  getByCategories: async (token: string, categoria: string): Promise<ProductType[]> => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_BASEURL;
      if (!API_URL) throw new Error("NEXT_PUBLIC_BASEURL não definido");

      const res = await fetch(`${API_URL}/api/produtos/categoria/${categoria}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Erro fetch produtos:", text);
        throw new Error("Erro ao buscar produtos");
      }

      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Erro fetch produtos:", error);
      return [];
    }
  }
,getProductById:async(token:string | null,id:string)=>{
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