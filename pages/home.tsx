import HeaderAuth from "@/src/components/common/headerAuth"

import SlidePagamentos from "@/src/component/slides/slidePagamentos"
import SlidePedidos from "@/src/component/slides/slidePedido"
import SlideSection from "@/src/component/slides/slideSection"
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
    if (!sessionStorage.getItem("comandas-token")) {
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
    const res= await produtService.getProduct()
  
   
    return {
      props:{product:res.data || [],
        pedidos:res.data || [],
      },
      revalidate:3600*12,
    }
  };
export default HomeAuth