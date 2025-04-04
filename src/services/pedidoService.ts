import api from "./api";

interface PedidoParams{
comandaId:string;
total:string;
status:string
}
const pedidoService={
  getOrder:async(params:PedidoParams)=>{
    try {
        const res=await api.get('/pedidos',{params})
        return{status:res.status,data:res.data.response}
    } catch (error) {
        if(error instanceof Error){
            return{status:500,error:error.message}
        }
        
    }
  }
} 
export default pedidoService