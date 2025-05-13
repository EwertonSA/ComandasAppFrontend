import pedidoService from "@/src/services/pedidoService"
import useSWR from "swr"


const Orders=()=>{
    const {data,error}=useSWR('/pedidos',pedidoService.getPedidos)
    
  console.log("DATA:", data);
  console.log("ERROR:", error);

    if(!data) return <p>Loading...</p>
    if(error)return <p>Erro</p>
return(
    <>
    {Array.isArray(data)&&
    data.map((pedido:any)=>(
        <div key={pedido.id}>
           <ul>
            <li>{pedido.id}</li>
            <li>{pedido.comandaId}</li>
            <li>{pedido.total}</li>
            <li>{pedido.status}</li>
           </ul>
        </div>
    ))}
    </>
)
}
export default Orders