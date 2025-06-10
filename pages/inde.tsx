import Head from "next/head";
import styles from "../styles/getStyles.module.scss";

import Link from "next/link";
import HeaderIndex from "@/src/components/homeNoAuth/headerIndex";
import FooterIndex from "@/src/components/common/footerIndex";
import IndexDescription from "@/src/component/render/cards/static/indexDesciption";
import IndexProjects from "@/src/component/render/cards/static/indexProjects";
import IndexTech from "@/src/component/render/cards/static/indexTech";

const Index = () => {
  return (
    <>
      <Head>
        <title>Portfólio | Ewerton Silva de Abreu</title>
        <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
        <meta property="og:title" content="Portfólio Ewerton" key="title" />
        <meta
          name="description"
          content="Desenvolvedor Full Stack com foco em JavaScript, React e Node.js"
        />
      </Head>

      <main className={styles.main4}>
   <HeaderIndex/>

     <IndexDescription/>
     <IndexProjects/>
     <IndexTech/>
   
      </main>
           <FooterIndex/>
    </>
  );
};

export default Index;
