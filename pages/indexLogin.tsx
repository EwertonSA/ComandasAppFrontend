import IndexLogin from "@/src/component/pages/login"
import Footer from "@/src/components/common/footer"
import HeaderGeneric from "@/src/components/common/headerGeneric"
import Head from "next/head"

const indexPage=()=>{
    return <>
    <Head>
    <title>Home</title>
    <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
    </Head>
    <main >
 <HeaderGeneric  logoUrl="/"/>
   <IndexLogin/>
      <Footer/>
    </main>
    </>
  }
  export default indexPage