import clienteService from "@/src/services/clienteService";
import useSWR from "swr";
import { Button, Container } from "reactstrap";
import Link from "next/link";
import styles from "../../../../../styles/getStyles.module.scss";
import { useRouter } from "next/router";

const ClienteInfo = () => {
  const router = useRouter();
  const { data, error } = useSWR("/clientes", () => clienteService.getClientesInfo());

  if (error) return <p>Erro ao carregar dados dos clientes.</p>;
  if (!data) return <p>Carregando...</p>;

  const handleNewOrder = (comandaId: number) => {
    // Alteração no redirecionamento para incluir o comandaId corretamente na URL
    router.push({
      pathname: "/pedidos",
      query: {
        comandaId: comandaId,
        registred: "true",
      },
    });
  };

  return (
    <div className="d-flex flex-wrap justify-content-center">
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
                
              
                <Link href={`/comandas/${cliente.comandas.id}`}>
                  <Button>Ver Pedidos</Button>
                </Link>
              </>
            ) : (
              <p style={{ color: 'gray' }}>Sem comanda registrada</p>
            )}

            <Button onClick={() => handleNewOrder(cliente.comandas.id)}>
              Novo pedido
            </Button>

            <Link href={`/pagamentos?comandaId=${cliente.comandas.id}`}>
              <Button>Pagamento</Button>
            </Link>
          </div>
        </Container>
      ))}
    </div>
  );
};

export default ClienteInfo;
