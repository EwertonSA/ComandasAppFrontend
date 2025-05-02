import HeaderGeneric from "@/src/components/common/headerGeneric"
import Head from "next/head"
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import styles from "../../../../styles/register.module.scss"
import Footer from "@/src/components/common/footer"
import { FormEvent, useState } from "react"
import authService from "@/src/services/authService"
import { useRouter } from "next/router"
import ToastComponent from "@/src/components/common/toast"

const Register=()=>{
    const router=useRouter()
     const [toastMessage, setToastMessage] = useState("");
      const [toastIsOpen, setToastIsOpen] = useState(false);
      const [toastColor, setToastColor] = useState("bg-success");

    const handleLogin = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        const formData = new FormData(ev.currentTarget)
        const name = formData.get('name')?.toString() || ''
        const phone = formData.get('phone')?.toString() || ''
        const email = formData.get('email')?.toString() || ''
        const password = formData.get('password')?.toString() || ''
        const confirmPassword = formData.get('confirmPassword')?.toString() || ''
    
        if (!name || !phone || !email || !password || !confirmPassword) {
            alert("Preencha todos os campos")
            return
        }
    
        if (password != confirmPassword) {
            setToastColor("bg-success")
          setToastIsOpen(true)
          setTimeout(() => {
            setToastIsOpen(false)
            setToastMessage("Senha e confirmação diferentes")
          }, 1000);
            return
        }
        const params = { name, phone, email, password, role: 'user' as const }
        try {
            const response = await authService.register(params)
            console.log("Resposta do servidor:", response)
        
            if (response.status === 200 || response.status === 201) {
              router.push('/userLogin?registred=true')
            } else {
              throw new Error("Erro inesperado ao registrar.")
            }
          } catch (err: any) {
            console.error("Erro ao registrar:", err)
            setToastMessage("Erro ao cadastrar. Verifique os dados.")
            setToastColor("bg-danger")
            setToastIsOpen(true)
            setTimeout(() => setToastIsOpen(false), 3000)
          }
        }
    
    
    return(
        <>
  <Head>
  <title>Home</title>
  <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
  <script src="https://jsuites.net/v4/jsuites.js"></script>
  </Head>
<main className={styles.main}>
  
    <Container >
<p className={styles.formTitle}>Bem vindo ao serviço de comandas</p>
<Form onSubmit={handleLogin} className={styles.form}>
    <p className={styles.subtitle}><strong>Registre para acessar</strong></p>
    <FormGroup
    >
<Label for='name' className={styles.label}>NOME:</Label>
<Input name='name' type='text' id='name' placeholder="Qual o seu nome?" required maxLength={20} className={styles.input} />

    </FormGroup>
    <FormGroup
    >
<Label for='phone' className={styles.label}>TELEFONE:</Label>
<Input name='phone' 
type='tel' 
id='name' 
placeholder="(xx) 9xxxx-xxxx?"
 data-mask="[-]+55 (00) 00000-0000" 
 required 
 className={styles.input} />

    </FormGroup>
    <FormGroup
    >
<Label for='email' className={styles.label}>EMAIL:</Label>
<Input name='email' type='text' id='email' placeholder="Qual seu email (Min:6/ Max:20)" required minLength={6} maxLength={20} className={styles.input} />

    </FormGroup>
    <FormGroup
    >
<Label for='password' className={styles.label}>SENHA:</Label>
<Input name='password' type='password' id='' placeholder="Digite sua senha?" required maxLength={20} className={styles.input} />

    </FormGroup>
    <FormGroup
    >
<Label for='confirmPassword' className={styles.label}>CONFIRMAR SENHA:</Label>
<Input name='confirmPassword' type='password' id='confirmPassword' placeholder="Confirme sua senha?" required maxLength={20} className={styles.input} />

    </FormGroup>
    <Button outline className={styles.formBtn} type="submit">Enviar</Button>
</Form>
    </Container>
  
    <ToastComponent color="bg-danger" isOpen={toastIsOpen} message={toastMessage} />
</main>
        </>
    )
}
export default Register