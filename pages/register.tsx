import Footer from "@/src/components/common/footer"
import HeaderAuth from "@/src/components/common/headerAuth"
import HeaderGeneric from "@/src/components/common/headerGeneric"
import Register from "@/src/components/homeNoAuth/pages/register"
import Head from "next/head"


const RegisterCliente=()=>{
return <>
<Head>
<title>Registro</title>
<link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
</Head>
<main>
<HeaderAuth
          logoUrl="/"
        
          btnContent="Abas"
        />
    <Register/>
    <Footer/>
</main>
</>
}
export default RegisterCliente