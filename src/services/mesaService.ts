import api from "./api";

interface MesasParams {
    numero: number;
    capacidade: number;
  }
export const mesaService={
    registerMesa: async (params: MesasParams) => {
        try {
          const res = await api.post("/mesas", params);
          return res.data;
        } catch (err: any) {
          return {
            error: err.response?.data?.message || err.message || "Erro desconhecido",
            status: err.response?.status || 500
          };
        }
      },
      getMesas: async () => {
        try {
          const response = await api.get("/mesas"); // use a URL correta
          return response.data;
        } catch (error) {
          console.error("Erro ao buscar mesas:", error);
          return { error: true };
        }
      },
    
}