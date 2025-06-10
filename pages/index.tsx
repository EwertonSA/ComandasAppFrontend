import Head from 'next/head';
import styles from '../styles/HomeNoAuth.module.scss'
import HeaderNoAuth from '@/src/components/homeNoAuth/headerNoAuth';
import PresentationSection from '@/src/components/homeNoAuth/presentationSection';
import CardSection from '@/src/components/homeNoAuth/cardSection';
import SlideSection from '@/src/component/slides/slideSection';
import { GetStaticProps } from 'next';
import produtService, { ProductType } from '@/src/services/productService';
import { ReactNode, useEffect } from 'react';
import Footer from '@/src/components/common/footer';
import Aos from 'aos';
import 'aos/dist/aos.css'
import Link from "next/link";
import HeaderIndex from "@/src/components/homeNoAuth/headerIndex";
import FooterIndex from "@/src/components/common/footerIndex";
import IndexDescription from "@/src/component/render/cards/static/indexDesciption";
import IndexProjects from "@/src/component/render/cards/static/indexProjects";
import IndexTech from "@/src/component/render/cards/static/indexTech";
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
export const getStaticProps: GetStaticProps=async()=>{
  const res= await produtService.getProduct()
 
  return {
    props:{product:res.data,},
 
  }
};

export default Index;