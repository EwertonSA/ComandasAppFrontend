import IndexLogin from "@/src/component/pages/login"
import Product from "@/src/component/pages/produtos"
import ProductId from "@/src/component/pages/produtos/product"
import Footer from "@/src/components/common/footer"
import HeaderGeneric from "@/src/components/common/headerGeneric"
import { ProdutoProps } from "@/src/services/productService"
import Head from "next/head"

const product=()=>{
    return <>
    <Head>
    <title>Home</title>
    <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
    </Head>
    <main >
 <HeaderGeneric btnContent="registrar" btnUrl="/userRegister" logoUrl="/"/>
  <ProductId />
      <Footer/>
    </main>
    </>
  }
  export default product