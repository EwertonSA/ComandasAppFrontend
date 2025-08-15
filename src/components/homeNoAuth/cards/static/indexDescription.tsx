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
  Sou um desenvolvedor Full Stack em transição do ambiente acadêmico para o mercado profissional,
   com quatro anos de estudo focado em aplicações reais. Atualmente, curso o último semestre de 
   Gestão da Tecnologia da Informação, onde aplico meus conhecimentos em projetos próprios voltados para soluções práticas de mercado.

  Tenho experiência no desenvolvimento de uma aplicação completa para bares e restaurantes, 
  integrando tecnologias como TypeScript, Node.js, Sequelize, Express e AdminJS no backend,
  além de Next.js, React Bootstrap e Sass no frontend, atendendo tanto colaboradores quanto clientes.

  Também trabalhei com deploys automatizados em plataformas como Vercel e com hospedagem em VPS, o que me proporcionou vivência em ambientes de produção.

  Busco uma oportunidade como Desenvolvedor Júnior, Estagiário ou Trainee, onde eu possa colaborar com o time, aprender continuamente e contribuir com minha dedicação, autonomia e foco na entrega de soluções de qualidade.
</p>

                <Link href="mailto:seuemail@email.com">
            <button className={styles.contactButton}>Entrar em contato</button>
          </Link>
          </div>
    </main>
)
}
export default IndexDescription

