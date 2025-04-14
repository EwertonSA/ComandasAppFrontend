import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import clienteService from "@/src/services/clienteService";
import HeaderAuth from "@/src/components/common/headerAuth";
import styles from '../../styles/getStyles.module.scss'

const Comanda = () => {
  const router = useRouter();
  const { id } = router.query; // Pegando o comandaId da URL
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      // Requisitando os pedidos da comanda através da API
      clienteService.getPedidosComanda(id as string)
        .then((data) => {
          setPedidos(data.pedidos || []);
          setLoading(false);
        })
        .catch((err) => {
          setError("Erro ao carregar pedidos.");
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <p>Carregando pedidos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <HeaderAuth logoUrl="/clienteInfo" btnContent="Clientes"/>
      <h1>Pedidos da Comanda {id}</h1>
      <div  className={styles.container}>
      {pedidos.length > 0 ? (
        <ul>
          {pedidos.map((pedido) => (
            <li key={pedido.id}>
              <p><strong>ID:</strong> {pedido.id}</p>
              <p><strong>Total:</strong> {pedido.total}</p>
              <p><strong>Status:</strong> {pedido.status}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Não há pedidos para essa comanda.</p>
      )}
      </div>
    </div>
  );
};

export default Comanda;
