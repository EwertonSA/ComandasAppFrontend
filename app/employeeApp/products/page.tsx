
import AllProducts from "@/app/employeeApp/products/allProducts"
interface PageProps{
    searchParams:Promise<{page?:string,perPage?:string}>
}

const allProduts=async({searchParams}:PageProps)=>{
    const params= await searchParams
return<>

<main>

<AllProducts searchParams={params} />

</main>

</>
}
export default allProduts