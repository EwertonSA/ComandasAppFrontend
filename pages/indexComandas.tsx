

import Head from "next/head";

import HeaderNoAuth from "@/src/components/homeNoAuth/headerNoAuth";
import PresentationSection from "@/src/components/homeNoAuth/presentationSection";
import CardSection from "@/src/components/homeNoAuth/cardSection";
import SlideSection from "@/src/component/slides/slideSection";
import Footer from "@/src/components/common/footer";
import styles from '../styles/HomeNoAuth.module.scss'





const HomeNoAuth= ()=>{

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
  
     
      <Footer/>
    </main>
    </>
  )
}

export default HomeNoAuth;