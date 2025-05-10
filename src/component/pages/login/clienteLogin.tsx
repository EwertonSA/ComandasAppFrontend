import HeaderGeneric from "@/src/components/common/headerGeneric"
import Head from "next/head"
import { FormEvent, useEffect, useState } from "react"
import styles from "../../../../styles/register.module.scss"
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { useRouter } from "next/router"
import ToastComponent from "@/src/components/common/toast"
import authService from "@/src/services/authService"
import { comandaService } from "@/src/services/comandaService"

const ClienteLogin=()=>{
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
               
                }, 1000);
            }
          },[router.query])

    const handleLogin=async(ev:FormEvent<HTMLFormElement>)=>{
        ev.preventDefault()
        const formData=new FormData(ev.currentTarget)
        const email= formData.get('email')?.toString()|| ''
        const password= '123456'
         const nome= formData.get('nome')?.toString()|| ''
          const mesaId= formData.get('mesaId')?.toString()|| ''
        const params={email,password}
     const resRegistrar=await comandaService.registrarTudo({nome,mesaId})
     if(resRegistrar.status !== 200){
        setToastMessage(resRegistrar.message || "Erro ao fazer login");
        setToastColor("bg-danger");
        setToastIsOpen(true);
        setTimeout(() => setToastIsOpen(false), 3000);
     }
     const comandaId = resRegistrar.comandaId;
  
        const res=await authService.autoLogin(params)
        if(res.status===200|| res.status === 201){
            router.push(`/homeNoAuth?comandaId=${comandaId}`)
        }else{
            setToastMessage(res.error || "Erro ao fazer login");
            setToastColor("bg-danger");
            setToastIsOpen(true);
            setTimeout(() => setToastIsOpen(false), 3000);
        }
    }
    return(
       <>
        <Head>
        <title>Home</title>
        <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
   
        </Head>
        <main className={styles.main}>
           
            <Container className="py-5">
                <p className={styles.formTitle}> Bem vindo(a) de volta</p>
                <Form className={styles.form} onSubmit={handleLogin}>
                    <p><strong>Bem vindo ao serviço de comandas</strong></p>
                    <FormGroup>
                        <Label for="mesaId" className={styles.label}>MESA ID</Label>
                        <Input name="mesaId" type="number" id="mesaId" placeholder="Digite o número da mesa" className={styles.input} required/>
                    </FormGroup>
                  
                    <FormGroup>
                        <Label for="nome" className={styles.label}>NOME</Label>
                        <Input name="nome" type="text" id="nome" placeholder="Digite seu nome" className={styles.input} required/>
                    </FormGroup>
                  
                    <FormGroup>
                        <Label for="email" className={styles.label}>EMAIL</Label>
                        <Input name="email" type="email" id="email" placeholder="Digite seu email" className={styles.input} required/>
                    </FormGroup>
                  
                    <Button outline className={styles.formBtn} type="submit">Entrar</Button>
                </Form>
                <ToastComponent color={toastColor} isOpen={toastIsOpen} message={toastMessage} />
            </Container>
        </main>
       </>
    )
}
export default ClienteLogin