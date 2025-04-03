import Head from 'next/head';
import styles from '../styles/register.module.scss';
import HeaderGeneric from '@/src/components/common/headerGeneric';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import Footer from '@/src/components/common/footer';
import { FormEvent, useState } from 'react';
import clienteService from '@/src/services/clienteService';
import { useRouter } from 'next/router';
import ToastComponent from '@/src/components/common/toast';



const Register= ()=>{
    const router=useRouter()
    const [toastOpen,setToastOpen]=useState(false)
    const [toastMessage,setToastMessage]=useState('')
    const [toastColor,setToastColor]=useState(false)
    const handleRegister=async(event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        
        const formData= new FormData(event.currentTarget)
        const nome= formData.get('nome')!.toString()
        const telefone= formData.get('telefone')!.toString()
        const mesaId= formData.get('mesaId')!.toString()
        const params={nome,telefone,mesaId}
        
        const {data,status}=await clienteService.register(params)
        if(status===201){
            setToastOpen(true);
            setTimeout(()=>{
                setToastOpen(false)
            },1000*3)
            router.push('/comandas?registred:true')
        }else{
            alert(data.message)
        }
    }
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
                <Form className={styles.form} onSubmit={handleRegister}>
                    <p  className={styles.subtitle}><strong>Faça o registro</strong></p>
                    <FormGroup>
                        <Label for='nome' className={styles.label}>Nome</Label>
                        <Input id='nome'
                        name='nome'
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
                        <Input id='mesaId'
                        name='mesaId'
                        type='number'
                        placeholder='Número da mesa'
                        required
                        min={1}
                        max={50}
                        className={styles.input}/>
                    </FormGroup>
                 
                    <Button type='submit' outline className={styles.formBtn}>Cadastrar</Button>
                </Form>
            </Container>
            <Footer/>
            <ToastComponent isOpen={toastOpen} color='bg-danger' message={toastMessage}></ToastComponent>
        </main>
    </>
}
export default Register