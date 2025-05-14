import Card from "@/src/component/pages/comandas/carrinho"
import IndexLogin from "@/src/component/pages/login"
import Product from "@/src/component/pages/produtos"
import ProductId from "@/src/component/pages/produtos/product"
import PedidosList from "@/src/component/render/cards/pedidoList"
import Footer from "@/src/components/common/footer"
import HeaderGeneric from "@/src/components/common/headerGeneric"
import { ProdutoProps } from "@/src/services/productService"
import Head from "next/head"
import { useRouter } from "next/router"

const Cart=()=>{
  const router=useRouter()
  const {comandaId}=router.query
    return <>
    <Head>
    <title>Carrinho</title>
    <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
    </Head>
    <main >
 <HeaderGeneric btnContent="abas" btnUrl="" logoUrl={`homeNoAuth?comandaId=${comandaId}`} />
 {comandaId && typeof comandaId ==="string" &&(<Card  id={comandaId} />)}

      <Footer/>
    </main>
    </>
  }
  export default Cart