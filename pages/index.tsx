import Head from 'next/head';
import styles from '../styles/HomeNoAuth.module.scss'
import HeaderNoAuth from '@/src/components/homeNoAuth/headerNoAuth';
import PresentationSection from '@/src/components/homeNoAuth/presentationSection';

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
      <div className={styles.sectionBack}>
      <HeaderNoAuth/>
      <PresentationSection/>
      </div>
     
    </main>
    </>
  )
}
export default HomeNoAuth;