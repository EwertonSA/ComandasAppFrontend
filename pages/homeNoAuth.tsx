import Footer from "@/src/components/common/footer"

import Head from "next/head"
import SlideSection from "@/src/component/slides/slideSection"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import produtService, { ProductType } from "@/src/services/productService"
import HeaderGeneric from "@/src/components/common/headerGeneric"

import ProdutosCategoria from "@/src/component/pages/produtos/productCategory"

import SearchHomeNoAuth from "@/src/component/render/forms/searchHomeNoauth"

const Pedido=()=>{
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
 

    const fetchProducts = async () => {
      try {
        const res = await produtService.getProduct(); // sessionStorage será acessado aqui
        setProducts(res.data); // já é o array de produtos
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Carregando...</p>;

  return <>
 
  <Head>
            <title>Home</title>
            <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
        </Head>
        <main >
          
           
        <HeaderGeneric btnContent="registrar" btnUrl="/userRegister" logoUrl="/homeNoAuth"/>
       <div className="d-flex flex-column align-items-center justify-content-center">
       <SearchHomeNoAuth/>
         <SlideSection getproduts={products}/>
     
         <ProdutosCategoria/>
       </div>
        
      
         <Footer/>
  </main>
  </>
}
export default Pedido