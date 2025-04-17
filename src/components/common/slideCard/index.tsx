import styles from "./styles.module.scss";
import { ProductType } from "@/src/services/productService";

interface props{
    product: ProductType
}


const SlideCard=({product}:props)=>{
    return <>
    <div className={styles.slide}>
        <img src="/drinks.jpg" alt={product.nome} className={styles.slideImg}/>
        <p className={styles.slideTitle}>{product.nome}</p>
        <p className={styles.slideDescription}>{product.descricao}</p>
        
        <p className={styles.slideDescription}>{product.preco}</p>
        
        <p className={styles.slideDescription}>{product.categoria}</p>
    </div>
    </>
}
export default SlideCard