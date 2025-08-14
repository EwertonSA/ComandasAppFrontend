

import Orders from "@/app/employeeApp/orders/allORders"


export interface PageProps {
  searchParams: { page?: string; perPage?: string };
}
const AllOrders=({searchParams}:PageProps)=>{

  return <>
 
  <main >
  
       
      
<Orders searchParams={searchParams}/>
  
  </main>
  </>
}
export default AllOrders