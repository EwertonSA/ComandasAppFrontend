
import pedidoService from "@/src/services/pedidoService"
import styles from "../../../styles/getStyles.module.scss"
import PaginationComponent from "@/src/components/common/pagination";
import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";




export interface OrdersPageProps {
  searchParams: { page?: string; perPage?: string };
}

const  Orders=async({ searchParams }: OrdersPageProps)=> {
  const setCookie = await cookies()
  const token=setCookie.get("comandas-token")?.value || null;
  const page = parseInt(searchParams.page || "1", 10);
  const perPage = parseInt(searchParams.perPage || "10", 10);

  // Carregar pedidos diretamente no server
  const data = await pedidoService.getPedidos(token, page, perPage);

  if (!data || !data.pedidos) {
    return <p>Erro ao carregar pedidos</p>;
  }

  const { pedidos, total } = data;
  const totalPages = Math.ceil(total / perPage);

return(
    <main className={styles.main3}> 
    <p className={styles.title}>Pedidos:</p>
<table className={styles.table}>
  <thead>
    <tr>
        <th className={styles.row2}>Img</th>
      <th className={styles.row}>Comanda</th>
      <th className={styles.row}>Status</th>
      <th className={styles.row}>Produto</th>
      <th className={styles.row}>Qtd</th>
      <th className={styles.row}>Preço Unitário (R$)</th>
      <th className={styles.row}>Total Pedido (R$)</th>
    </tr>
  </thead>
  <tbody>
 {Array.isArray(data?.pedidos) && data.pedidos.map((pedido: any) =>
  Array.isArray(pedido.produtos)&&pedido.produtos.map((produto: any, index: number) => {
    const defaultImage = "/images/default-thumbnail.jpg";
    const imageUrl = produto.thumbnailUrl
      ? `${process.env.NEXT_PUBLIC_BASEURL}/${produto.thumbnailUrl}`
      : defaultImage;
    return (
     <tr key={`${pedido.id}-${produto.id}-${index}`} className={styles.clickableRow}>
  <td className={styles.rowImg}>
    <Link href={`/employeeApp/comandas/${pedido.comandaId}`}>
      <Image src={imageUrl} alt={produto.nome} className={styles.Img} width={50} height={50} />
    </Link>
  </td>
  <td className={styles.row}>
    <Link href={`/employeeApp/comandas/${pedido.comandaId}`}>{pedido.comandaId}</Link>
  </td>
  <td className={styles.row}>
    <Link href={`/employeeApp/comandas/${pedido.comandaId}`}>{pedido.status}</Link>
  </td>
  <td className={styles.row}>
    <Link href={`/employeeApp/comandas/${pedido.comandaId}`}>{produto.nome}</Link>
  </td>
  <td className={styles.row}>
    <Link href={`/employeeApp/comandas/${pedido.comandaId}`}>{produto.pedidos_produtos.quantidade}</Link>
  </td>
  <td className={styles.row}>
    <Link href={`/employeeApp/comandas/${pedido.comandaId}`}>R$ {Number(produto.preco).toFixed(2)}</Link>
  </td>
  <td className={styles.row}>
    {index === 0 ? (
      <Link href={`/employeeApp/comandas/${pedido.comandaId}`}>R$ {Number(pedido.total).toFixed(2)}</Link>
    ) : (
      ""
    )}
  </td>
</tr>
    );
  })
)}

  </tbody>
</table>
  <PaginationComponent page={page}  totalPages={totalPages}/>
    </main>
)
}
export default Orders

