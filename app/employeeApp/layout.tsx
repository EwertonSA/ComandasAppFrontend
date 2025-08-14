import Footer from "@/src/components/common/footer"
import HeaderAuth from "@/src/components/common/headerAuth"
import { ReactNode } from "react"
const RootLayoutEmployeeApp=({children}:{children:ReactNode})=>{
    return(
        <div >
            <HeaderAuth logoUrl="/employeeApp"/>
            <main className="d-flex flex-column align-items-center justify-content-center">
            {children}
            </main>
            <Footer/>
        </div>
    )
}
export default RootLayoutEmployeeApp