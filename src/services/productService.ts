import api from "./api";
export type PedidosType = {
  id: number;
  comandaId: number;
  total: number;
  status: string;
};

export type ProductType = {
  id: string;
  nome: string;
  descricao: string;
  preco: number | string; 
  categoria: string;
  pedidos?: PedidosType[];
};

export type ProductSearchResponse = {
  produtos: ProductType[];
  page: number;
  perPAge: number;
  total: number;
};

const produtService={
    getproducts: async () => {
        try {
          const res = await api.get('/produtos');
          console.log("📦 Produtos recebidos no getStaticProps:", res.data);
          return { data: res.data.produtos || [] };
        } catch (err: any) {
         
          return { data: [] }; 
        }
      },
      getProduct:async()=>{
        try {
          const res=await api.get("/produtos");
          console.log(res.data)
          return{data:res.data.produtos|| [] };
        } catch (error) {
          console.error("Erro ao buscar produto",error)
        }
    
    },
      findByName: async (
        nome: string,
        page: number = 1,
        perPAge: number = 10
      ): Promise<ProductSearchResponse> => {
        try {
          const res = await api.get(`/pedidos/search`, {
            params: { nome, page, perPAge },
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
}
export default produtService