import Clientes from "@/src/component/pages/clientes/clientes"
import Footer from "@/src/components/common/footer"
import HeaderAuth from "@/src/components/common/headerAuth"
import HeaderGeneric from "@/src/components/common/headerGeneric"
import ClienteInfo from "@/src/component/pages/clientes/clienteInfo"
import Head from "next/head"
import GetPedidos from "@/src/component/pages/pedidos"

import useSWR from "swr"
import pedidoService from "@/src/services/pedidoService"
import Orders from "@/src/component/pages/pedidos/allORders"


const AllOrders=()=>{

  return <>
  <Head>
  <title>Orders</title>
  <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
  </Head>
  <main >
  <HeaderAuth logoUrl="/register"
           
           btnContent="Abas"/>
<Orders/>
    <Footer/>
  </main>
  </>
}
export default AllOrders