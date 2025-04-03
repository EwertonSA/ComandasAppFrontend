import api from "./api";

interface RegisterParams{
nome:string;
telefone:string;
mesaId:string;

}
interface ComandasParams{
mesaId:string;
clienteId:string
}
const clienteService={
    register:async(params:RegisterParams)=>{
        const res=await api.post('/clientes',params).catch((err)=>{
            if(err.response.status===400)  {
                
                return err.response
            }
              return err
        })
        return res;
    },
    registerComanda:async(params:ComandasParams)=>{
        const res=await api.post('/comandas',params).catch((err)=>{
            if(err.response.status === 400 || err.response.status === 401){
                return err.response}
                return err;
        })
        if(res.status===200){
            return res
        }
    }

}
export default clienteService