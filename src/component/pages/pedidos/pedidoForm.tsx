import Head from "next/head";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "../../../../styles/register.module.scss";
import { usePedidosForm } from "../../hooks/pedidos/usePedidoForm";


const Pedidos = () => {
  const {
    entrada,
    setEntrada,
    suggestions,
    toastOpen,
    toastColor,
    toastMessage,
    handleOrders,
    handleEntradaChange,
    handleSuggestionClick
  } = usePedidosForm();

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
            <p className="text-center"><strong>Pedido</strong></p>

            <FormGroup>
              <Label for="entrada" className={styles.label}>
                Produto*Quantidade:
              </Label>
              <Input
                id="entrada"
                type="text"
                placeholder="Ex: cerveja*3"
                value={entrada}
                onChange={(e) => handleEntradaChange(e.target.value)}
                autoComplete="off"
                className={styles.input}
              />

              {suggestions.length > 0 && (
                <ul className={styles.suggestions}>
                  {suggestions.map((produto) => (
                    <li key={produto.id} onClick={() => handleSuggestionClick(produto)}>
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
