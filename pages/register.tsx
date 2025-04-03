import Head from 'next/head';
import styles from '../styles/register.module.scss';
import HeaderGeneric from '@/src/components/common/headerGeneric';

const Register= ()=>{
    return <>
      <Head>
            <title>Registro</title>
            <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
        </Head>
        <main>
            <HeaderGeneric logoUrl='/' btnUrl='/register' btnContent='Fazer pedidos'/>
        </main>
    </>
}
export default Register