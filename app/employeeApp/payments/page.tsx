

import Payments from "@/app/employeeApp/payments/AllPayments"

const allPayments=({searchParams}:{searchParams:{page?:string,perPage?:string}})=>{
return<>

<main>
 
<Payments searchParams={searchParams}/>

</main>

</>
}
export default allPayments