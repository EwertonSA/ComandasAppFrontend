import Head from "next/head"
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import styles from '../styles/register.module.scss'
import { FormEvent, useState } from "react"
import clienteService from "@/src/services/clienteService"
import { useRouter } from "next/router"
const Register=()=>{
    const router = useRouter();
  const [toastMessage, setToastMessage] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastColor, setToastColor] = useState("br-success");

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);

    const numero = Number(formData.get("numero"));
    const capacidade = Number(formData.get("capacidade"));
    const nome = formData.get("nome")?.toString().trim() || "";
    const telefone = formData.get("telefone")?.toString().trim() || "";

    const { status, message,comandaId } = await clienteService.registrarTudo({
      numero,
      capacidade,
      nome,
      telefone,
    });

    if (status === 200) {
      router.push(`/pedidos?comandaId=${comandaId}&registred=true`);
    } else {
      setToastColor("bg-danger");
      setToastIsOpen(true);
      setToastMessage(message || "Erro ao registrar dados.");
    }
  };

      
      
return<>
  <Head>
            <title>Registro</title>
            <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
            <script src="https://jsuites.net/v4/jsuites.js"></script>
        </Head>
        <main>
       <Container py-5>
       <p className={styles.formTitle}><strong >Bem vindo(a) ao cadastro</strong></p>
            <Form className={styles.form} onSubmit={handleSubmit}>
            <p  className={styles.subtitle}><strong>Faça o registro</strong></p>
            
                    <FormGroup>
                        <Label for='numero' className={styles.label}>Número</Label>
                        <Input id='numero'
                        name='numero'
                        type='tel'
                        placeholder='N° da mesa'
                       
                        className={styles.input}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='capacidade' className={styles.label}>Capacidade</Label>
                        <Input id='capacidade'
                        name='capacidade'
                        type='text'
                        placeholder='capacidade'
                        required
                        maxLength={20}
                        className={styles.inputName}/>
                    </FormGroup>
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
                    <Button type="submit" outline className={styles.formBtn}>Enviar</Button>
            </Form>
       </Container>
        </main>
</>
}
export default Register