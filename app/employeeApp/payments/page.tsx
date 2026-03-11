

import Payments from "@/app/employeeApp/payments/AllPayments"
interface PageProps{
    searchParams:Promise<{page?:string,perPage?:string}>
}
const allPayments=async({searchParams}:PageProps)=>{
    const params=await searchParams
return<>

<main>
 
<Payments searchParams={params}/>

</main>

</>
}
export default allPayments