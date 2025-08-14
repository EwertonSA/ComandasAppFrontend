
import AllProducts from "@/app/employeeApp/products/allProducts"


const allProduts=({searchParams}:{searchParams:{page?:string,perPage?:string}})=>{
return<>

<main>

<AllProducts searchParams={searchParams} />

</main>

</>
}
export default allProduts