import Footer from "@/src/components/common/footer"
import HeaderAuth from "@/src/components/common/headerAuth"
import HeaderGeneric from "@/src/components/common/headerGeneric"
import Pagamentos from "@/src/component/pages/pagamentos/pagamentoForm"
import Head from "next/head"
import Payments from "@/src/component/pages/pagamentos/AllPayments"
import AllProducts from "@/src/component/pages/produtos/allProducts"

const allProduts=()=>{
return<>
 <Head>
            <title>Home</title>
            <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
        </Head>
<main>
   <HeaderAuth logoUrl="/home" />
<AllProducts />
<Footer/>
</main>

</>
}
export default allProduts