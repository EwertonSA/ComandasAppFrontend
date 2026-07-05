import IndexCertifications from "@/src/components/homeNoAuth/cards/static/indexCertifications"
import { HeaderPort } from "../home/modal"
import Footer from "@/src/components/common/footer"

const Certifications=()=>{
return(
    <main>
    <HeaderPort logoUrl="/portfolio/home"/>
      <IndexCertifications />
      <Footer/>
    </main>
)
}
export default Certifications