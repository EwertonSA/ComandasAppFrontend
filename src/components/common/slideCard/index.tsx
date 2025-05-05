import styles from "./styles.module.scss";
import { ProductType } from "@/src/services/productService";

interface props{
    product: ProductType
}


const SlideCard=({product}:props)=>{
    const defaultImage = "/images/default-thumbnail.jpg"; 
    const imageUrl = product.thumbnailUrl 
        ? `${process.env.NEXT_PUBLIC_BASEURL}/${product.thumbnailUrl}` 
        : defaultImage;

    return <>
    <div className={styles.slide}>
        <img src={imageUrl} alt={product.nome} className={styles.slideImg}/>
        <p className={styles.slideTitle}>{product.nome}</p>
        <p className={styles.slideDescription}>{product.descricao}</p>
        
        <p className={styles.slideDescription}>{product.preco}</p>
        
        <p className={styles.slideDescription}>{product.categoria}</p>
    </div>
    </>
}
export default SlideCard