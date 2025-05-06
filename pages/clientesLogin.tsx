import IndexLogin from "@/src/component/pages/login"
import Login from "@/src/component/pages/login/login"
import Footer from "@/src/components/common/footer"
import HeaderGeneric from "@/src/components/common/headerGeneric"
import Head from "next/head"
import ClienteLogin from "@/src/component/pages/login/clienteLogin"
const indexPage=()=>{
    return <>
    <Head>
    <title>Home</title>
    <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
    </Head>
    <main >
 <HeaderGeneric btnContent="registrar" btnUrl="/userRegister" logoUrl="/"/>
< ClienteLogin/>
      <Footer/>
    </main>
    </>
  }
  export default indexPage