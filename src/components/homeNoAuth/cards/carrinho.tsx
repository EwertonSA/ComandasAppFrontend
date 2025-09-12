import { Button, Container } from "reactstrap";
import styles from "../../../../styles/getStyles.module.scss";

export interface Produto {
  id: string;
  nome: string;
  preco: number;
  thumbnailUrl?: string;
}

export interface PedidoProduto {
  produto: Produto;
  quantidade: number;
}

export interface Pedido {
  id: string;
  pedidosProdutos?: PedidoProduto[];
  total: number;
  status: string;
}

interface CardProps {
  pedidos: Pedido[];
  tipo: "pendentes" | "entregues";
  cancelar: (pedido: Pedido) => void;
}

const CardLocal = ({ pedidos, tipo, cancelar }: CardProps) => {
  if (!pedidos || pedidos.length === 0) {
    return (
      <p className={styles.subtitle}>
        Nenhum pedido {tipo === "pendentes" ? "pendente" : "entregue"}
      </p>
    );
  }

  return (
    <Container className={styles.main}>
      {pedidos.map((pedido, pedidoIndex) => (
        <div key={`${pedido.id}-${pedidoIndex}`} className={styles.container}>
          <p className={styles.title}>Produtos:</p>
          <ul>
            {pedido.pedidosProdutos?.map((item, index) => {
              const defaultImage = "/images/default-thumbnail.jpg";
              const imageUrl = item.produto.thumbnailUrl
                ? `${process.env.NEXT_PUBLIC_BASEURL}/${item.produto.thumbnailUrl}`
                : defaultImage;

              return (
                <li key={`${item.produto.id}-${index}`}>
                  <img
                    src={imageUrl}
                    alt={item.produto.nome}
                    className={styles.slide}
                  />
                  <br />
                  {item.quantidade} x {item.produto.nome} - R$ {item.produto.preco}
                </li>
              );
            })}
          </ul>

          <p>
            <strong>ID:</strong> {pedido.id}
          </p>
          <p>
            <strong>Total:</strong> {pedido.total}
          </p>
          <p>
            <strong>Status:</strong> {pedido.status}
          </p>

          {tipo === "pendentes" ? (
            <Button color="danger" onClick={() => cancelar(pedido)}>
              Cancelar
            </Button>
          ) : (
            <Button disabled>Cancelar</Button>
          )}
        </div>
      ))}
    </Container>
  );
};

export default CardLocal;
