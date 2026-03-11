'use server'
import HeaderGeneric from "@/src/components/common/headerGeneric"
import FormLogin from "./formLogin"
import Footer from "@/src/components/common/footer"
import authService from "@/src/services/authService"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"


const LoginClient=async()=>{

return <>

<main>
<HeaderGeneric logoUrl="/indexLogin"/>

<FormLogin/>

<Footer/>

</main>
</>
}
export default LoginClient