import { redirect } from "next/navigation"
import { cookies } from "next/headers"

const LogoutAction=async()=>{
    const cookie=await cookies()
    cookie.set('comandas-token','',{
        httpOnly:true,
        path:'/',
        expires: new Date(0)

    })
    redirect("/login/index")
}
export default LogoutAction