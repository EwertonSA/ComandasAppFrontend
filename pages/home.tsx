import SlidePagamentos from "@/src/component/slides/slidePagamentos";
import SlidePedidos from "@/src/component/slides/slidePedido";
import SlideSection from "@/src/component/slides/slideSection";
import HeaderAuth from "@/src/components/common/headerAuth";
import produtService, { ProductType } from "@/src/services/productService";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const HomeAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const token = sessionStorage.getItem("comandas-token");
    if (!token) {
      router.push("/userLogin");
      return;
    }

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

  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
      </Head>
      <main>
        <div>
          <HeaderAuth logoUrl="/home" />
          <SlideSection getproduts={products} />
          <SlidePedidos />
          <SlidePagamentos />
        </div>
      </main>
    </>
  );
};
export default HomeAuth
