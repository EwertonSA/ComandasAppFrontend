import { Button, Container } from "reactstrap";
import { Pedido } from "./pedidoList"
import styles from "../../../../styles/getStyles.module.scss"
import Link from "next/link";
interface CardProps{
    pedidos:Pedido[],
    tipo: "pendentes" | "entregues";
   
    cancelar:(pedido:Pedido)=>void
}

const CardLocal=({pedidos,tipo,cancelar}:CardProps )=>{
    
  if (pedidos.length === 0) {
    return <p className={styles.subtitle}>Nenhum pedido {tipo === "pendentes" ? "pendente" : "entregue"}</p>;
  }
return(
    <>
   
    <Container className={styles.main}>
  
  {
  pedidos.map((pedido:any) => (
        <div key={pedido.id} className={styles.container}>
          <p className={styles.title}>Produtos:</p>
          <ul>
            {pedido.pedidosProdutos?.map((item:any,index:any) => {
              const defaultImage = "/images/default-thumbnail.jpg";
              const imageUrl = item.produto.thumbnailUrl
                ? `${process.env.NEXT_PUBLIC_BASEURL}/${item.produto.thumbnailUrl}`
                : defaultImage;

              return (
                <div key={`${item.produto.id}-${index}`}>
                  <img src={imageUrl} alt={item.produto.nome}  className={styles.slide} /><br/>
                  {item.quantidade} x {item.produto.nome} - R$ {item.produto.preco}
                </div>
              );
            })}
          </ul>

          <p><strong>ID:</strong> {pedido.id}</p>
          <p><strong>Total:</strong> {pedido.total}</p>
          <p><strong>Status:</strong> {pedido.status}</p>
         
                  {tipo === 'pendentes'? (<Button color="danger" onClick={()=>cancelar?.(pedido)}>Cancelar</Button>):(<Button disabled>Cancelar</Button>)}  
        
          
            
        </div>
      ))}
     
    </Container>
 
    </>
)
}
export default CardLocal