import { useEffect, useState } from "react";
import Head from "next/head";
import HeaderGeneric from "@/src/components/common/headerGeneric";
import Footer from "@/src/components/common/footer";
import ClienteLogin from "@/src/component/pages/login/clienteLogin";
import { comandaService } from "@/src/services/comandaService"; // ou onde tem o getMesas
import { mesaService } from "@/src/services/mesaService";

const IndexPage = () => {
  const [mesas, setMesas] = useState([]);
  const [mesaSelecionada, setMesaSelecionada] = useState("");

  useEffect(() => {
    async function fetchMesas() {
      const response = await mesaService.getMesas();
      if (!response.error) {
        setMesas(response.mesas);
      } else {
        console.error("Erro ao buscar mesas");
      }
    }
    fetchMesas();
  }, []);

  const handleSubmit = (ev:any) => {
    ev.preventDefault();
    // aqui você trata o submit ou repassa para ClienteLogin fazer
  };

  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
      </Head>
      <main>
        <HeaderGeneric  logoUrl="/" />
        <ClienteLogin
          mesas={mesas}
          mesaSelecionada={mesaSelecionada}
          setMesaSelecionada={setMesaSelecionada}
          handleSubmit={handleSubmit}
        />
        <Footer />
      </main>
    </>
  );
};

export default IndexPage;
