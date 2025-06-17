import Link from "next/link"
import styles from "../../../../../styles/getStyles.module.scss"
const IndexCertifications=()=>{
return(
    <main className={styles.main6} data-aos="fade-zoom-out" data-aos-duration="2000">
        <div className=" pt-5">
<p className={styles.title}>Certificações</p>
<div className={styles.certifications}> 
<Link href={"/certificado_HTML5.pdf"} target="blank"><p className={styles.tech}><img src={"/logoCta.png"} className={styles.Img}></img>HTML5</p></Link>
<Link href={"/certificado_CSS3.pdf"} target="blank"><p className={styles.tech}><img src={"/logoCta.png"}className={styles.Img}></img>CSS</p></Link>
<Link href={"certificado_BootstrapeSass.pdf"} target="blank"><p className={styles.tech}><img src={"/logoCta.png"}className={styles.Img}></img>Bootstrap e Sass</p></Link>
<Link href={"certificado_JavaScriptI.pdf"} target="blank"><p className={styles.tech}><img src={"/logoCta.png"}className={styles.Img}></img>Javascript I</p></Link>
<Link href={"certificado_JavaScriptII.pdf"} target="blank"><p className={styles.tech}><img src={"/logoCta.png"}className={styles.Img}></img>Javascript II</p></Link>
<Link href={"certificado_JavaScriptIII.pdf"} target="blank"><p className={styles.tech}><img src={"/logoCta.png"}className={styles.Img}></img>Javascript III</p></Link>
<Link href={"certificado_JavaScriptIV.pdf"} target="blank"><p className={styles.tech}><img src={"/logoCta.png"}className={styles.Img}></img>Javascript IV</p></Link>
<Link href={"certificado_JavaScriptV.pdf"} target="blank"><p className={styles.tech}><img src={"/logoCta.png"}className={styles.Img}></img>Javascript V</p></Link>
<Link href={"certificado_JavaScriptVI.pdf"} target="blank"><p className={styles.tech}><img src={"/logoCta.png"}className={styles.Img}></img>Javascript VI</p></Link>
<Link href={"certificado_JavaScriptVI.pdf"} target="blank"><p className={styles.tech}><img src={"/logoCta.png"}className={styles.Img}></img>Typescript</p></Link>
<Link href={"certificado_GiteGithub.pdf"} target="blank"><p className={styles.tech}><img src={"/logoCta.png"}className={styles.Img}></img>Git&GitHub</p></Link>
<Link href={"certificado_FundamentosdoReact.pdf"} target="blank"><p className={styles.tech}><img src={"/logoCta.png"}className={styles.Img}></img>React</p></Link>
<Link href={"/certificate.pdf"} target="blank"><p className={styles.tech}><img src={"/logoCta.png"}className={styles.Img}></img>Next</p></Link>
<Link href={"certificado_Node.js.pdf"} target="blank"><p className={styles.tech}><img src={"/logoCta.png"}className={styles.Img}></img>Node</p></Link>
<Link href={"/certificate.pdf"} target="blank"><p className={styles.tech}><img src={"/logoCta.png"}className={styles.Img}></img>Banco de dados SQL</p></Link>
<Link href={"/certificate.pdf"} target="blank"><p className={styles.tech}><img src={"/logoCta.png"}className={styles.Img}></img>SQL no Node e Prisma ORM</p></Link>
<Link href={"/certificado_PhpMysql.pdf"} target="blank"><p className={styles.tech}><img src={"/logoCta.png"}className={styles.Img}></img>PhpMySQL</p></Link>

</div>
<p></p>
</div>
    </main>
)
}
export default IndexCertifications  