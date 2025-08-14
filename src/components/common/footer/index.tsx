import { Container } from 'reactstrap';
import styles from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';

const Footer=()=>{

    return(
        <>
        <Container className={styles.footer}>
            <Image src="/2.jpg" alt="ComandasLogo" className={styles.footerLogo} width={100} height={50}/>
            <Link   className={styles.footerLink} href='/'>Home</Link>
          
        </Container>
        </>
    )
}
export default Footer