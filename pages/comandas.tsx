import HeaderGeneric from "@/src/components/common/headerGeneric"
import Head from "next/head"
import styles from "../styles/register.module.scss"
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import Footer from "@/src/components/common/footer"
import { useRouter } from "next/router"
import { FormEvent, useEffect, useState } from "react"
import ToastComponent from "@/src/components/common/toast"
import clienteService from "@/src/services/clienteService"

    
const Comandas =()=>{
    const router=useRouter()
    const [toastOpen,setToastOpen]=useState(false)
    const [toastMessage,setToastMessage]=useState('')
    const [toastColor,setToastColor]=useState('')
    const registerSuccess=router.query.registred;
    useEffect(()=>{
        if(registerSuccess === 'true'){
            setToastColor('bg-success')
            setToastOpen(true);
            setTimeout(()=>{
                setToastOpen(false)
            },1000*3)
            setToastMessage("Cadastro bem sucedido")
        }
    },[router.query])
    const handleComandas= async(ev:FormEvent<HTMLFormElement>)=>{
        ev.preventDefault()
        const formData=new FormData(ev.currentTarget);
        const mesaId= formData.get('mesaId')!.toString()
        const clienteId= formData.get('clienteId')!.toString()
        const params={mesaId,clienteId}
        const {status}=await clienteService.registerComanda(params)
        if(status===200){
            router.push('/pedidos')
        }else{
            setToastColor('bg-danger')
            setToastOpen(true);
            setTimeout(()=>{
                setToastOpen(false)
            },1000*3)
            setToastMessage("Erro nos campos")
        }
    }
return <>
<Head>
<title>comandas</title>
 <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
</Head>
<main className={styles.main}>
<HeaderGeneric logoUrl="/register" btnUrl="/pedidos" btnContent="fazer pedidos"/>
<Container className='py-5'>
    <p className={styles.formTitle}>
       Cadastro de comandas
    </p>
    <Form className={styles.form} onSubmit={handleComandas}>
        <p className="text-center"><strong>Cadastre o cliente</strong></p>
        <FormGroup>
            <Label for='mesaId' className={styles.label}>Mesa Id</Label>
            <Input
           id="mesaId" name="mesaId" type="number" placeholder="Número da mesa" required className={styles.input}/>
        </FormGroup>
        <FormGroup>
            <Label for='clienteId' className={styles.label}>Cliente Id</Label>
            <Input
           id="clienteId" name="clienteId" type="number" placeholder="Número da mesa" required className={styles.input}/>
        </FormGroup>
        <Button type="submit" outline className={styles.formBtn}>Cadastrar</Button>
    </Form>
    <ToastComponent isOpen={toastOpen} color={toastColor} message={toastMessage}></ToastComponent>
</Container>
<Footer/>
</main>
 
</>
}
export default Comandas