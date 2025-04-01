import Head from 'next/head';
import styles from '../styles/HomeNoAuth.module.scss'
import HeaderNoAuth from '@/src/components/homeNoAuth/headerNoAuth';
import PresentationSection from '@/src/components/homeNoAuth/presentationSection';
import CardSection from '@/src/components/homeNoAuth/cardSection';
import SlideSection from '@/src/components/homeNoAuth/slideSection';
import { GetStaticProps } from 'next';
import produtService, { ProductType } from '@/src/services/productService';
import { ReactNode } from 'react';

interface IndexPageProps{
  children?: ReactNode;
  product:ProductType[]
}

const HomeNoAuth= ({product}:IndexPageProps)=>{

  return(
    <>
    <Head>
<title>Comandas</title>
<link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
<meta property='og:title' content='Comandas' key='title'/>
<meta name='description' content='Tenha acesso ao serviço de comandas facilitador para restaurantes'/>
    </Head>
    <main>
      <div className={styles.sectionBack}>
      <HeaderNoAuth/>
      <PresentationSection/>
     
      </div>
      <CardSection/>
      <SlideSection getproduts={product}/>
    </main>
    </>
  )
}
export const getStaticProps: GetStaticProps=async()=>{
  const res= await produtService.getproducts()
 
  return {
    props:{product:res.data,},
    revalidate:3600*12,
  }
};

export default HomeNoAuth;