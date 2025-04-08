import clienteService, { RegisterParams } from "@/src/services/clienteService";
import { Container } from "reactstrap";
import useSWR from "swr";

const Clientes = () => {
  const { data, error } = useSWR('/clientes', clienteService.getClientes);
  console.log("Dados recebidos:", data);
  if (error || data?.error) return <p>Erro ao retornar os clientes.</p>;
  if (!data || (Array.isArray(data) && data.length === 0)) return <p>Carregando...</p>;

  return (
    <>
      {data.map((cliente: RegisterParams, index: number) => (
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
