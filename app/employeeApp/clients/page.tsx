import Clientes from "@/src/component/pages/clientes/clientes"
import Footer from "@/src/components/common/footer"
import HeaderAuth from "@/src/components/common/headerAuth"
import { PageProps } from "../orders/page"


const AllOrders=({searchParams}:PageProps)=>{

  return <>
 
  <main >
 
<Clientes searchParams={searchParams}/>
 
  </main>
  </>
}
export default AllOrders