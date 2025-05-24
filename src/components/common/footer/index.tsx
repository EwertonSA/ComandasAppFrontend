import { Container } from 'reactstrap';
import styles from './styles.module.scss';
import Link from 'next/link';

const Footer=()=>{

    return(
        <>
        <Container className={styles.footer}>
            <img src="/2.jpg" alt="" className={styles.footerLogo} />
            <Link   className={styles.footerLink} href='/'>Home</Link>
          
        </Container>
        </>
    )
}
export default Footer