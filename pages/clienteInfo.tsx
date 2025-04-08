import clienteService from "@/src/services/clienteService";
import useSWR from "swr";
import { Container } from "reactstrap";

const ClienteInfo = () => {
  const { data, error } = useSWR("/clientes", () => clienteService.getClientesInfo());

  if (error) return <p>Erro ao carregar dados dos clientes.</p>;
  if (!data) return <p>Carregando...</p>;

  return (
    <>
      {data.map((cliente: any, index: number) => (
        <Container key={index}>
          <div style={{ color: "white", borderBottom: "1px solid gray", marginBottom: "1rem" }}>
            <p><strong>Nome:</strong> {cliente.nome}</p>
            <p><strong>Telefone:</strong> {cliente.telefone}</p>
            <p><strong>Mesa ID:</strong> {cliente.mesaId}</p>

            {cliente.comandas ? (
              <>
                <p><strong>Comanda ID:</strong> {cliente.comandas.id}</p>
                <p><strong>Mesa (comanda):</strong> {cliente.comandas.mesaId}</p>
                <p><strong>Cliente (comanda):</strong> {cliente.comandas.clienteId}</p>
              </>
            ) : (
              <p style={{ color: 'gray' }}>Sem comanda registrada</p>
            )}
          </div>
        </Container>
      ))}
    </>
  );
};

export default ClienteInfo;
