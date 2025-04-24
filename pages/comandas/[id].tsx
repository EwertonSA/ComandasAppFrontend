import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import clienteService from "@/src/services/clienteService";
import HeaderAuth from "@/src/components/common/headerAuth";
import styles from '../../styles/getStyles.module.scss'
import pedidoService from "@/src/services/pedidoService";
import { Button, Label } from "reactstrap";
import Link from "next/link";
import Footer from "@/src/components/common/footer";

const Comanda = () => {
  const router = useRouter();
  const { id } = router.query;
  const [abaAtiva,setAbaAtiva]=useState<'pendentes'|'entregues'>('pendentes')
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [pedidosPendentes,setPedidosPendentes]=useState<any[]>([])
  const [pedidosEntregues,setPedidosEntregues]=useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const totalDelivered= useMemo(()=>{
    return pedidosEntregues.reduce((acc,pedido)=>{
      return acc+Number(pedido.total|| 0)
    },0).toFixed(2)
  },[pedidosEntregues])

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const res = await clienteService.getPedidosComanda(id as string);
        const details = await Promise.all(
          (res.pedidos || []).map(async (pedido: any) => {
            const detail = await pedidoService.getOrdersById(pedido.id);
            return { ...detail, id: pedido.id };
          })
        );
        setPedidosPendentes(details.filter(p=>p.status.toLowerCase() !== 'entregue'))
        setPedidosEntregues(details.filter(p=>p.status.toLowerCase() === 'entregue'))
        setPedidos(details);
      } catch (error) {
        console.error(error);
        setError("Erro ao carregar pedido");
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchPedidos();
    }
  }, [id]);
  
  const delivered=async(pedido:any)=>{
    try {
      await pedidoService.updateStatus(pedido.id,'entregue')
      setPedidosPendentes(prev=>prev.filter(p=>p.id !== pedido.id))
      setPedidosEntregues(prev=>[...prev,{...pedido,status:'entregue'}])
    } catch (error) {
      console.error("Erro ao atualizar status",error)
    }
  }
  const handleCancel=async(pedido:any)=>{
    try {
      await pedidoService.delete(pedido.id,'cancelado')
      setPedidosPendentes(prev=>prev.filter(p=>p.id !==pedido.id))
    } catch (error) {
      console.error('Erro ao cancelar pedido')
    }
  }

  if (loading) return <p>Carregando pedidos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.div}>
      <main >
        <HeaderAuth logoUrl="/clienteInfo" btnContent="Abas" />
        <p className={styles.title}>Pedidos da Comanda {id}</p>
        <div className="d-flex flex-wrap justify-content-center align-items-center gap-2">
          <Button
          color={abaAtiva === "pendentes" ? 'warning':'secondary'}
          onClick={()=>setAbaAtiva('pendentes')}
          >Pedidos pendentes</Button>
          <Button color={abaAtiva === "entregues" ? 'success':'secondary'}
          onClick={()=>setAbaAtiva('entregues')}>
            Pedidos entregues
          </Button>
        </div>

       <div className="d-flex flex-wrap justify-content-center align-items-center gap-2">
        {
          abaAtiva === "pendentes"?(
            pedidosPendentes.length>0?(
              pedidosPendentes.map((pedido:any)=>(
                <div key={pedido.id} className={styles.container}>
                  <p><strong>ID:</strong>{pedido.id}</p>
                  <p><strong>Total:</strong>{pedido.total}</p>
                  <p><strong>Status: </strong> {pedido.status}</p>
                  <p className={styles.title}>Produtos:</p>
                  <ul>
                    {pedido.pedidosProdutos?.map((item :any)=>(
                      <li key={item.produto.id}>
                        {item.quantidade} x {item.produto.nome} - R$ {item.produto.preco}
                      </li>
                    ))}
                  </ul>
                  <Button color="warning" onClick={()=>delivered(pedido)}>Não entregue
                  </Button>
                  <Button color="danger" className="m-3" onClick={()=>handleCancel(pedido)}>
                    Cancelar pedido
                  </Button>
                </div>
              ))
            ):(
              <p className={styles.div}>Nnehum pedido pendente</p>
            )
          ):(
           pedidosEntregues.length>0?(
            pedidosEntregues.map((pedido:any)=>(
              <div key={pedido.id} className={styles.container}>
                 <p><strong>ID:</strong> {pedido.id}</p>
                  <p><strong>Total:</strong> {pedido.total}</p>
                  <p><strong>Status:</strong> {pedido.status}</p>
                  <p className={styles.title}>Produtos:</p>
               <ul>
               {pedido.pedidosProdutos?.map((item:any)=>(
                    <li key={item.produto.id}>
                      {item.quantidade} x {item.produto.nome} - R$ {item.produto.preco}
                    </li>
                  ))}
               </ul>
               <Button color="success" disabled>
                Pedidos entregues
               </Button>

              </div>
            ))
           ):(
            <p>Nenhum pedido entregue</p>
           ) 
          )
        }
        
       </div>

       <p className={styles.title}>Valor total: R$ {totalDelivered} </p>

        <Link href={`/pagamentos?comandaId=${id}`} className={styles.btn}>
          <Button>Pagamento</Button>
        </Link>
      
        <Footer />
      </main>
   
    </div>
  );
};

export default Comanda;
