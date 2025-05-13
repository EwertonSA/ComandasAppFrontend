import Clientes from "@/src/component/pages/clientes/clientes"
import Footer from "@/src/components/common/footer"
import HeaderAuth from "@/src/components/common/headerAuth"
import HeaderGeneric from "@/src/components/common/headerGeneric"
import ClienteInfo from "@/src/component/pages/clientes/clienteInfo"
import Head from "next/head"
import GetPedidos from "@/src/component/pages/pedidos"
import Orders from "@/src/component/pages/pedidos/allOrders"
import useSWR from "swr"
import pedidoService from "@/src/services/pedidoService"


const AllOrders=()=>{
       const {data,error}=useSWR('/pedidos',pedidoService.getPedidos)
    
  console.log("DATA:", data);
  console.log("ERROR:", error);

    if(!data) return <p>Loading...</p>
    if(error)return <p>Erro</p>
  return <>
  <Head>
  <title>Orders</title>
  <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
  </Head>
  <main >
  <HeaderAuth logoUrl="/register"
           
           btnContent="Abas"/>
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
    <Footer/>
  </main>
  </>
}
export default AllOrders