import Link from 'next/link';
import styles from './styles.module.scss';
import {Container,Button} from "reactstrap"
 
const HeaderNoAuth=function (){
    return <>
    <div className={styles.ctaSection}>
<img src="/2.jpg" alt="logoCta" className={styles.imgCta} />
<p>Acesse o melhor aplicativo para restaurantes</p>
<img src="/2.jpg" alt="logoCta" className={styles.imgCta} />
    </div>
    <Container className={styles.nav}>
<img src="/2.jpg" alt="logo" className={styles.imgNav}/>
<div>
   <Link href=''>
   <Button className={styles.navBtn} outline >Pesquisar</Button>
  
   </Link>
   <Link href=''>
   <Button outline  className={styles.navBtn}>Cadastre</Button>
   </Link>

</div>
    </Container>
    </>
}
export default HeaderNoAuth