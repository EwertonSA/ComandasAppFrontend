
import { cookies } from "next/headers"
import { comandaService } from "@/src/services/comandaService"
import pedidoService from "@/src/services/pedidoService"
import PedidosList from "@/app/employeeApp/comandas/[id]/pedidoList"
import { cancelOrder } from "./deleteAction"
import ClientOrders from "./clientOrders"
interface Props {
  params: { id: string }
}

const Page=async({params}:Props)=>{
        const cookie=await cookies()
 const id = params.id;
    const token=cookie.get('comandas-token')?.value||''
     const res = await comandaService.getPedidosComanda(token,id);
  const details = await Promise.all(
    (res.pedidos || []).map(async (pedido: any) => {
      const detail = await pedidoService.getOrdersById(token,pedido.id);
      
      return { ...detail, id: pedido.id };
      
    })
  );
return <>

<main>
  
<ClientOrders pedidos={details} onCancelar={cancelOrder} id={id}/>

   
</main>
</>
}
export default Page