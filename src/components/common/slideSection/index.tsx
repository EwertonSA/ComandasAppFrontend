'use client';
import { ProductType } from '@/src/services/productService';
import styles from './styles.module.scss';
import { Button, Container } from 'reactstrap';
import SlideComponent from '../../../components/common/slideComponent';
import SlideCard from '../../../components/common/slideCard';
import Link from 'next/link';

interface Props {
  getproduts: ProductType[] | { produtos: ProductType[] };
}

const SlideSection = ({ getproduts }: Props) => {
  const produtosArray = Array.isArray(getproduts)
    ? getproduts
    : Array.isArray((getproduts as { produtos: ProductType[] }).produtos)
    ? (getproduts as { produtos: ProductType[] }).produtos
    : [];

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center">
      <Link href="/employeeApp/products">
        <p className={styles.title}>Produtos disponíveis</p>
      </Link>

      <SlideComponent itemsLength={produtosArray.length}>
        {produtosArray.map((product, index) => (
          <SlideCard key={index} product={product} />
        ))}
      </SlideComponent>

      <Link href="employeeApp/allProducts">
        <Button outline color="light" className={styles.slideSection}>
          Veja todos os produtos
        </Button>
      </Link>
    </Container>
  );
};

export default SlideSection;
