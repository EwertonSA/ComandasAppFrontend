import SlideComponent from '../../../components/common/slideComponent';
import { PedidosType } from '@/src/services/productService';
import pedidoService from '@/src/services/pedidoService';
import useSWR from 'swr';
import PedidoCard from './pedido';
import { Button, Container } from 'reactstrap';
import styles from '../slideSection/styles.module.scss'
import Link from 'next/link';

const SlidePedidos = () => {
  const { data, error } = useSWR('/pedidos', pedidoService.getPedidos);

  if (error) return <p>Erro ao carregar pedidos</p>;
  if (!data) return <p>Carregando...</p>;

  return (
 <Container className='d-flex flex-column align-items-center'>
  <Link href={"/AllOrders"}>
    <p className={styles.sectionTitle}>Pedidos</p>
    </Link>
     <SlideComponent
      items={data}
      renderItem={(pedido: PedidosType) => <PedidoCard pedido={pedido} />}
    />
      <Link href="/register">
        <Button outline color="light" className={styles.slideSection}>
          Faça seu pedido agora
        </Button>
      </Link>
    
 </Container>
  );
};

export default SlidePedidos;
