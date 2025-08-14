'use server'
import HeaderGeneric from "@/src/components/common/headerGeneric"
import FormLogin from "./formLogin"
import Footer from "@/src/components/common/footer"
import GoogleStateValidator from "./OauthGoogle"


const LoginClient=()=>{
return <>

<main>
<HeaderGeneric logoUrl="/indexLogin"/>

<FormLogin/>

<Footer/>

</main>
</>
}
export default LoginClient