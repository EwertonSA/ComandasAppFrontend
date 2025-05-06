import Link from "next/link"
import { Button, Container } from "reactstrap"
import styles from '../../../../styles/getStyles.module.scss'
const IndexLogin=()=>{

    return(
    <>
    <div className={styles.main2}>
      <Container className="d-flex flex-wrap justify-content-center align-items-center">
      <Link href="/clientesLogin">
        <Button className={styles.btn}>Acesso para clientes</Button>
        </Link>
        <Link href="/userLogin">
        <Button className={styles.btn}>Acesso para colaboradores</Button>
        </Link>
      </Container>
    </div>
    </>
)
}
export default IndexLogin
