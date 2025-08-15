'use client'

import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import styles from "../../../styles/register.module.scss"
import { LoginAction } from "./action"
import Link from "next/link"
import { FACEBOOK_AUTH_URL} from  "./Oauth";
import FacebookButton from "./faceBtn"


const FormLogin=()=>{
      const handleLogin = () => {
    window.location.href = "https://esadev.com.br/api/auth/linkedin/callback/";
  };
const handleLoginGoogle = () => {
  window.location.href = 'https://esadev.com.br/api/auth/google';
};

return(
  <main className={styles.main}>
           
            <Container className="py-5">
                <p className={styles.formTitle}> Bem vindo(a) de volta</p>
                <Form className={styles.form} action={LoginAction}>
                    <p><strong>Bem vindo ao serviço de comandas</strong></p>
                    <FormGroup>
                        <Label for="email" className={styles.label}>EMAIL</Label>
                        <Input name="email" type="email" id="email" placeholder="Digite seu email" className={styles.input} required/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='password' className={styles.label}>SENHA:</Label>
                        <Input name='password' type='password' id='' placeholder="Digite sua senha?" required maxLength={20} className={styles.input} />
                    </FormGroup>
                    <FormGroup>
                        <Link href={FACEBOOK_AUTH_URL}><FacebookButton/></Link>
                        <Button onClick={handleLogin}>Login com LinkedIn</Button>
                         <Button onClick={handleLoginGoogle}>Login com google</Button>
                    </FormGroup>
                    <Button outline className={styles.formBtn} type="submit">Entrar</Button>
                </Form>
              
            </Container>
        </main>
)
}
export default FormLogin