import api from "./api";

interface MesasParams {
    numero: number;
    capacidade: number;
  }
export const mesaService={
    registerMesa: async (params: MesasParams) => {
      const token=sessionStorage.getItem('comandas-token')
        try {
          const res = await api.post("/mesas", params,{
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
      getMesas: async (page=1,perPage=10) => {
        try {
          const token=sessionStorage.getItem('comandas-token')
          const response = await api.get("/mesas",{
             params:{page,perPage},
            headers: {
              Authorization: `Bearer ${token}`
          },
          }); // use a URL correta
          return response.data;
        } catch (error) {
          console.error("Erro ao buscar mesas:", error);
          return { error: true };
        }
      },
    
}