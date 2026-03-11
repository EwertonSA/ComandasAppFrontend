'use server'
import { ProductType } from "@/src/services/productService";
import { Container } from "reactstrap";
import styles from "../../common/slideSection/styles.module.scss";
import SlideComponent from "@/src/components/common/slideComponent";
import SlideCard from "@/src/components/common/slideCard";
import Link from "next/link";

export interface SlideCategoriasProps {
  produtosPorCategoria: { [categoria: string]: ProductType[] } | null;
   comandaId?: string | null;
}

const SlideCategorias = ({ produtosPorCategoria,comandaId }: SlideCategoriasProps) => {
 

  if (!produtosPorCategoria) {
    return <p>Carregando produtos...</p>; // ou um spinner
  }

  const categorias = Object.keys(produtosPorCategoria);

  return (
    <Container className="d-flex flex-column align-items-center">
      {categorias.map((categoria) => {
        const produtos = produtosPorCategoria[categoria];

        return (
          <section className="text-center" key={categoria}>
            <p className={styles.sectionTitle}>{categoria}</p>

            <SlideComponent itemsLength={produtos.length}>
              
{produtos.map((product)=>{
  const href = `/homeNoAuth/produto/${product.id}`;
  
  return(
    <Link href={href} key={product.id}>
      <SlideCard product={product} disableInternalNavigation />
    </Link>
  )
})}
            </SlideComponent>
          </section>
        );
      })}
    </Container>
  );
};

export default SlideCategorias;
