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

export interface IndexPageProps{
  children?: ReactNode;
  product:ProductType[]
}

const HomeNoAuth= ({product}:IndexPageProps)=>{
useEffect(()=>{
Aos.init()
},[])
  return(
    <>
    <Head>
<title>Comandas</title>
<link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
<meta property='og:title' content='Comandas' key='title'/>
<meta name='description' content='Tenha acesso ao serviço de comandas facilitador para restaurantes'/>
    </Head>
    <main>
      <div className={styles.sectionBack} data-aos="fade-zoom-in" data-aos-duration='1600'>
      <HeaderNoAuth/>
      <PresentationSection/>
     
      </div>
      <div  data-aos='fade-right' data-aos-duration='1200'>
      <CardSection/>
      </div>
      <div  data-aos='fade-up' data-aos-duration='1200'>
      <SlideSection getproduts={product}/>
      </div>
     
      <Footer/>
    </main>
    </>
  )
}
export const getStaticProps: GetStaticProps=async()=>{
  const res= await produtService.getProduct()
 
  return {
    props:{product:res.data,},
 
  }
};

export default HomeNoAuth;