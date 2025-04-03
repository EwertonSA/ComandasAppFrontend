import api from "./api";

interface RegisterParams{
nome:string;
telefone:string;
mesaId:string;

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
    }
}
export default clienteService