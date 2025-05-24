import Footer from "@/src/components/common/footer"
import HeaderAuth from "@/src/components/common/headerAuth"
import Pedidos from "@/src/component/pages/pedidos/pedidoForm"
import Head from "next/head"

const Pedido=()=>{
  return <>
 
  <Head>
            <title>Home</title>
            <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
        </Head>
        <main>
          <HeaderAuth logoUrl="/home" />
         <Pedidos/>
         <Footer/>
  </main>
  </>
}
export default Pedido