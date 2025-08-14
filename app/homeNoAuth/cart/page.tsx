'use client'
import Card from "@/src/component/pages/comandas/carrinho"

import Footer from "@/src/components/common/footer"
import HeaderGeneric from "@/src/components/common/headerGeneric"

import { useParams, useRouter } from "next/navigation"

const Cart=()=>{
  const router=useRouter()
  const params=useParams()
  const comandaId=params.comandaId
    return <>
  
    <main >
 <HeaderGeneric logoUrl={`homeNoAuth?comandaId=${comandaId}`} />
 {comandaId && typeof comandaId ==="string" &&(<Card  id={comandaId} />)}

      <Footer/>
    </main>
    </>
  }
  export default Cart