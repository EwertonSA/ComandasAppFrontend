'use server'
import SlidePagamentos from "@/src/component/slides/slidePagamentos";
import SlidePedidos from "@/src/component/slides/slidePedido";
import SlideSection from "@/src/component/slides/slideSection";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import produtService, { ProductType } from "@/src/services/productService";
import GoogleStateValidator from "../login/user/OauthGoogle";

const HomeAuth = async () => {
  const cookieStore =await cookies();
  const token = cookieStore.get("comandas-token")?.value;

  if (!token) {
    redirect("/userLogin"); // redireciona no servidor
  }

  let products: ProductType[] = [];
  try {
    const res = await produtService.getProduct(token);
    products = res.data;
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
  }

  return (
    <main>
      <GoogleStateValidator/>
      <SlideSection getproduts={products} />
      <SlidePedidos />
      <SlidePagamentos />
    </main>
  );
};

export default HomeAuth;
