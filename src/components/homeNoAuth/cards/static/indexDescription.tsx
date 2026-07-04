import Link from "next/link"
import styles from "../../../../../styles/getStyles.module.scss"
const IndexDescription=()=>{
return(
    <main className={styles.main4} >
        <div className="d-flex flex-wrap flex-column justify-content-center align-items-center py-10">
       
          <p className={styles.title}>
            Desenvolvedor Full Stack focado em soluções com JavaScript, React,
            Node.js e PostgreSQL.
          </p>


                <Link href="mailto:seuemail@email.com">
            <button className={styles.contactButton}>Entrar em contato</button>
          </Link>
          </div>
    </main>
)
}
export default IndexDescription

