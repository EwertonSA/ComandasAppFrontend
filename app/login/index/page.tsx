import IndexLogin from "@/src/component/pages/login"
import Footer from "@/src/components/common/footer"
import HeaderGeneric from "@/src/components/common/headerGeneric"

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