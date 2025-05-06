import HeaderGeneric from "@/src/components/common/headerGeneric";
import Head from "next/head";
import { FormEvent, useEffect, useState } from "react";
import styles from "../../../../styles/register.module.scss";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import ToastComponent from "@/src/components/common/toast";
import authService from "@/src/services/authService";

const ClienteLogin = () => {
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastColor, setToastColor] = useState("bg-success");

  useEffect(() => {
    const registerSuccess = router.query.registred;
    if (registerSuccess === "true") {
      setToastMessage("Criado com sucesso!");
      setToastColor("bg-success");
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000);
    }
  }, [router.query]);

  const handleLogin = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);

    const name = formData.get("name")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const phone = formData.get("phone")?.toString() || "";

    const params = { name, email, phone, role: "cliente" as const };

    try {
      const res = await authService.clienteRegistro(params);
      if (res.status === 200 || res.status === 201) {
        router.push("/homeNoAuth");
      } else {
        throw new Error(res.error || "Erro ao registrar cliente.");
      }
    } catch (err: any) {
      setToastMessage(err.message || "Erro desconhecido");
      setToastColor("bg-danger");
      setToastIsOpen(true);
    }
  };

  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
      </Head>

      <main className={styles.main}>
        <Container className="py-5">
          <p className={styles.formTitle}>Bem-vindo(a) de volta</p>
          <Form className={styles.form} onSubmit={handleLogin}>
            <p><strong>Bem-vindo ao serviço de comandas</strong></p>

            <FormGroup>
              <Label for="name" className={styles.label}>Nome</Label>
              <Input name="name" type="text" id="name" placeholder="Digite seu nome" className={styles.input} required />
            </FormGroup>

            <FormGroup>
              <Label for="email" className={styles.label}>Email</Label>
              <Input name="email" type="email" id="email" placeholder="Digite seu email" className={styles.input} required />
            </FormGroup>

            <FormGroup>
              <Label for="phone" className={styles.label}>Telefone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+55 (xx) 9xxxx-xxxx"
                className={styles.input}
                required
              />
            </FormGroup>

            <Button outline className={styles.formBtn} type="submit">Entrar</Button>
          </Form>

          <ToastComponent color={toastColor} isOpen={toastIsOpen} message={toastMessage} />
        </Container>
      </main>
    </>
  );
};

export default ClienteLogin;
