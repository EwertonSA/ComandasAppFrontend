import Head from "next/head";
import {
  Button,Container,Form,FormGroup,Input,Label,
} from "reactstrap";
import styles from "../../../../styles/register.module.scss";
import { FormEvent, useEffect, useState } from "react";
import clienteService from "@/src/services/clienteService";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();
  const [mesas, setMesas] = useState<any[]>([]);
  const [mesaSelecionada, setMesaSelecionada] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastColor, setToastColor] = useState("bg-success");

  useEffect(() => {
    const fetchMesas = async () => {
      const res = await clienteService.getMesas();
      if (Array.isArray(res)) {
        setMesas(res);
      } else {
        setToastColor("bg-danger");
        setToastIsOpen(true);
        setToastMessage("Erro ao carregar mesas.");
      }
    };
    fetchMesas();
  }, []);

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);

    const mesaId = mesaSelecionada;
    const nome = formData.get("nome")?.toString().trim() || "";
    const telefone = formData.get("telefone")?.toString().trim() || "";

    const { status, message, comandaId } = await clienteService.registrarTudo({
      mesaId,
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

  return (
    <>
      <Head>
        <title>Registro</title>
        <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
        <script src="https://jsuites.net/v4/jsuites.js"></script>
      </Head>
      <main>
        <Container py-5>
          <p className={styles.formTitle}>
            <strong>Bem vindo(a) ao cadastro</strong>
          </p>
          <Form className={styles.form} onSubmit={handleSubmit}>
            <p className={styles.subtitle}>
              <strong>Faça o registro</strong>
            </p>

            <FormGroup>
              <Label for="mesa" className={styles.label}>Escolha a Mesa</Label>
              <Input
                type="number"
                id="mesaId"
                name="mesaId"
                value={mesaSelecionada}
                onChange={(e) => setMesaSelecionada(e.target.value)}
                required
                className={styles.input}
              >
                <option value="">Selecione uma mesa</option>
                {mesas.map((mesa) => (
                  <option key={mesa.id} value={mesa.id}>
                    Mesa {mesa.numero} (Capacidade: {mesa.capacidade})
                  </option>
                ))}
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="nome" className={styles.label}>Nome</Label>
              <Input
                id="nome"
                name="nome"
                type="text"
                placeholder="Nome do cliente"
                required
                maxLength={20}
                className={styles.inputName}
              />
            </FormGroup>
            <FormGroup>
              <Label for="telefone" className={styles.label}>Telefone</Label>
              <Input
                id="telefone"
                name="telefone"
                type="tel"
                placeholder="+55 (xx) 11 9xxxx-xxxx"
                data-mask="[-]+55 (00) 00000-0000"
                className={styles.input}
              />
            </FormGroup>
            <Button type="submit" outline className={styles.formBtn}>
              Enviar
            </Button>
          </Form>
        </Container>
      </main>
    </>
  );
};

export default Register;
