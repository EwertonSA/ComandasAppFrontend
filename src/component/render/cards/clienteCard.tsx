import { Button, Container } from "reactstrap";
import Link from "next/link";
import styles from "../../../../styles/getStyles.module.scss"
import { useRouter } from "next/router";

interface ClienteCardProps {
  cliente: any;
}

const ClienteCard = ({ cliente }: ClienteCardProps) => {
  const router = useRouter();

  const handleNewOrder = (comandaId: number) => {
    router.push({
      pathname: "/pedidos",
      query: {
        comandaId,
        registred: "true",
      },
    });
  };

  return (
    <Container className={styles.container}>
      <div>
       
        {cliente.comandas ? (
          <div key={cliente.comandas.id}>
            <p className={styles.title}><strong>Comanda ID:</strong> {cliente.comandas.id}</p>
            <p><strong>Mesa:</strong> {cliente.comandas.mesaId}</p>
            <p><strong>Cliente:</strong> {cliente.comandas.clienteId}</p>
            <p><strong>Status:</strong> {cliente.comandas.status}</p>
            <p><strong>Nome:</strong> {cliente.nome}</p>
        <p><strong>Telefone:</strong> {cliente.telefone}</p>
        <p><strong>Mesa ID:</strong> {cliente.mesaId}</p>

            <Link href={`/comandas/${cliente.comandas.id}`} className={styles.btn}>
              Ver produtos
            </Link>
          </div>
        ) : (
          <p style={{ color: "gray" }}>Sem comanda registrada</p>
        )}

        <div className="d-flex flex-column justify-content-center align-items-center">
          <Button
            outline
            className={styles.btn}
            onClick={() => handleNewOrder(cliente.comandas?.id)}
          >
            Novo pedido
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default ClienteCard;
