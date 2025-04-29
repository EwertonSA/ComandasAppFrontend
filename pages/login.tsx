import HeaderGeneric from "@/src/components/common/headerGeneric"
import Head from "next/head"
import { FormEvent, useEffect, useState } from "react"
import styles from "../styles/register.module.scss"
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { useRouter } from "next/router"
import ToastComponent from "@/src/components/common/toast"
import authService from "@/src/services/authService"

const Login=()=>{
    const router=useRouter()
      const [toastMessage, setToastMessage] = useState("");
          const [toastIsOpen, setToastIsOpen] = useState(false);
          const [toastColor, setToastColor] = useState("bg-success");

        
          useEffect(()=>{
            const registerSuccess=router.query.registred
            if(registerSuccess === "true"){
                setToastMessage("Criado com sucesso!")
                 setToastColor("bg-success")
                setToastIsOpen(true)
                setTimeout(() => {
                  setToastIsOpen(false)
               
                }, 5000);
            }
          },[router.query])

    const handleLogin=async(ev:FormEvent<HTMLFormElement>)=>{
        ev.preventDefault()
        const formData=new FormData(ev.currentTarget)
        const email= formData.get('email')?.toString()|| ''
        const password=formData.get('password')?.toString()|| ''
        const params={email,password}
     
        const res=await authService.login(params)
        if(res.status===200|| res.status === 201){
            router.push('/')
        }else{}
    }
    return(
       <>
        <Head>
        <title>Home</title>
        <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
   
        </Head>
        <main className={styles.main}>
            <HeaderGeneric btnContent="/" btnUrl="/begin" logoUrl="Quero fazer parte"/>
            <Container className="py-5">
                <p className={styles.formTitle}> Bem vindo(a) de volta</p>
                <Form className={styles.form} onSubmit={handleLogin}>
                    <p><strong>Bem vindo ao serviço de comandas</strong></p>
                    <FormGroup>
                        <Label for="email" className={styles.label}>EMAIL</Label>
                        <Input name="email" type="email" id="email" placeholder="Digite seu email" className={styles.input} required/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='password' className={styles.label}>SENHA:</Label>
                        <Input name='password' type='password' id='' placeholder="Digite sua senha?" required maxLength={20} className={styles.input} />
                    </FormGroup>
                    <Button outline className={styles.formBtn} type="submit">Entrar</Button>
                </Form>
                <ToastComponent color={toastColor} isOpen={toastIsOpen} message={toastMessage} />
            </Container>
        </main>
       </>
    )
}
export default Login