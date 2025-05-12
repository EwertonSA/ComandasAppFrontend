import { comandaService } from "@/src/services/comandaService"
import { Container } from "reactstrap"
import useSWR from "swr"
import styles from "../../../../styles/getStyles.module.scss"
import PedidosList from "../../render/cards/pedidoList"
import { fetchPedidos } from "."
import { useMemo } from "react"
interface CardProps{
    id:string
}
const Card=({id}:CardProps)=>{
    const {data,error}=useSWR(id?`${id}`:null,()=>fetchPedidos(id))
  
  const pedidosEntregues = useMemo(() => {
  if (!Array.isArray(data)) return [];
  return data.filter(p => p.status.toLowerCase() === 'entregue');
}, [data]);

const totalDelivered = useMemo(() => {
  return pedidosEntregues.reduce((acc, pedido) => {
    return acc + Number(pedido.total || 0);
  }, 0).toFixed(2);
}, [pedidosEntregues]);
  if(!data) return <p> Loading...</p>
    if(error) return <p>Erro ao chamar!</p>
return(
    <>
      <p className={styles.title}>Pedidos da comanda #{id}</p>
    <Container className={styles.main}>
  
  {data.map((pedido) => (
        <div key={pedido.id} className={styles.container}>
          <p className={styles.title}>Produtos:</p>
          <ul>
            {pedido.pedidosProdutos?.map((item:any) => {
              const defaultImage = "/images/default-thumbnail.jpg";
              const imageUrl = item.produto.thumbnailUrl
                ? `${process.env.NEXT_PUBLIC_BASEURL}/${item.produto.thumbnailUrl}`
                : defaultImage;

              return (
                <div key={item.produto.id}>
                  <img src={imageUrl} alt={item.produto.nome}  className={styles.slide} /><br/>
                  {item.quantidade} x {item.produto.nome} - R$ {item.produto.preco}
                </div>
              );
            })}
          </ul>

          <p><strong>ID:</strong> {pedido.id}</p>
          <p><strong>Total:</strong> {pedido.total}</p>
          <p><strong>Status:</strong> {pedido.status}</p>

        
          
            
        </div>
      ))}
     
    </Container>
      <p className={styles.title}>Valor total entregue: R$ {totalDelivered}</p>
    </>
)
}
export default Card