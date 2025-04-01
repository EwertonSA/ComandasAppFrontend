import { ProductType } from '@/src/services/productService';
import styles from './styles.module.scss';
import { Button, Container } from 'reactstrap';
import SlideComponent from '../../common/slideComponent';
import Link from 'next/link';
interface props{
    getproduts: ProductType[]
}
const SlideSection=({getproduts}:props)=>{
    console.log("🛠️ Produtos no SlideSection:", getproduts); // Debug

    return(
     <>
     <Container className='d-flex flex-column align-items-center'>
        <p className={styles.sectionTitle}>Produtos disponíveis</p>
        <SlideComponent product={getproduts}/>
       <Link href=''>
       <Button outline color='light' className={styles.slideSection}>Faça seu pedido agora</Button>
       </Link>
     </Container>
     </>)
}
export default SlideSection