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
<HeaderGeneric logoUrl="/clienteInfo" btnUrl="" btnContent=""/>
<Pagamentos/>
</main>
</>
}
export default Pagamento