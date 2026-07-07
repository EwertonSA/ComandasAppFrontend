import Link from 'next/link';
import styles from './styles.module.scss';
import { Container } from "reactstrap";

const HeaderNoAuth = () => {
  return (
    <>
      <div className={styles.ctaSection}>
        <img src="/2.jpg" alt="logoCta" className={styles.imgCta} />
        <p>Acesse o melhor aplicativo para restaurantes</p>
        <img src="/2.jpg" alt="logoCta" className={styles.imgCta} />
      </div>

      <Container className={styles.nav}>
        <img src="/2.jpg" alt="logo" className={styles.imgNav} />
        <div>
          <Link href="/login/index" className={`${styles.navBtn} btn btn-outline-secondary`}>
            Login
          </Link>
        </div>
      </Container>
    </>
  );
};

export default HeaderNoAuth;
