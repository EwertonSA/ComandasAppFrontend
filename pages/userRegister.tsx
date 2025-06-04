import Register from "@/src/component/pages/login/register"
import Footer from "@/src/components/common/footer"
import HeaderAuth from "@/src/components/common/headerAuth"

import Head from "next/head"



const RegisterUser=()=>{
return <>
<Head>
<title>Registro de usuário</title>
<link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
</Head>
<main>
<HeaderAuth
          logoUrl="/"
        
      
        />
<Register/>
    <Footer/>
</main>
</>
}
export default RegisterUser