import IndexLogin from "@/src/component/pages/login"
import Product from "@/src/component/pages/produtos"
import ProductId from "@/src/component/pages/produtos/product"
import Footer from "@/src/components/common/footer"
import HeaderGeneric from "@/src/components/common/headerGeneric"
import { ProdutoProps } from "@/src/services/productService"
import Head from "next/head"
import { useRouter } from "next/router"

const Header=()=>{
    const router = useRouter();
  const { comandaId } = router.query;
    return <>
    <Head>
    <title>Home</title>
    <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
    </Head>
    <main >
 <HeaderGeneric logoUrl={`/homeNoAuth?comandaId=${comandaId}`}/>
  <ProductId />
      <Footer/>
    </main>
    </>
  }
  export default Header