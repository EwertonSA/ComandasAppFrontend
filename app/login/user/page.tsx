'use server'
import HeaderGeneric from "@/src/components/common/headerGeneric"
import FormLogin from "./formLogin"
import Footer from "@/src/components/common/footer"
import GoogleStateValidator from "./OauthGoogle"
import authService from "@/src/services/authService"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import FormLogin2fa from "./login2fa"


const LoginClient=async(email:string,password:string)=>{
      const res = await authService.login({ email, password });

  if (res.status === 200) {
    const setcookie=await cookies()
    setcookie.set("comandas-token", res.data.token, { httpOnly: true });
    redirect("/employeeApp");
  }
return <>

<main>
<HeaderGeneric logoUrl="/indexLogin"/>

<FormLogin/>

<Footer/>

</main>
</>
}
export default LoginClient