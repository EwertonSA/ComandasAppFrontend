import Clientes from "@/src/component/pages/clientes/clientes"
import Footer from "@/src/components/common/footer"
import HeaderAuth from "@/src/components/common/headerAuth"
import HeaderGeneric from "@/src/components/common/headerGeneric"
import Head from "next/head"

const AllOrders=()=>{

  return <>
  <Head>
  <title>Orders</title>
  <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
  </Head>
  <main >
 <HeaderAuth
  logoUrl="/home"
  btnContent="Abas"
  tabs={[
    { label: "Página inicial", href: "/home" },
    { label: "Comandas", href: "/allClients" },
    { label: "Cliente Info", href: "/clienteInfo" },
    { label: "Registrar", href: "/register" }
  ]}
/>
<Clientes/>
    <Footer/>
  </main>
  </>
}
export default AllOrders