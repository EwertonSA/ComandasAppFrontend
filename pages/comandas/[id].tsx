import Footer from "@/src/components/common/footer"
import HeaderAuth from "@/src/components/common/headerAuth"

import Head from "next/head"

import Comanda from "@/src/component/pages/comandas"


const ComandaInfo=()=>{
return <>
<Head>
<title>Registro de usuário</title>
<link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
</Head>
<main>
<HeaderAuth
          logoUrl="/ClienteInfo"
        
          btnContent="Abas"
        />
<Comanda/>
    <Footer/>
</main>
</>
}
export default ComandaInfo