import clienteService from "@/src/services/clienteService";
import useSWR from "swr";
import { Button, Container } from "reactstrap";
import Link from "next/link";
import styles from "../../../../../styles/getStyles.module.scss";
import { useRouter } from "next/router";

const ClienteInfo = () => {
  const router = useRouter();
  const { data, error } = useSWR("/clientes", () => clienteService.getClientesInfo());
  console.log("Clientes com Comandas: ", data);
  if (error) return <p>Erro ao carregar dados dos clientes.</p>;
  if (!data) return <p>Carregando...</p>;

  const handleNewOrder = (comandaId: number) => {

    router.push({
      pathname: "/pedidos",
      query: {
        comandaId: comandaId,
        registred: "true",
      },
    });
  };
 

  return (
    <div className={styles.div}>
      <div className={styles.main}>
      {data.map((cliente: any, index: number) => (
        <Container key={index} className={styles.container}>
          <div>
            <p><strong>Nome:</strong> {cliente.nome}</p>
            <p><strong>Telefone:</strong> {cliente.telefone}</p>
            <p><strong>Mesa ID:</strong> {cliente.mesaId}</p>
            

            {cliente.comandas ? (
              <>
                <p><strong>Comanda ID:</strong> {cliente.comandas.id}</p>
                <p><strong>Mesa:</strong> {cliente.comandas.mesaId}</p>
                <p><strong>Cliente:</strong> {cliente.comandas.clienteId}</p>
                <p><strong>Status:</strong>{cliente.comandas.status}</p>
                
              
                <Link href={`/comandas/${cliente.comandas.id}`} className={styles.btn}>
                  Ver produtos
                </Link>
              </>
            ) : (
              <p style={{ color: 'gray' }}>Sem comanda registrada</p>
            )}
            <div className="d-flex flex-column justiffy-content-center align-items-center">
            <Button outline className={styles.btn} onClick={() => handleNewOrder(cliente.comandas.id)}>Novo pedido</Button>
            <Link href={`/pagamentos?comandaId=${cliente.comandas.id}`}>
              <Button outline className={styles.btn2}> Pagamento </Button>
            </Link>
            </div>
            
          </div>
        </Container>
      ))}
    </div>
    </div>
  );
};

export default ClienteInfo;
