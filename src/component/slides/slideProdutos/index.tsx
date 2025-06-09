import { ProductType, ProdutoProps } from "@/src/services/productService";
import { Container } from "reactstrap";
import styles from "../slideSection/styles.module.scss";
import SlideComponent from "@/src/components/common/slideComponent";
import SlideCard from "@/src/components/common/slideCard";
import Link from "next/link";
import { useRouter } from "next/router";


interface SlideCategoriasProps {
  produtosPorCategoria: { [categoria: string]: ProductType[] } | null;
}

const SlideCategorias = ({ produtosPorCategoria }: SlideCategoriasProps) => {
  const router=useRouter()
  if (!produtosPorCategoria) {
    return <p>Carregando produtos...</p>; // ou um spinner
  }

  const categorias = Object.keys(produtosPorCategoria);

  return (
    <Container className="d-flex flex-column align-items-center">
      {categorias.map((categoria) => (
        
        <section className="text-center" key={categoria}>
          <p className={styles.sectionTitle}>{categoria}</p>
         
          <SlideComponent
  items={produtosPorCategoria[categoria]}
  renderItem={(product) => (
    <Link href={`/produtos/${product.id}?comandaId=${router.query.comandaId}`} key={product.id}>
      <SlideCard product={product} disableInternalNavigation/>
    </Link>
  )}
/>
          
    
        </section>
      ))}
    </Container>
  );
};

export default SlideCategorias;
