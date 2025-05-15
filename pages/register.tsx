import Footer from "@/src/components/common/footer"
import HeaderAuth from "@/src/components/common/headerAuth"
import HeaderGeneric from "@/src/components/common/headerGeneric"
import Register from "@/src/component/pages/clientes/clienteForm"
import Head from "next/head"
import ToastComponent from "@/src/components/common/toast"


const RegisterClient=()=>{
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
export default RegisterClient