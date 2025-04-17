import HeaderGeneric from "@/src/components/common/headerGeneric";
import Head from "next/head";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "../../../../styles/register.module.scss";
import { FormEvent, useEffect, useState } from "react";
import pedidoService from "@/src/services/pedidoService";

import HeaderAuth from "@/src/components/common/headerAuth";
import { useRouter } from "next/router";
import produtService, { ProductType } from "@/src/services/productService";

const Pedidos = () => {
  const router = useRouter();

  const [suggestions, setSuggestions] = useState<ProductType[]>([]);
  const [produtoId, setProdutoId] = useState<string>("");
const [quantidade, setQuantidade] = useState<number>(1);

  const [entrada, setEntrada] = useState(""); 
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("");

  useEffect(() => {
    if (!router.isReady) return;

    if (router.query.registred?.toString() === "true") {
      setToastColor("bg-success");
      setToastOpen(true);
      setToastMessage("Cadastro bem sucedido");
      setEntrada("");
      setTimeout(() => setToastOpen(false), 3000);
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

      // 1. Separar nome e quantidade
      const [nome, qtdStr] = entrada.split("*");
      const quantidade = Number(qtdStr);

      if (!nome || isNaN(quantidade)) {
        alert("Entrada inválida. Use o formato 'nome*quantidade'");
        return;
      }

      // 2. Buscar produto pelo nome
      const res = await produtService.findByName(nome,1,1); // busca apenas 1
      const produto = res?.produtos?.[0];

      if (!produto) {
        alert("Produto não encontrado");
        return;
      }

      // 3. Enviar pedido com produto.id e quantidade
      const pedidoRes = await pedidoService.registerAll({
        total: 0,
        comandaId,
        produtoId: produto.id,
        quantidade
      });

      if (pedidoRes?.status === 200) {
        setToastColor("bg-success");
        setToastMessage("Produto cadastrado com sucesso!");
        setToastOpen(true);
        router.push("/clienteInfo");
      } else {
        alert("Erro ao cadastrar: " + pedidoRes?.message);
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
          <p className={styles.formTitle}>Fazer pedidos</p>

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
  <Label for="entrada" className={styles.label}>Produto*Quantidade:</Label>
  <Input
    id="entrada"
    type="text"
    placeholder="Ex: cafe*3"
    value={entrada}
    onChange={async (e) => {
      const value = e.target.value;
      setEntrada(value);

      const nome = value.split("*")[0];
      if (nome.length >= 2) {
        const result = await produtService.findByName(nome, 1, 5);
        setSuggestions(result.produtos);
      } else {
        setSuggestions([]);
      }
    }}
    autoComplete="off"
    className={styles.input}
  />

  {/* Lista de sugestões */}
  {suggestions.length > 0 && (
    <ul className={styles.suggestions}>
      {suggestions.map((produto) => (
        <li
          key={produto.id}
          onClick={() => {
            // Extrai a quantidade digitada (se tiver)
            const partes = entrada.split("*");
            const qtd = partes[1] ? Number(partes[1]) : 1;

            setProdutoId(produto.id.toString());
            setQuantidade(qtd);
            setEntrada(`${produto.nome}*${qtd}`);
            setSuggestions([]);
          }}
        >
          {produto.nome} - R$ {produto.preco}
        </li>
      ))}
    </ul>
  )}
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
