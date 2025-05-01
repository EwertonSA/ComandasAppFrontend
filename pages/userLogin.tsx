import Footer from "@/src/components/common/footer"
import HeaderAuth from "@/src/components/common/headerAuth"

import Head from "next/head"

import Login from "@/src/component/pages/login/login"
import HeaderGeneric from "@/src/components/common/headerGeneric"


const LoginClient=()=>{
return <>
<Head>
<title>Registro de usuário</title>
<link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
</Head>
<main>
<HeaderGeneric btnContent="registrar" btnUrl="/register" logoUrl="/" />
<Login/>
<Footer/>
</main>
</>
}
export default LoginClient