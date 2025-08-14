'use client'
import Footer from "@/src/components/common/footer"
import HeaderAuth from "@/src/components/common/headerAuth"
import HeaderGeneric from "@/src/components/common/headerGeneric"
import Pagamentos from "@/src/component/pages/pagamentos/pagamentoForm"
import Head from "next/head"
import { useRouter } from "next/navigation"
import { handleLogout } from "@/src/components/common/Modal"
import { useSearchParams } from "next/navigation"

const PagamentoCliente=()=>{
    const router=useRouter()
    const searchParams=useSearchParams()
    const comandaId=searchParams.get('comandaId') as string
return<>
 <Head>
            <title>Home</title>
            <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
        </Head>
<main>
<HeaderGeneric logoUrl={`/homeNoAuth/${comandaId}`} comandaId={comandaId}/>
<Pagamentos redirectTo={()=>handleLogout(router)}/>
<Footer/>
</main>

</>
}
export default PagamentoCliente