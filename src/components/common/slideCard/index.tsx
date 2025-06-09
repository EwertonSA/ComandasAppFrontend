import { useRouter } from "next/router";
import styles from "./styles.module.scss";
import { ProductType } from "@/src/services/productService";

export interface props{
    product: ProductType
     disableInternalNavigation?: boolean;
}


const SlideCard=({product,disableInternalNavigation}:props)=>{
    const router=useRouter()
    const defaultImage = "/images/default-thumbnail.jpg"; 
    const imageUrl = product.thumbnailUrl 
        ? `${process.env.NEXT_PUBLIC_BASEURL}/${product.thumbnailUrl}` 
        : defaultImage;
const handleClick=()=>{
        if(!disableInternalNavigation){
router.push(`/produto/${product.id}`)
}
}

    return <>
    <div className={styles.slide} onClick={handleClick}>
        <img src={imageUrl} alt={product.nome} className={styles.slideImg}/>
        <p className={styles.slideTitle}>{product.nome}</p>
        <p className={styles.slideDescription}>{product.descricao}</p>
        
        <p className={styles.slideDescription}>{product.preco}</p>
        
        <p className={styles.slideDescription}>{product.categoria}</p>
    </div>
    </>
}
export default SlideCard