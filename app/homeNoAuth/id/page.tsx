'use client'

import ProductId from "@/src/component/pages/produtos/product"
import Footer from "@/src/components/common/footer"
import HeaderGeneric from "@/src/components/common/headerGeneric"

import { useParams, useRouter } from "next/navigation"

const Header=()=>{
    const params=useParams()
    const router = useRouter();
  const  comandaId  = params.comandaId;
    return <>
  
    <main >
 <HeaderGeneric logoUrl={`/homeNoAuth?comandaId=${comandaId}`}/>
  <ProductId />
      <Footer/>
    </main>
    </>
  }
  export default Header