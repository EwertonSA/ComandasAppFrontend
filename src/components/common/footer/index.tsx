import { Container } from 'reactstrap';
import styles from './styles.module.scss';

const Footer=()=>{

    return(
        <>
        <Container className={styles.footer}>
            <img src="/2.jpg" alt="" className={styles.footerLogo} />
            <a href="http://comandas.com" target='blank'
            className={styles.footerLink}>Products</a>
        </Container>
        </>
    )
}
export default Footer