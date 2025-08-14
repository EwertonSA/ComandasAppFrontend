
'use server'
import Footer from "@/src/components/common/footer";
import HeaderNoAuth from "@/src/components/homeNoAuth/headerNoAuth";
import ClientForm from "./form";
import { cookies } from "next/headers";
import { mesaService } from "@/src/services/mesaService";

const IndexPage = async() => {
const cookie=await cookies()
const token=cookie.get('clientes-token')?.value||''
const page=1
const perPage=10
const res=await mesaService.getMesas(token,page,perPage)

    if (!res) return <p>Erro ao carregar mesas.</p>;

  return (
    <>
    
      <main>
        <HeaderNoAuth/>
       <ClientForm mesas={res.mesas}/>
        <Footer />
      </main>
    </>
  );
};

export default IndexPage;
