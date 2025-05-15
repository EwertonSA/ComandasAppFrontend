import produtService from "@/src/services/productService";
import { Table, Button } from "reactstrap";
import useSWR from "swr";
import { useState } from "react";
import styles from "../../../../styles/getStyles.module.scss";
import Link from "next/link";

const AllProducts = () => {
  const [page, setPage] = useState(1); // Estado da página
  const perPage = 10;

  const { data, error} = useSWR(
    [`/produtos?page=${page}&perPage=${perPage}`, page], // chave única baseada na página
    async () => {
      const res = await produtService.getProduct(page, perPage); // passe a página e o perPage aqui
      return res.data;
    }
  );

  if (!data) return <p>Loading...</p>;
  if (error) return <p>Erro.</p>;

  const { produtos, total } = data;
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
            const imgUlr = produto.thumbnailUrl
              ? `${process.env.NEXT_PUBLIC_BASEURL}/${produto.thumbnailUrl}`
              : defaultImg;
            return (
              <Link href={"/produtos"}>
              <tr key={produto.id}>
                <td className={styles.row}>
                  <img src={imgUlr} alt="" className={styles.Img} />
                </td>
                <td className={styles.row}>{produto.id}</td>
                <td className={styles.row}>{produto.nome}</td>
                <td className={styles.row}>{produto.descricao}</td>
                <td className={styles.row}>{produto.preco}</td>
                <td className={styles.row}>{produto.categoria}</td>
              </tr>
            </Link>
            );
            
          })}
        </tbody>
      </Table>

      {/* Paginação */}
      <div className={styles.main}>
        <Button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Anterior
        </Button>
        <span className={styles.pageInfo}>
          Página {page} de {totalPages}
        </span>
        <Button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          Próxima
        </Button>
      </div>
    </main>
  );
};

export default AllProducts;
