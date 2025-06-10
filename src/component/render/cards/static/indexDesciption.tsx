import Link from "next/link"
import styles from "../../../../../styles/getStyles.module.scss"
const IndexDescription=()=>{
return(
    <main className={styles.main4}>

          <h1 className={styles.title}>
            Bem-vindo(a) ao portfólio de Ewerton Silva de Abreu
          </h1>
          <p className={styles.subtitle}>
            Desenvolvedor Full Stack focado em soluções com JavaScript, React,
            Node.js e PostgreSQL.
          </p>
          <p className={styles.content}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum accusantium corrupti maxime, labore aperiam incidunt,
             laborum nemo vel odit ducimus cupiditate debitis! Libero molestias earum laudantium iure, fugiat excepturi. 
             Quod amet sequi, dolorem, quasi maxime debitis provident ratione molestias, quisquam ut rerum. Libero provident ex rerum hic.
              Mollitia qui expedita aperiam est cupiditate eum amet, quaerat illo reiciendis illum dolor excepturi beatae nemo quisquam sunt
               veniam similique repellendus minima aspernatur ea quam. Illo repudiandae minima sit, laudantium laboriosam ab deleniti ipsum! 
               Commodi sit ut, voluptatibus quam error repudiandae eveniet porro doloribus laudantium tenetur consectetur consequuntur quo
                voluptas nulla blanditiis ratione inventore vero
             nisi illo praesentium dignissimos voluptate impedit assumenda. Dolores, fugit blanditiis minima quod voluptate laboriosam sequi
              quibusdam eaque omnis.</p>
                <Link href="mailto:seuemail@email.com">
            <button className={styles.contactButton}>Entrar em contato</button>
          </Link>

    </main>
)
}
export default IndexDescription