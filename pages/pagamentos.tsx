import HeaderAuth from "@/src/components/common/headerAuth"
import HeaderGeneric from "@/src/components/common/headerGeneric"
import Pagamentos from "@/src/components/homeNoAuth/pages/pagamentos"
import Head from "next/head"

const Pagamento=()=>{
return<>
 <Head>
            <title>Home</title>
            <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
        </Head>
<main>
<HeaderAuth logoUrl="/clienteInfo"
           
           btnContent="Abas"/>
<Pagamentos/>
</main>
</>
}
export default Pagamento