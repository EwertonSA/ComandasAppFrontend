import api from "./api";
export type PedidosType = {
  id: number;
  comandaId: number;
  total: number;
  status: string;
};
export interface ProdutoProps{
produto:{  id: string;
  nome: string;
  descricao: string;
  preco: number | string; 
  categoria: string;
  thumbnailUrl:string
}
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

export type ProductSearchResponse = {
  produtos: ProductType[];
  page: number;
  perPAge: number;
  total: number;
};

const produtService={
   
      getProduct:async()=>{
      
        try {
         const token=sessionStorage.getItem("comandas-token")
          const res=await api.get("/produtos",{
            headers:{
              Authorization:`Bearer ${token}`
            }
          });
          console.log(res.data)
          return{data:res.data.produtos|| [] };
        } catch (error) {
          console.error("Erro ao buscar produto",error)
          return {data:[]}
        }
    
    },
      findByName: async (
        nome: string,
        page: number = 1,
        perPAge: number = 10
      ): Promise<ProductSearchResponse> => {
        const token=sessionStorage.getItem("comandas-token")
        try {
          const res = await api.get(`/pedidos/search`, {
           
                headers: {
                  Authorization: `Bearer ${token}`,
              
              } ,params: { nome, page, perPAge }
          });
          console.log("🔍 Produtos filtrados:", res.data);
          
          return res.data;
        } catch (error) {
          console.error("Erro ao buscar produtos por nome:", error);
          return {
            produtos: [],
            page,
            perPAge,
            total: 0,
          };
        }
      },
      getByCategories: async (categoria: string) => {
        const token = sessionStorage.getItem("comandas-token");
      
        if (!token) {
          console.error("❌ Token inválido");
          return []; // <- Adiciona retorno para evitar seguir sem token
        }
      
        try {
          const res = await api.get(`/produtos/${categoria}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
          // Verifica se a resposta realmente é um array
          if (Array.isArray(res.data)) {
            return res.data;
          }
      
          // Se for um objeto com a chave da categoria, retorna o array correspondente
          if (res.data && res.data[categoria]) {
            return res.data[categoria];
          }
      
          console.warn("⚠️ Resposta inesperada da API:", res.data);
          return [];
      
        } catch (error: any) {
          console.error("Erro ao buscar produto:", error?.response?.data || error.message);
          return [];
        }
      }
      
      
}
export default produtService