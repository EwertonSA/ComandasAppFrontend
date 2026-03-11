'use client';
import { Button, Form } from "reactstrap";
import styles from "../../../../styles/getStyles.module.scss";

import updateOrder from "@/app/employeeApp/comandas/[id]/serverToken";
import { cancelOrder } from "./deleteAction";

interface PedidoProdutoIngredient {
  id: number;
  include: boolean;
  ingredient: {
    id: number;
    name: string;
  };
}

interface Produto {
  id: number;
  nome: string;
  preco: number;
  thumbnailUrl: string;
}

interface PedidoProduto {
  id: number;
  quantidade: number;
  produto: Produto;
  pedidosProdutosIngredients: PedidoProdutoIngredient[];
}

export interface Pedido {
  id: number;
  total: number;
  status: string;
  pedidosProdutos: PedidoProduto[];
}

interface PedidosListProps {
  pedidos: Pedido[];
  tipo: "pendentes" | "entregues";
  onCancelar: (pedido: Pedido) => void;
  comandaId: string;
}

const PedidosList = ({ pedidos, tipo, onCancelar, comandaId }: PedidosListProps) => {
  if (pedidos.length === 0) {
    return (
      <p className={styles.subtitle}>
        Nenhum pedido {tipo === "pendentes" ? "pendente" : "entregue"}
      </p>
    );
  }


  return (
    <div className="d-flex flex-wrap justify-content-center align-items-center gap-2 m-3">
      {pedidos.map((pedido) => {
 


        return (
          <div key={pedido.id} className={styles.container2}>
           

            <p className={styles.title}>Produtos:</p>
            <ul>
              {pedido.pedidosProdutos?.map((item) => {
            

                const imageUrl = item.produto?.thumbnailUrl
                  ? `${process.env.NEXT_PUBLIC_BASEURL}/${item.produto.thumbnailUrl}`
                  : "/images/default-thumbnail.jpg";

                const ingredientesIncluidos =
                  item.pedidosProdutosIngredients?.filter((ing) => ing.include)
                    ?.map((ing) => ing.ingredient?.name)
                    ?.join(", ") || "Nenhum ingrediente";


                return (
                  <li key={item.id} style={{ marginBottom: "1rem" }}>
                    <img
                      src={imageUrl}
                      alt={item.produto?.nome}
                      className={styles.slide}
                      style={{ maxWidth: "120px", borderRadius: "10px" }}
                    />
                     <p><strong>ID:</strong> {pedido.id}</p>
            
            <p><strong>Status:</strong> {pedido.status}</p>
                    <p>
                      
                      <strong>Produto:</strong> {item.produto?.nome} <br />
                       <strong>Quantidade:</strong> {item.quantidade}
                      <strong>Preço:</strong> R$ {item.produto?.preco} <br />
                     
                      <p><strong>Total:</strong> R$ {pedido.total}</p>
                    </p>

                    {ingredientesIncluidos && (
                      <p>
                        <strong>Ingredientes escolhidos:</strong> {ingredientesIncluidos}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>

            {tipo === "pendentes" ? (
              <>
                <Form action={updateOrder}>
                  <input type="hidden" name="id" value={pedido.id} />
                  <input type="hidden" name="status" value="entregue" />
                  <input type="hidden" name="comandaId" value={comandaId} />
                  <Button type="submit" color="success" className="mt-3">
                    Entregar
                  </Button>
                </Form>

                <Form action={cancelOrder}>
                  <input type="hidden" name="id" value={pedido.id} />
                  <input type="hidden" name="status" value="cancelado" />
                  <input type="hidden" name="comandaId" value={comandaId} />
                  <Button type="submit" color="danger" className="m-3">
                    Cancelar pedido
                  </Button>
                </Form>
              </>
            ) : (
              <Button color="success" disabled className="mt-3">
                Entregue
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PedidosList;
