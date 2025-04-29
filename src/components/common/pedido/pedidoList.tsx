import { Button } from "reactstrap";
import styles from "../../../../styles/getStyles.module.scss"

interface Produto {
  id: number;
  nome: string;
  preco: number;
}

interface PedidoProduto {
  quantidade: number;
  produto: Produto;
}

interface Pedido {
  id: number;
  total: number;
  status: string;
  pedidosProdutos?: PedidoProduto[];
}

interface PedidosListProps {
  pedidos: Pedido[];
  tipo: "pendentes" | "entregues";
  onEntregar?: (pedido: Pedido) => void;
  onCancelar?: (pedido: Pedido) => void;
}

const PedidosList = ({ pedidos, tipo, onEntregar, onCancelar }: PedidosListProps) => {
  if (pedidos.length === 0) {
    return <p>Nenhum pedido {tipo === "pendentes" ? "pendente" : "entregue"}</p>;
  }

  return (
    <div className="d-flex flex-wrap justify-content-center align-items-center gap-2 mt-4">
      {pedidos.map((pedido) => (
        <div key={pedido.id} className={styles.container}>
          <p><strong>ID:</strong> {pedido.id}</p>
          <p><strong>Total:</strong> {pedido.total}</p>
          <p><strong>Status:</strong> {pedido.status}</p>
          <p className={styles.title}>Produtos:</p>
          <ul>
            {pedido.pedidosProdutos?.map((item) => (
              <li key={item.produto.id}>
                {item.quantidade} x {item.produto.nome} - R$ {item.produto.preco}
              </li>
            ))}
          </ul>

          {tipo === "pendentes" ? (
            <>
              <Button color="success" onClick={() => onEntregar?.(pedido)}>Entregar</Button>
              <Button color="danger" className="m-3" onClick={() => onCancelar?.(pedido)}>Cancelar pedido</Button>
            </>
          ) : (
            <Button color="success" disabled>Entregue</Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default PedidosList;
