import Footer from "@/src/components/common/footer"
import HeaderGeneric from "@/src/components/common/headerGeneric"
import IndexCertifications from "@/src/components/homeNoAuth/cards/static/indexCertifications"
import IndexDescription from "@/src/components/homeNoAuth/cards/static/indexDescription"
import { HeaderPort } from "../home/modal"

 const AboutMe=()=>{
    return(
        <main>
       <HeaderPort logoUrl="/portfolio/home"/>
        <IndexDescription/>
       
         <Footer/>
         </main>
    )
} 
export default  AboutMe