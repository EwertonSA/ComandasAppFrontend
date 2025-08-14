
import HeaderGeneric from "@/src/components/common/headerGeneric"
import { ReactNode } from "react"
interface params{
    params:{comandaId:string}
    children:ReactNode
}
const RootLayoutClientApp=({children,params}:params)=>{
return(
    <div>
<HeaderGeneric logoUrl={`/homeNoAuth/${params.comandaId}`}/>
<main>
    {children}
</main>

    </div>
)
}
export default RootLayoutClientApp