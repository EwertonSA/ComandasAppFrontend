import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import clienteService from "@/src/services/clienteService";
import HeaderAuth from "@/src/components/common/headerAuth";
import styles from '../../styles/getStyles.module.scss'
import pedidoService from "@/src/services/pedidoService";
import { Button } from "reactstrap";
import Link from "next/link";
import Footer from "@/src/components/common/footer";

const Comanda = () => {
  const router = useRouter();
  const { id } = router.query;
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const res = await clienteService.getPedidosComanda(id as string);
        const details = await Promise.all(
          (res.pedidos || []).map(async (pedido: any) => {
            const detail = await pedidoService.getOrdersById(pedido.id);
            return { ...detail, id: pedido.id };
          })
        );
        setPedidos(details);
      } catch (error) {
        console.error(error);
        setError("Erro ao carregar pedido");
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchPedidos();
    }
  }, [id]);

  if (loading) return <p>Carregando pedidos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className={styles.div}>
        <HeaderAuth logoUrl="/clienteInfo" btnContent="Abas" />
        <p className={styles.title}>Pedidos da Comanda {id}</p>
        <div className='d-flex flex-wrap align-items-center justify-content-center'>
          {pedidos.length > 0 ? (
            pedidos.map((pedido: any) => (
              <div key={pedido.id} className={styles.container}>
                <p><strong>ID:</strong> {pedido.id}</p>
                <p><strong>Total:</strong> {pedido.total}</p>
                <p><strong>Status:</strong> {pedido.status}</p>

                <p className={styles.title}>Produtos:</p>
                <ul>
                  {pedido.pedidosProdutos?.map((item: any) => (
                    <li key={item.produto.id}>
                      {item.quantidade} x {item.produto.nome} - R$ {item.produto.preco}
                    </li>
                  ))}
                </ul>

                <Button
                  color={pedido.status.toLowerCase() === "entregue" ? "success" : "warning"}
                  onClick={async () => {
                    if (pedido.status.toLowerCase() === "pendente") {
                      try {
                        await pedidoService.updateStatus(pedido.id, "entregue");
                        // Atualiza o status localmente sem recarregar a página
                        setPedidos((prev) =>
                          prev.map((p) =>
                            p.id === pedido.id ? { ...p, status: "entregue" } : p
                          )
                        );
                      } catch (err) {
                        console.error("Erro ao atualizar status:", err);
                      }
                    }
                  }}
                  disabled={pedido.status.toLowerCase() === "entregue"}
                >
                  {pedido.status.toLowerCase() === "entregue" ? "Entregue" : "Não Entregue"}
                </Button>
              </div>
            ))
          ) : (
            <p>Não há pedidos nessa comanda.</p>
          )}
        </div>
        <Link href={`/pagamentos?comandaId=${id}`} className={styles.btn}>
          <Button>Pagamento</Button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Comanda;
