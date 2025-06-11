import Link from "next/link"
import styles from "../footer/styles.module.scss"
const FooterIndex=()=>{
return(
    <main className={styles.footer}>
    <Link href={'https://github.com/EwertonSA'}>
    
    <p>Github</p>
    </Link>
      <Link href={'www.linkedin.com/in/ewerton-silva-de-abreu-5bab0717b'}>
    
    <p>LinkedIn</p>
    </Link>
    </main>
)
}
export default FooterIndex