import pedidoService from "@/src/services/pedidoService"
import { Container } from "reactstrap";
import useSWR from "swr"
import styles from "../../../../styles/getStyles.module.scss"

const Orders=()=>{
    const {data,error}=useSWR('/pedidos',pedidoService.getPedidos)
    
  console.log("DATA:", data);
  console.log("ERROR:", error);

    if(!data) return <p>Loading...</p>
    if(error)return <p>Erro</p>
return(
    <>
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
<Container className={styles.main}>
    
    {Array.isArray(data) && data.map((pedido:any)=>(
       pedido.pedidosProdutos.map((item:any)=>{
        const defaultImage = "/images/default-thumbnail.jpg";
              const imageUrl = item.produto.thumbnailUrl
                ? `${process.env.NEXT_PUBLIC_BASEURL}/${item.produto.thumbnailUrl}`
                : defaultImage;
                return( 
        <div key={item.id}  className={styles.container}>

            <img src={imageUrl} alt="" className={styles.slideImg}/>
            <p>{pedido.id}</p>
            <p>{pedido.comandaId}</p>
            <p>{pedido.status}</p>
          
            <p>{item.produto.nome}</p>
            <p>{item.produto.quantidade}</p>
            <p>{Number(item.produto.preco).toFixed(2)}</p>
        </div>
       )})
    ))}
</Container>
    </>
)
}
export default Orders
