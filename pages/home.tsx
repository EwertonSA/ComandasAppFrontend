import HeaderAuth from "@/src/components/common/headerAuth"
import GetPagamentos from "@/src/components/homeAuth/pagamentos"
import Pagamentos from "@/src/components/homeAuth/pagamentos"
import GetPedidos from "@/src/components/homeAuth/pedidos"
import Product from "@/src/components/homeAuth/products"
import Head from "next/head"


const HomeAuth=()=>{
    return(
        <>
        <Head>
            <title>Home</title>
            <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
        </Head>
        <main>
            <HeaderAuth logoUrl="/register"
        
        btnContent="Abas"/>
          <Product/>
          <GetPedidos/>
          <GetPagamentos/>
        </main>
        </>
    )
}
export default HomeAuth