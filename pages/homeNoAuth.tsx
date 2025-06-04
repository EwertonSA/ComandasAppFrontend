import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import produtService, { ProductType } from "@/src/services/productService"
import Head from "next/head";
import HeaderGeneric from "@/src/components/common/headerGeneric";
import SearchHomeNoAuth from "@/src/component/render/forms/searchHomeNoauth";
import SlideSection from "@/src/component/slides/slideSection";
import SlideProdutosPorCategoria from "@/src/component/pages/produtos/productCategory";
import Footer from "@/src/components/common/footer";

const HomeNoAuth=()=>{
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const token = sessionStorage.getItem("cliente-token");
    if (!token) {
      router.push("/indexLogin");
    }},[router])

    const fetchProducts = async () => {
      try {
        const res = await produtService.getProduct(); 
        setProducts(res.data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      } finally {
        setLoading(false);
      }
    
useEffect(()=>{
  fetchProducts();
}, [])
    
}

  
  return <>
 
  <Head>
            <title>Home</title>
            <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
        </Head>
        <main >
          
           
        <HeaderGeneric  logoUrl="/homeNoAuth"/>
       <div className="d-flex flex-column align-items-center justify-content-center">
       <SearchHomeNoAuth/>
      
     
         <SlideProdutosPorCategoria/>
       </div>
        
      
         <Footer/>
  </main>
  </>
}
export default HomeNoAuth