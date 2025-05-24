import { Button } from "reactstrap";
import styles from "../../../../styles/getStyles.module.scss"

interface Produto {
  id: number;
  nome: string;
  preco: number;
  thumbnailUrl:string
}

interface PedidoProduto {
  quantidade: number;
  produto: Produto;
}

export interface Pedido {
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
    return <p className={styles.subtitle}>Nenhum pedido {tipo === "pendentes" ? "pendente" : "entregue"}</p>;
  }

  return (
    <div className="d-flex flex-wrap justify-content-center align-items-center gap-2 mt-4">
      {pedidos.map((pedido) => (
        <div key={pedido.id} className={styles.container}>
          <p className={styles.title}>Produtos:</p>
          <ul>  
            {pedido.pedidosProdutos?.map((item) => {
              const defaultImage = "/images/default-thumbnail.jpg";
              const imageUrl = item.produto.thumbnailUrl
                ? `${process.env.NEXT_PUBLIC_BASEURL}/${item.produto.thumbnailUrl}`
                : defaultImage;

              return (
                <div key={`${pedido.id}-${item.produto.id}`}>
                  <img src={imageUrl} alt={item.produto.nome}  className={styles.slide} /><br/>
                  {item.quantidade} x {item.produto.nome} - R$ {item.produto.preco}
                </div>
              );
            })}
          </ul>

          <p><strong>ID:</strong> {pedido.id}</p>
          <p><strong>Total:</strong> {pedido.total}</p>
          <p><strong>Status:</strong> {pedido.status}</p>

          {tipo === "pendentes" ? (
            <>
              <Button color="success" onClick={() => onEntregar?.(pedido)} className="mt-3">Entregar</Button>
              <Button color="danger" className="m-3" onClick={() => onCancelar?.(pedido)}>Cancelar pedido</Button>
            </>
          ) : (
            <Button color="success" disabled className="mt-3">Entregue</Button>
          )}
        </div>
      ))}
    </div>
  );
};


export default PedidosList;
