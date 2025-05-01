
import { getClientes } from "@/src/component/hooks/clientes/useClientes";
import clienteService, { RegisterParams } from "@/src/services/clienteService";
import { Container } from "reactstrap";
import useSWR from "swr";

const Clientes = () => {
  const { clientes, error } = getClientes()

  if (error || clientes?.error) return <p>Erro ao retornar os clientes.</p>;
  if (!clientes || (Array.isArray(clientes) && clientes.length === 0)) return <p>Carregando...</p>;

  return (
    <>
      {clientes.map((cliente: RegisterParams, index: number) => (
        <Container>
        <div key={index} style={{ color: "white", borderBottom: "1px solid gray", marginBottom: "1rem" }}>
          <p><strong>Nome:</strong> {cliente.nome}</p>
          <p><strong>Telefone:</strong> {cliente.telefone}</p>
          <p><strong>Mesa ID:</strong> {cliente.mesaId}</p>
        </div>
        </Container>

      ))}
    </>
  );
};

export default Clientes;
