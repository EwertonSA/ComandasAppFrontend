import HeaderGeneric from "@/src/components/common/headerGeneric";
import Head from "next/head";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "../../../../styles/register.module.scss";
import { FormEvent, useEffect, useState } from "react";
import pedidoService from "@/src/services/pedidoService";
import { useRouter } from "next/router";
import HeaderAuth from "@/src/components/common/headerAuth";

const Pedidos = () => {
  const router = useRouter();

  // estados do formulário
  const [produtoId, setProdutoId] = useState("");

  const [quantidade, setQuantidade] = useState<number | "">("");

  // estados para feedback
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("");

  useEffect(() => {
    if (!router.isReady) return;

    if (router.query.registred?.toString() === "true") {
      setToastColor("bg-success");
      setToastOpen(true);
      setToastMessage("Cadastro bem sucedido");

      setTimeout(() => {
        setToastOpen(false);
      }, 3000);
    }
  }, [router.query]);

  const handleOrders = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    try {
      if (!router.isReady) {
        alert("Aguarde o carregamento da página");
        return;
      }

      const comandaId = router.query.comandaId?.toString();
      if (!comandaId) {
        alert("Comanda inexistente");
        return;
      }

      const res = await pedidoService.registerAll({
        total:0,
        comandaId,
        quantidade: Number(quantidade),
        produtoId
      });

      if (res?.status === 200) {
        setToastColor("bg-success");
        setToastMessage("Produto cadastrado com sucesso!");
        setToastOpen(true);

          router.push('/clienteInfo')
       
      } else {
        alert("Erro: " + res?.message);
      }
    } catch (err) {
      console.error("Erro capturado no handleOrders:", err);
      alert("Erro inesperado ao enviar o pedido.");
    }
  };

  return (
    <>
      <Head>
        <title>Realizar pedidos</title>
        <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
      </Head>
      <main>
        <Container className="py-5">
          <p className={styles.FormTitle}>Fazer pedidos</p>

          {toastOpen && (
            <div className={`text-white p-2 rounded ${toastColor}`}>
              {toastMessage}
            </div>
          )}

          <Form className={styles.form} onSubmit={handleOrders}>
            <p className="text-center">
              <strong>Pedido</strong>
            </p>

            <FormGroup>
              <Label for="produtoId" className={styles.label}>
                Produto ID
              </Label>
            <Input id="produtoId" name="produtoId" type="number" className={styles.input} required placeholder="pedidoId" value={produtoId} onChange={(ev)=>setProdutoId(ev.target.value)}/>
            </FormGroup>


            <FormGroup>
              <Label for="quantidade" className={styles.label}>
                Quantidade
              </Label>
              <Input
                name="quantidade"
                id="quantidade"
                type="number"
                placeholder="quantidade"
                required
                className={styles.input}
                value={quantidade}
                onChange={(e) => setQuantidade(Number(e.target.value))}
              />
            </FormGroup>

            <Button outline className={styles.formBtn} type="submit">
              Cadastrar
            </Button>
          </Form>
        </Container>
      </main>
    </>
  );
};

export default Pedidos;
