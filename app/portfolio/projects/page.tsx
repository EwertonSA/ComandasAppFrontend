import HeaderAuth from "@/src/components/common/headerAuth"
import IndexProjects from "@/src/components/homeNoAuth/cards/static/indexProjects"
import HeaderNoAuth from "@/src/components/homeNoAuth/headerNoAuth"
import { HeaderPort } from "../home/modal"

 const Projects=()=>{
return(
<>
   <HeaderPort logoUrl="teste"/>
    <IndexProjects/>
    </>
)
}
export default  Projects