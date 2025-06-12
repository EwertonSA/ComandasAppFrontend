import Link from "next/link"
import styles from "../../../../../styles/getStyles.module.scss"
const IndexDescription=()=>{
return(
    <main className={styles.main5}>

          <h1 className={styles.title}>
            Bem-vindo(a) ao portfólio de Ewerton Silva de Abreu
          </h1>
          <p className={styles.subtitle}>
            Desenvolvedor Full Stack focado em soluções com JavaScript, React,
            Node.js e PostgreSQL.
          </p>
          <p className={styles.content}>Sou um desenvolvedor Full Stack em transição de estudante para o mercado profissional, com quatro anos de estudo 
            focado em aplicações reais. Atualmente, estou no último semestre do curso de Gestão da Tecnologia da Informação, onde venho aplicando meus 
            conhecimentos em projetos próprios com foco em soluções para o mercado.
            Tenho experiência prática no desenvolvimento de uma aplicação completa voltada para bares e restaurantes, integrando JavaScript, Node.js e 
            PHP com Laravel, atendendo tanto colaboradores quanto clientes. Trabalhei com deploys automatizados em plataformas como Vercel e também com 
            hospedagem em VPS, o que me deu vivência em ambientes de produção.
            Estou em busca de uma oportunidade como Dev Júnior, estagiário ou trainee, onde possa colaborar, aprender com um time experiente e contribuir 
            com minha dedicação, autonomia e foco em entregar soluções de qualidade</p>
                <Link href="mailto:seuemail@email.com">
            <button className={styles.contactButton}>Entrar em contato</button>
          </Link>

    </main>
)
}
export default IndexDescription