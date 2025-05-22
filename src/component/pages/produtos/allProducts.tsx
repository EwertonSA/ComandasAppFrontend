import produtService from "@/src/services/productService";
import { Table, Button, Pagination } from "reactstrap";
import useSWR from "swr";
import { useState } from "react";
import styles from "../../../../styles/getStyles.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import PaginationComponent from "@/src/components/common/pagination";
import useProducts from "../../hooks/produtos/useProducts";

const AllProducts = () => {
  const router=useRouter()
  const [page, setPage] = useState(1); // Estado da página
  const perPage = 10;

 const { produtos, total, error } = useProducts(page, perPage);

  if (!produtos.length && !error) return <p>Loading...</p>;
  if (error) return <p>Erro.</p>;

  const totalPages = Math.ceil(total / perPage);

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
            const imgUlr = produto.thumbnailUrl&& produto.thumbnailUrl.trim() !== ""
              ? `${process.env.NEXT_PUBLIC_BASEURL}/${produto.thumbnailUrl}`
              : defaultImg;
            return (
            
              <tr key={produto.id} onClick={() => router.push(`/produto/${produto.id}`)} className={styles.clickableRow}>
                <td className={styles.rowImg}>
                  <img src={imgUlr} alt="" className={styles.Img} />
                </td>
                <td className={styles.row}>{produto.id}</td>
                <td className={styles.row}>{produto.nome}</td>
                <td className={styles.row}>{produto.descricao}</td>
                <td className={styles.row}>{produto.preco}</td>
                <td className={styles.row}>{produto.categoria}</td>
                   
              </tr>
         
            );
            
          })}
        </tbody>
      </Table>

      {/* Paginação */}
   <PaginationComponent page={page} setPage={setPage} totalPages={totalPages}/>
    </main>
  );
};

export default AllProducts;
