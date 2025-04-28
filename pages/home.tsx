import HeaderAuth from "@/src/components/common/headerAuth"
import GetPagamentos from "@/src/components/homeAuth/pagamentos"
import Pagamentos from "@/src/components/homeAuth/pagamentos"
import GetPedidos from "@/src/components/homeAuth/pedidos"
import Product from "@/src/components/homeAuth/products"
import SlidePagamentos from "@/src/components/homeNoAuth/slidePagamentos"
import SlidePedidos from "@/src/components/homeNoAuth/slidePedido"
import SlideSection from "@/src/components/homeNoAuth/slideSection"
import pedidoService from "@/src/services/pedidoService"
import produtService, { PedidosType, ProductType } from "@/src/services/productService"
import { GetStaticProps } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { ReactNode, useEffect, useState } from "react"

export interface ProdProps{
  children?: ReactNode;
  product:ProductType[]
  pedidos:PedidosType[]
}

const HomeAuth=({product,pedidos}:ProdProps)=>{
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!sessionStorage.getItem("")) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);
  
  if (loading) {
    return <p>Loading...</p>;
  }
    return(
        <>
        <Head>
            <title>Home</title>
            <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
        </Head>
        <main>
          <div>
          <HeaderAuth logoUrl="/register"
        
        btnContent="Abas"/>
            <SlideSection getproduts={product}/>
          <SlidePedidos />
          <SlidePagamentos/>
          </div>
            
        </main>
        </>
    )
}
export const getStaticProps: GetStaticProps=async()=>{
    const res= await produtService.getproducts()
    const pedidoRes=await pedidoService.getPedidos()
   
    return {
      props:{product:res.data || [],
        pedidos:pedidoRes.data  || [],
      },
      revalidate:3600*12,
    }
  };
export default HomeAuth