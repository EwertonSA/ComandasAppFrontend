import clienteService from "@/src/services/clienteService";
import useSWR from "swr";
import { Button, Container } from "reactstrap";
import Link from "next/link";

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
                <p><strong>Mesa:</strong> {cliente.comandas.mesaId}</p>
                <p><strong>Cliente:</strong> {cliente.comandas.clienteId}</p>
                <div>
                    <p><strong>Pedidos:</strong></p>
                    {cliente.comandas?.pedidos?.length > 0 ? (
  cliente.comandas.pedidos.map((pedido: any) => (
    <div key={pedido.id}>
      <p>
        🍽️ Pedido #{pedido.id} - Status: {pedido.status} - Total: R${" "}
        {Number(pedido.total || 0).toFixed(2)}
      </p>
    
    </div>
  ))
) : (
  <p style={{ color: 'gray' }}>Nenhum pedido registrado</p>
)}
                </div>
                
              </>
            ) : (
              <p style={{ color: 'gray' }}>Sem comanda registrada</p>
            )}
          </div>
          <Link href={`/pagamentos?id=${cliente.comandas.id}`}>
<Button>
          Pagamento  
          </Button></Link>
        </Container>
      ))}
    </>
  );
};

export default ClienteInfo;
