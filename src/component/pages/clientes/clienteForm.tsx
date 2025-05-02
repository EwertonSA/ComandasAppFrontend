import Head from "next/head";
import {Container} from "reactstrap";
import styles from "../../../../styles/register.module.scss";


import UseClienteForm from "../../hooks/clientes/useClienteForm";
import ToastComponent from "@/src/components/common/toast";
import ClienteForm from "../../render/forms/clienteForm";

const RegisterCliente = () => {
  const {
    mesas,
    mesaSelecionada,
    setMesaSelecionada,
    handleSubmit,
    toastMessage,
    toastIsOpen,
    toastColor,
  } = UseClienteForm();
  return (  
    <>
      <Head>
        <title>Registro</title>
        <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
        <script src="https://jsuites.net/v4/jsuites.js"></script>
      </Head>
      <main>
        <Container >
          <p className={styles.formTitle}>
            <strong>Bem vindo(a) ao cadastro</strong>
          </p>
       <ClienteForm handleSubmit={handleSubmit} mesaSelecionada={mesaSelecionada} mesas={mesas} setMesaSelecionada={setMesaSelecionada}/>
        </Container>
        <ToastComponent color="bg-danger" isOpen={true} message="evitar" />
      </main>
    </>
  );
};

export default RegisterCliente;
