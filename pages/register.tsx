import Head from 'next/head';
import styles from '../styles/register.module.scss';
import HeaderGeneric from '@/src/components/common/headerGeneric';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import Footer from '@/src/components/common/footer';

const Register= ()=>{
    return <>
      <Head>
            <title>Registro</title>
            <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
            <script src="https://jsuites.net/v4/jsuites.js"></script>
        </Head>
        <main className={styles.main}>
            <HeaderGeneric logoUrl='/' btnUrl='/register' btnContent='Fazer pedidos'/>
            <Container className='py-5'>
                <p className={styles.formTitle}><strong >Bem vindo(a) ao cadastro</strong></p>
                <Form className={styles.form}>
                    <p  className={styles.subtitle}><strong>Faça o registro</strong></p>
                    <FormGroup>
                        <Label for='firstName' className={styles.label}>Nome</Label>
                        <Input id='firstName'
                        name='firstName'
                        type='text'
                        placeholder='Nome do cliente'
                        required
                        maxLength={20}
                        className={styles.inputName}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='telefone' className={styles.label}>Telefone</Label>
                        <Input id='telefone'
                        name='telefone'
                        type='tel'
                        placeholder='+55 (xx) 11 9xxxx-xxxx'
                        data-mask="[-]+55 (00) 00000-0000"
                       
                        className={styles.input}/>
                    </FormGroup>
                    <FormGroup>
                        
                        <Label for='mesaId' className={styles.label}>Mesa Id</Label>
                        <Input id='firstName'
                        name='mesaId'
                        type='number'
                        placeholder='Número da mesa'
                        required
                        min={1}
                        max={50}
                        className={styles.input}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='comanda' className={styles.label}>Comanda</Label>
                        <Input id='comanda'
                        name='comanda'
                        type='number'
                        placeholder='Número da comanda'
                        required
                        className={styles.input}/>
                    </FormGroup>
                    <Button outline className={styles.formBtn}>Cadastrar</Button>
                </Form>
            </Container>
            <Footer/>
        </main>
    </>
}
export default Register