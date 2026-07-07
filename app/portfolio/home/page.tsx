'use server'
import Footer from "@/src/components/common/footer"
import styles from "@/styles/getStyles.module.scss"
import { HeaderPort } from "./modal"
import { Container } from "reactstrap"
import Section from "./section"




const PortfolioHome=async()=>{


  
    return(
          <main>  
<HeaderPort logoUrl="/portfolio/home"/>
<Container className={styles.main7}>
    <h1 className={styles.title}>WELCOME TO EWERTON SILVA DE ABREU PORTFOLIO</h1>
    <h3 className={styles.subtitle}>FullStack JavaScript/TypeSctipt Web Developer | Software Engineering | Prompt Engineering</h3>
    <p className={styles.content}>
  Hi, I'm Ewerton Silva de Abreu, a Full Stack JavaScript/TypeScript Developer. I enjoy turning ideas into modern web applications by building intuitive user interfaces and robust backend services. My main stack includes React, Next.js, Node.js, Express.js, TypeScript, and PostgreSQL. Through personal projects, I've gained hands-on experience with REST APIs, authentication, server-side rendering (SSR), database design, and responsive interfaces. I'm currently seeking opportunities to contribute, learn, and grow as a Full Stack Developer.
  </p>
<Section></Section>
</Container>
       <Footer />
</main>
    )
}
export default  PortfolioHome