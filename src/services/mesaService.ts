import api from "./api";

interface MesasParams {
    numero: number;
    capacidade: number;
  }
export const mesaService={
    registerMesa: async (token:string|null,params: MesasParams) => {
     const headers = token ? { Authorization: `Bearer ${token}` } : {};
        try {
          const res = await api.post("/api/mesas", params,{
            headers
          });
          return res.data;
        } catch (err: any) {
          return {
            error: err.response?.data?.message || err.message || "Erro desconhecido",
            status: err.response?.status || 500
          };
        }
      },
      getMesas: async (token:string|null,page=1,perPage=10) => {
        try {
          const headers = token ? { Authorization: `Bearer ${token}` } : {};
          const response = await api.get("api.esadev.com.br/api/mesas",{
             params:{page,perPage},
            headers
          }); 
          console.log("Resposta do servidor:", response.data);
          console.log("BASEURL:", api.defaults.baseURL)
          return {
                 mesas: response.data.mesas || [],
      total: response.data.total || 0,
      totalPages: Math.ceil(response.data.total / perPage),
          };
        } catch (error) {
          console.error("Erro ao buscar mesas:", error);
          return { error: true };
        }
      },
    
}