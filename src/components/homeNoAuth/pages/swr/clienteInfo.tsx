import clienteService from "@/src/services/clienteService";
import useSWR from "swr";
import { Button, Container } from "reactstrap";
import Link from "next/link";
import styles from "../../../../../styles/getStyles.module.scss";
import { useRouter } from "next/router";
import { useState } from "react";


const ClienteInfo = () => {
  const router = useRouter();
  const { data, error } = useSWR("/clientes", () => clienteService.getClientesInfo());
  const [abaAtiva,setAbaAtiva]=useState<'andamento' | 'paga'>('andamento')

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
 const clientesFiltrados=data.filter((cliente:any)=>{
  const status=typeof cliente.comandas?.status === "string"
  ? cliente.comandas?.status?.toLowerCase():""
  if(!cliente.comandas)  return abaAtiva === 'andamento'
  return abaAtiva === 'andamento' ? status !== 'pago':status === 'pago'
 })

  return (
    <div className={styles.div}>
    <div>
      <div className='d-flex justify-content-center'>
        <Button className={styles.btn}
          color={abaAtiva === 'andamento' ? 'primary' : 'secondary'}
          onClick={() => setAbaAtiva('andamento')}
        >
         Em andamento
        </Button>
        <Button className={styles.btn}
          color={abaAtiva === 'paga' ? 'primary' : 'secondary'}
          onClick={() => setAbaAtiva('paga')}
        >
          Comandas pagas
        </Button>
      </div>
  
      <div className={styles.main}>
        {clientesFiltrados.map((cliente: any, index: number) => (
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
                  <p><strong>Status:</strong> {cliente.comandas.status}</p>
  
                  <Link href={`/comandas/${cliente.comandas.id}`} className={styles.btn}>
                    Ver produtos
                  </Link>
                </>
              ) : (
                <p style={{ color: 'gray' }}>Sem comanda registrada</p>
              )}
  
              <div className="d-flex flex-column justify-content-center align-items-center">
                <Button
                  outline
                  className={styles.btn}
                  onClick={() => handleNewOrder(cliente.comandas.id)}
                >
                  Novo pedido
                </Button>
              </div>
            </div>
          </Container>
        ))}
      </div>
    </div>
  </div>
  
  );
};

export default ClienteInfo;
