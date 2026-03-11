import { Button, Form } from "reactstrap"
import styles from "../../../../styles/getStyles.module.scss"
import updateOrder from "./serverToken"
import { cancelOrder } from "./deleteAction"
interface PediddosProdutosIngredients{
    id:number,
    include:boolean,
    ingredient:{
        
id:number,
name:string
    }
}
interface Produto{
    id:number,
    nome:string,
    preco:number,
    thumbnailUrl:string
   
}
interface PedidoProduto{
    id:number,
    quantidade:number,
    produto:Produto,
     pedidosProdutosIngredients:PediddosProdutosIngredients[]
}
interface Pedido{
    id:number,
    total:number,
    status:string,
    pedidosProdutos:PedidoProduto[]
}
interface OrdersListProps{
comandaId:string
pedidos:Pedido[],
tipo:'pendentes'|'entregues'
onCancelar:(pedido:Pedido)=>void
}
const OrdersList=({comandaId,pedidos,tipo,onCancelar}:OrdersListProps)=>{
if(pedidos.length === 0){
   return( <p className={styles.title}>Nenhum registro encontrado</p>
)}
return(
    <div className="d-flex flex-wrap justify-content-center align-items-center m-3 gap-2">
{pedidos.map((pedido)=>{
    return(
        <div key={pedido.id} className={styles.container2}>
            <p><strong>Produtos:</strong></p>
            <ul>
                {pedido.pedidosProdutos.map((item)=>{
                    const imgUrl=item.produto.thumbnailUrl?
                    `${process.env.NEXT_PUBLIC_BASEURL}/${item.produto.thumbnailUrl}`:"Nenhum registro encontrado";
                    const includedIngredients= item.pedidosProdutosIngredients.filter((ingredient)=>ingredient.include).map((ingredients)=>ingredients.ingredient.name).join(', ');

                    return(
                        <li key={item.id}>
                            <img src={imgUrl} alt={item.produto.thumbnailUrl} className={styles.slide} style={{borderRadius:'10px'}}/>
                            <p><strong>Status:</strong> {pedido.status}</p>
                            <p><strong>Produto:</strong> {item.produto.nome}</p>
                            <p><strong>Preço:</strong> {item.produto.preco}</p>
                            <p><strong>Quantidade:</strong> {item.quantidade}</p>
                            <p><strong>Total:</strong> {pedido.total}</p>
                            {includedIngredients&&(
                                <p><strong>Ingredientes:</strong> {includedIngredients}</p>
                            )}

                        </li>
                    )

                })}
            </ul>
            {tipo === "pendentes"?(
                <>
                <Form action={updateOrder}>
                    <input type="hidden" name="id" value={pedido.id} />
                    <input type="hidden" name="status" value='entregue'/>
                    <input type="hidden" name="comandaId" value={comandaId}/>
                    <Button type="submit" color="success" >Entregar</Button>
                </Form>
                <Form action={cancelOrder}>
                          <input type="hidden" name="id" value={pedido.id} />
                    <input type="hidden" name="status" value='cancelado'/>
                    <input type="hidden" name="comandaId" value={comandaId}/>
                    <Button type="submit" color="danger" >Cancelar</Button>
                </Form>
                </>
            ):(
                <Button type="submit" color="success" disabled>Entregue</Button>
            )}
        </div>
    )
})}

    </div>
)
}
export default OrdersList