import Clientes from "@/src/component/pages/clientes/clientes"
import Footer from "@/src/components/common/footer"
import HeaderAuth from "@/src/components/common/headerAuth"
import HeaderGeneric from "@/src/components/common/headerGeneric"
import ClienteInfo from "@/src/component/pages/clientes/clienteInfo"
import Head from "next/head"


const ClienteInf=()=>{
  return <>
  <Head>
  <title>Home</title>
  <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
  </Head>
  <main >
    <HeaderAuth logoUrl="/home" />
    <ClienteInfo/>
 
    <Footer/>
  </main>
  </>
}
export default ClienteInf