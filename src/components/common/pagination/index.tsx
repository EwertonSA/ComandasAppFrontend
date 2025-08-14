import Link from "next/link";
import styles from "../../../../styles/getStyles.module.scss";

interface PaginationProps {
  page: number;
  totalPages: number;
}

const PaginationComponent = ({ page, totalPages }: PaginationProps) => {
  const prevPage = Math.max(page - 1, 1);
  const nextPage = Math.min(page + 1, totalPages);

  return (
    <div className={styles.main}>
      {/* Botão anterior */}
      {page > 1 ? (
        <Link href={`?page=${prevPage}`} className={styles.navBtn}>
          Anterior
        </Link>
      ) : (
        <span className={styles.navBtnDisabled}>Anterior</span>
      )}

      <span className={styles.pageInfo}>
        Página {page} de {totalPages}
      </span>

      {/* Botão próxima */}
      {page < totalPages ? (
        <Link href={`?page=${nextPage}`} className={styles.navBtn}>
          Próxima
        </Link>
      ) : (
        <span className={styles.navBtnDisabled}>Próxima</span>
      )}
    </div>
  );
};

export default PaginationComponent;
