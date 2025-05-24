import Footer from "@/src/components/common/footer"
import HeaderAuth from "@/src/components/common/headerAuth"
import HeaderGeneric from "@/src/components/common/headerGeneric"
import Pagamentos from "@/src/component/pages/pagamentos/pagamentoForm"
import Head from "next/head"
import { useRouter } from "next/router"

const Pagamento=()=>{
    const router=useRouter()
    const {comandaId}=router.query
return<>
 <Head>
            <title>Home</title>
            <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
        </Head>
<main>
   <HeaderAuth logoUrl={`/comandas/${comandaId}`} />
<Pagamentos redirectTo={()=>{router.push('/clienteInfo')}}/>
<Footer/>
</main>

</>
}
export default Pagamento