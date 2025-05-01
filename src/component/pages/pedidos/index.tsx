import { Container } from "reactstrap"
import PedidoCard from "../../slides/slidePedido/pedido"
import { usePedidos } from "../../hooks/pedidos/usePedidos"
const GetPedidos=()=>{
    const {pedidos,error}=usePedidos()
    if(error) error
    if(!pedidos){
        return <p>Loading</p>
    }
    return (<>

    <Container className="d-flex flex-wrap justify-content-center pb-3 py-5"> 
    <h1>Pedidos</h1>
{    pedidos.map((pedido:any)=>(
      <div  >
    <PedidoCard pedido={pedido}/>
         
       
      </div>
    ))}
    </Container>

    </>)
}
export default GetPedidos