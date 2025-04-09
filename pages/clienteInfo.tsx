import HeaderGeneric from "@/src/components/common/headerGeneric"
import ClienteInfo from "@/src/components/homeNoAuth/pages/swr/clienteInfo"
import Head from "next/head"

const ClienteInf=()=>{
  return <>
  <Head>
  <title>Home</title>
  <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
  </Head>
  <main>
    <HeaderGeneric logoUrl="/register" btnUrl="/pagamentos" btnContent="Pagamento"/>
    <ClienteInfo/>
  </main>
  </>
}
export default ClienteInf