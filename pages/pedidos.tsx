import HeaderAuth from "@/src/components/common/headerAuth"
import Pedidos from "@/src/components/homeNoAuth/pages/pedidos"
import Head from "next/head"

const Pedido=()=>{
  return <>
 
  <Head>
            <title>Home</title>
            <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
        </Head>
        <main>
            <HeaderAuth logoUrl="/register"
           
        btnContent="Abas"/>
         <Pedidos/>
  </main>
  </>
}
export default Pedido