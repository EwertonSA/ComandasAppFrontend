import pedidoService from "@/src/services/pedidoService"
import { Button, Container } from "reactstrap";
import useSWR from "swr"
import styles from "../../../../styles/getStyles.module.scss"
import { useState } from "react";

const Orders=()=>{
  const [page,setPage]=useState(1)
  const perPage=10
 const { data, error } = useSWR(`/pedidos?page=${page}&perPage=${perPage}`, () => pedidoService.getPedidos(page, perPage));

  console.log("DATA:", data);
  console.log("ERROR:", error);

    if(!data) return <p>Loading...</p>
    if(error)return <p>Erro</p>
    const {pedidos,total}=data
    const totalPages=Math.ceil(total/perPage)
    
return(
    <main className={styles.main3}> 
    <p className={styles.title}>Pedidos:</p>
<table className={styles.table}>
  <thead>
    <tr>
        <th className={styles.row}>Img</th>
      <th className={styles.row}>Comanda</th>
      <th className={styles.row}>Status</th>
      <th className={styles.row}>Produto</th>
      <th className={styles.row}>Qtd</th>
      <th className={styles.row}>Preço Unitário (R$)</th>
      <th className={styles.row}>Total Pedido (R$)</th>
    </tr>
  </thead>
  <tbody>
 {Array.isArray(data?.pedidos) && data.pedidos.map((pedido: any) =>
  Array.isArray(pedido.produtos)&&pedido.produtos.map((produto: any, index: number) => {
    const defaultImage = "/images/default-thumbnail.jpg";
    const imageUrl = produto.thumbnailUrl
      ? `${process.env.NEXT_PUBLIC_BASEURL}/${produto.thumbnailUrl}`
      : defaultImage;
    return (
      <tr key={`${pedido.id}-${produto.id}-${index}`}>
        <td className={styles.rowImg}>
          <img src={imageUrl} alt={produto.nome} className={styles.Img} />
        </td>
        <td className={styles.row}>{pedido.comandaId}</td>
        <td className={styles.row}>{pedido.status}</td>
        <td className={styles.row}>{produto.nome}</td>
        <td className={styles.row}>{produto.pedidos_produtos.quantidade}</td>
        <td className={styles.row}>R$ {Number(produto.preco).toFixed(2)}</td>
        <td className={styles.row}>
          {index === 0 ? `R$ ${Number(pedido.total).toFixed(2)}` : ""}
        </td>
      </tr>
    );
  })
)}

  </tbody>
</table>
 <div className={styles.main}>
        <Button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Anterior
        </Button>
        <span className={styles.pageInfo}>
          Página {page} de {totalPages}
        </span>
        <Button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          Próxima
        </Button>
      </div>

    </main>
)
}
export default Orders
