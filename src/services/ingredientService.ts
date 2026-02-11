import api from "./api"

export const IngredientService={
   saveOrderWithIngredientes:async(token:string|null,params:{pedidoProdutoId:string,ingredientes: { ingredientId: string; include: boolean }[] })=>{
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
    try {
        const response=await api.post('/api/pedidosProdutosIngredients',params,{headers})
       console.log(JSON.stringify(response.data, null, 2))
        return {response,status:(200),message:"Registrado com sucesso"}
    } catch (err:any) {
          return {
            error: err.response?.data?.message || err.message || "Erro desconhecido",
            status: err.response?.status || 500
          }; 
    }
   }
}