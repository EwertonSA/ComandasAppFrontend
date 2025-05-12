import Footer from "@/src/components/common/footer"
import HeaderAuth from "@/src/components/common/headerAuth"
import HeaderGeneric from "@/src/components/common/headerGeneric"
import Pagamentos from "@/src/component/pages/pagamentos/pagamentoForm"
import Head from "next/head"

const PagamentoCliente=(comandaId:string)=>{
return<>
 <Head>
            <title>Home</title>
            <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
        </Head>
<main>
<HeaderAuth logoUrl="/clienteInfo"
           
           btnContent="Abas"/>
<Pagamentos redirectTo={`homeNoAuth?comandaId=${comandaId}`}/>
<Footer/>
</main>

</>
}
export default PagamentoCliente