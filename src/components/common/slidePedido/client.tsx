'use client';
import SlideComponent from "@/src/components/common/slideComponent";
import PedidoCard from "./pedido";
import { PedidosType } from "@/src/services/productService";
import { Container, Button } from "reactstrap";
import Link from "next/link";
import { SplideSlide } from "@splidejs/react-splide";
import styles from "../slideSection/styles.module.scss";

interface SlidePedidosClientProps {
  pedidos: PedidosType[];
}

export default function SlidePedidosClient({ pedidos }: SlidePedidosClientProps) {
  if (!pedidos.length) return <p>Nenhum pedido encontrado</p>;

  return (
    <Container className="d-flex flex-column align-items-center">
      <Link href="/employeeApp/orders" className="text-center">
        <p className={styles.title}>Pedidos</p>
      </Link>

   <SlideComponent itemsLength={pedidos.length}>
  {pedidos.map((pedido, index) => (
    <PedidoCard key={index} pedido={pedido} />
  ))}
</SlideComponent>


      <Link href="/employeeApp/orders">
        <Button outline color="light" className={styles.slideSection}>
          Veja todos os pedidos
        </Button>
      </Link>
    </Container>
  );
}
