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
Hi, I'm Ewerton Silva de Abreu, a Full Stack Developer with an unconventional background in heavy manufacturing and a focus on building practical, production-grade software. Working across TypeScript, React, Next.js, Node.js, and PostgreSQL, I build and deploy end-to-end applications—from real-time operational platforms to interactive 3D web environments.
</p>
<Section></Section>
</Container>
<Footer />
</main>
)
}
export default  PortfolioHome