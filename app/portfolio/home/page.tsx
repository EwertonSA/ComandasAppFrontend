'use server'
import Footer from "@/src/components/common/footer"

import HeaderIndex from "@/src/components/homeNoAuth/headerIndex"
import { HeaderPort } from "./modal"



const PortfolioHome=async()=>{


  
    return(
          <>  
<HeaderPort logoUrl="teste"/>
       <Footer />
</>
    )
}
export default  PortfolioHome