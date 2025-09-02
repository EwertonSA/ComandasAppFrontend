
import produtService from "@/src/services/productService";
import { Table } from "reactstrap";


import styles from "../../../styles/getStyles.module.scss";
import Link from "next/link";
import PaginationComponent from "@/src/components/common/pagination";
import { cookies } from "next/headers";
import { OrdersPageProps } from "../orders/allORders";

const AllProducts =async ({searchParams}:OrdersPageProps) => {
  const setCookie = await cookies()
   const token=setCookie.get("comandas-token")?.value || null;
   const page = parseInt(searchParams.page || '1', 10);
   const perPage =10;
 
  const res = await produtService.getProduct(token, page, perPage);
  const produtos=res.data

  if (!produtos || produtos.length === 0) return <p>Nenhum produto encontrado.</p>;

  const totalPages = Math.ceil(res.total / perPage); // ou outra lógica se tiver total

  return (
   
    <main className={styles.main3}>
     <p className={styles.title}>Produtos:</p>
      <Table className={styles.table}>
          
        <thead>
          <tr>
            <th className={styles.row}>Imagem</th>
            <th className={styles.row}>ID</th>
            <th className={styles.row}>Nome</th>
            <th className={styles.row}>Descrição</th>
            <th className={styles.row}>Preço</th>
            <th className={styles.row}>Categoria</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto: any) => {
            const defaultImg = "images/deafult-thumbnail.jpg";
const imgUrl = produto.thumbnailUrl
  ? `/uploads/${produto.thumbnailUrl}`
  : defaultImg;
            return (
            
               <tr key={produto.id} className={styles.clickableRow}>
        <td className={styles.rowImg}>
          <Link href={`/employeeApp/products/${produto.id}`}>
            <img src={imgUrl} alt={produto.nome} className={styles.Img} />
          </Link>
        </td>
        <td className={styles.row}>
          <Link href={`/employeeApp/products/${produto.id}`}>{produto.id}</Link>
        </td>
        <td className={styles.row}>
          <Link href={`/employeeApp/products/${produto.id}`}>{produto.nome}</Link>
        </td>
        <td className={styles.row}>
          <Link href={`/employeeApp/products/${produto.id}`}>{produto.descricao}</Link>
        </td>
        <td className={styles.row}>
          <Link href={`/employeeApp/products/${produto.id}`}>{produto.preco}</Link>
        </td>
        <td className={styles.row}>
          <Link href={`/employeeApp/products/${produto.id}`}>{produto.categoria}</Link>
        </td>
      </tr>
            );
            
          })}
        </tbody>
      </Table>

      {/* Paginação */}
   <PaginationComponent page={page} totalPages={totalPages}/>
    </main>
  );
};

export default AllProducts;
