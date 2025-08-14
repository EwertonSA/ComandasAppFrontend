'use server'
import { OrdersPageProps } from "../allORders"
import OrderForm from "./form"


const Pedido=async({searchParams}:OrdersPageProps)=>{

  


  return <>
 
 
        <main>
        
         <OrderForm/>
    
  </main>
  </>
}
export default Pedido