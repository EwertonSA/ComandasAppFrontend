
import Footer from "@/src/components/common/footer"
import IndexLogin from "."
import HeaderNoAuth from "@/src/components/homeNoAuth/headerNoAuth"

const indexPage=()=>{
    return <>
   
    <main >
<HeaderNoAuth />
   <IndexLogin/>
      <Footer/>
    </main>
    </>
  }
  export default indexPage