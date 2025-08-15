

import Orders from "@/app/employeeApp/orders/allORders"


export interface PageProps {
  searchParams: Promise<{ page?: string; perPage?: string }>;
}
const AllOrders=async({searchParams}:PageProps)=>{
const params=await searchParams
  return <>
 
  <main >
  
       
      
<Orders searchParams={params}/>
  
  </main>
  </>
}
export default AllOrders