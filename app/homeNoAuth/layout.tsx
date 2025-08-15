
import HeaderGeneric from "@/src/components/common/headerGeneric"
import { ReactNode } from "react"
interface params{
    params:Promise<{comandaId:string}>
    children:ReactNode
}
const RootLayoutClientApp=async({children,params}:params)=>{
    const param=await params
return(
    <div>
<HeaderGeneric logoUrl={`/homeNoAuth/${param.comandaId}`}/>
<main>
    {children}
</main>

    </div>
)
}
export default RootLayoutClientApp