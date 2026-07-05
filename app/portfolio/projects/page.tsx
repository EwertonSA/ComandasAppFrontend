import HeaderAuth from "@/src/components/common/headerAuth"
import IndexProjects from "@/src/components/homeNoAuth/cards/static/indexProjects"
import HeaderNoAuth from "@/src/components/homeNoAuth/headerNoAuth"
import { HeaderPort } from "../home/modal"
import Footer from "@/src/components/common/footer"

 const Projects=()=>{
return(
<main>
   <HeaderPort logoUrl="/portfolio/home"/>
    <IndexProjects/>
    <Footer/>
    </main>
)
}
export default  Projects