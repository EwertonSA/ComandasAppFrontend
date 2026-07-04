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
<p className={styles.content}>
  Hi, I'm Ewerton Silva de Abreu, a Full Stack JavaScript/TypeScript Developer. I enjoy turning ideas into modern web applications by building intuitive user interfaces and robust backend services. My main stack includes React, Next.js, Node.js, Express.js, TypeScript, and PostgreSQL. Through personal projects, I've gained hands-on experience with REST APIs, authentication, server-side rendering (SSR), database design, and responsive interfaces. I'm currently seeking opportunities to contribute, learn, and grow as a Full Stack Developer.
  </p>

                <Link href="mailto:seuemail@email.com">
            <button className={styles.contactButton}>Entrar em contato</button>
          </Link>
          </div>
    </main>
)
}
export default IndexDescription

