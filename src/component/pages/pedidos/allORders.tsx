import pedidoService from "@/src/services/pedidoService"
import { Container } from "reactstrap";
import useSWR from "swr"
import styles from "../../../../styles/getStyles.module.scss"
import { useState } from "react";

const Orders=()=>{
  const [page,setPage]=useState(1)
  const perPage=10
    const {data,error}=useSWR(`/pedidos?page=${page}&perPage=${perPage}`,pedidoService.getPedidos)
    
  console.log("DATA:", data);
  console.log("ERROR:", error);

    if(!data) return <p>Loading...</p>
    if(error)return <p>Erro</p>
    
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
    {Array.isArray(data) && data.map((pedido: any) =>
      pedido.pedidosProdutos.map((item: any, index: number) => {
          const defaultImage = "/images/default-thumbnail.jpg";
              const imageUrl = item.produto.thumbnailUrl
                ? `${process.env.NEXT_PUBLIC_BASEURL}/${item.produto.thumbnailUrl}`
                : defaultImage;
                return(
        <tr key={item.id}>
          {/* Só mostra os dados do pedido na primeira linha dos produtos */}
            <td className={styles.rowImg}><img    
              src={imageUrl}
              alt={item.produto.nome}
             className={styles.Img}
            /></td>
         
          <td className={styles.row}>{ pedido.comandaId }</td>
          <td className={styles.row}>{pedido.status}</td>
          <td className={styles.row}>
          
            {item.produto.nome}
          </td>
          <td className={styles.row}>{item.quantidade}</td>
          <td className={styles.row}>R$ {Number(item.produto.preco).toFixed(2)}</td>
          <td className={styles.row}>{index === 0 ? `R$ ${Number(pedido.total).toFixed(2)}` : ""}</td>
        </tr>
      )})
    )}
  </tbody>
</table>

    </main>
)
}
export default Orders
