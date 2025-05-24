
import ProdutoIdForUser from "@/src/component/pages/produtos/productIdUser"
import Footer from "@/src/components/common/footer"
import HeaderAuth from "@/src/components/common/headerAuth"


import Head from "next/head"

const product=()=>{
    return <>
    <Head>
    <title>Home</title>
    <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
    </Head>
    <main >

   <HeaderAuth logoUrl="/home" />
           <ProdutoIdForUser/>
      <Footer/>
    </main>
    </>
  }
  export default product