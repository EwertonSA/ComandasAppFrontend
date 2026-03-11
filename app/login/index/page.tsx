
import Footer from "@/src/components/common/footer"
import HeaderGeneric from "@/src/components/common/headerGeneric"
import IndexLogin from "."

const indexPage=()=>{
    return <>
   
    <main >
 <HeaderGeneric  logoUrl="/"/>
   <IndexLogin/>
      <Footer/>
    </main>
    </>
  }
  export default indexPage