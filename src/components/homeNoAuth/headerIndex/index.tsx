import { Button, Container } from "reactstrap"
import styles from "../headerNoAuth/styles.module.scss"
import Link from "next/link"
const HeaderIndex=()=>{
return(
    <>
      <div className={styles.ctaSection}>
<img src="/2.jpg" alt="logoCta" className={styles.imgCta} />
<p>Acesse o portifólio fullstack completo de Ewerton Silva de Abreu</p>
<img src="/2.jpg" alt="logoCta" className={styles.imgCta} />
    </div>
   
    </>

)
}
export default HeaderIndex