import { ProductType, ProdutoProps } from '@/src/services/productService';
import styles from './styles.module.scss';
import { Button, Container } from 'reactstrap';
import SlideComponent from '../../../components/common/slideComponent';
import SlideCard from '../../../components/common/slideCard'; // certifique-se que o caminho tá certo
import Link from 'next/link';

interface props {
  getproduts: ProductType[]| { produtos: ProductType[]};
}

const SlideSection = ({ getproduts }: props) => {

 const produtosArray = Array.isArray(getproduts)
    ? getproduts
    : Array.isArray(getproduts.produtos)
    ? getproduts.produtos
    : [];
  return (
    <Container className="d-flex flex-column align-items-center">
     <Link href="/allProducts"> <p className='text-center'>Produtos disponíveis</p>

      <SlideComponent
        items={produtosArray}
        renderItem={(product) => <SlideCard product={product} />}
      />
      </Link>

      <Link href="/indexLogin">
        <Button outline color="light" className={styles.slideSection}>
          Faça seu pedido agora
        </Button>
      </Link>
    </Container>
  );
};

export default SlideSection;
