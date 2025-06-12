import Head from 'next/head';
import styles from "../styles/getStyles.module.scss";
import { GetStaticProps } from 'next';
import produtService, { ProductType } from '@/src/services/productService';
import { ReactNode, useEffect } from 'react';

import Aos from 'aos';
import 'aos/dist/aos.css'

import HeaderIndex from "@/src/components/homeNoAuth/headerIndex";
import FooterIndex from "@/src/components/common/footerIndex";
import IndexDescription from "@/src/component/render/cards/static/indexDesciption";
import IndexProjects from "@/src/component/render/cards/static/indexProjects";
import IndexTech from "@/src/component/render/cards/static/indexTech";
import IndexCertifications from '@/src/component/render/cards/static/indexCertifications';
import Footer from '@/src/components/common/footer';
export interface IndexPageProps{
  children?: ReactNode;
  
}


const Index=({}:IndexPageProps)=>{
useEffect(()=>{
Aos.init()
},[])
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

      <main className={styles.main}>


     <IndexDescription/>
     <IndexProjects/>
     <IndexCertifications/>
     <IndexTech/>
      <Footer/>
      </main>
        
    </>
  );
};
export const getStaticProps: GetStaticProps=async()=>{
  const res= await produtService.getProduct()
 
  return {
    props:{product:res.data,},
 
  }
};

export default Index;