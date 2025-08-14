'use server'
import { ProductType } from "@/src/services/productService";
import styles from '../../../styles/getStyles.module.scss';

import QuantitySelector from "./[id]/form";


type Props = {
  data: ProductType;
};

const ProductIdUser = ({ data }: Props) => {

  const defaultImage = "/images/default-thumbnail.jpg";
  const imgUrl = data.thumbnailUrl
    ? `${process.env.NEXT_PUBLIC_BASEURL}/${data.thumbnailUrl}`
    : defaultImage;

  return (
    <main
      className={styles.main}
      style={{
        backgroundImage: `linear-gradient(to bottom, #6666661a, #151515),url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100%",
        minWidth: "100%",
      }}
      key={data.id}
    >
      <div className={styles.container}>
        <QuantitySelector
        
      
          produtoId={data.id}
          preco={Number(data.preco)}
        />
        <img src={imgUrl} alt="" className={styles.slide} />
        <p className={styles.subTitle}>{data.nome}</p>
        <p className={styles.subTitle}>{data.descricao}</p>
        <p className={styles.subTitle}>Preço: {data.preco}</p>
        <p className={styles.subTitle}>Categoria: {data.categoria}</p>
      </div>
    </main>
  );
};

export default ProductIdUser;
