import Link from "next/link"
import styles from "../../../../../styles/getStyles.module.scss"
const IndexCertifications=()=>{
return(
    <main className={styles.main6} data-aos="fade-zoom-out" data-aos-duration="2000">
        <div className=" pt-5">
<p className={styles.title}>Certificações</p>
<div className={styles.certifications}> 
<Link href={"/certificate.pdf"} target="blank"><p className={styles.tech}><img src={"/logoCta.png"} className={styles.Img}></img>HTML5</p></Link>
<Link href={"/css.pdf"} target="blank"><p className={styles.tech}><img src={"/logoCta.png"}className={styles.Img}></img>CSS</p></Link>
<Link href={"/certificate.pdf"} target="blank"><p className={styles.tech}><img src={"/logoCta.png"}className={styles.Img}></img>Bootstrap e Sass</p></Link>
<Link href={"/certificate.pdf"} target="blank"><p className={styles.tech}><img src={"/logoCta.png"}className={styles.Img}></img>React</p></Link>
<Link href={"/certificate.pdf"} target="blank"><p className={styles.tech}><img src={"/logoCta.png"}className={styles.Img}></img>Next</p></Link>
<Link href={"/certificate.pdf"} target="blank"><p className={styles.tech}><img src={"/logoCta.png"}className={styles.Img}></img>Node</p></Link>
<Link href={"/certificate.pdf"} target="blank"><p className={styles.tech}><img src={"/logoCta.png"}className={styles.Img}></img>Banco de dados SQL</p></Link>
<Link href={"/certificate.pdf"} target="blank"><p className={styles.tech}><img src={"/logoCta.png"}className={styles.Img}></img>SQL no Node e Prisma ORM</p></Link>
<Link href={"/certificate.pdf"} target="blank"><p className={styles.tech}><img src={"/logoCta.png"}className={styles.Img}></img>MongoDB</p></Link>
<Link href={"/certificate.pdf"} target="blank"><p className={styles.tech}><img src={"/logoCta.png"}className={styles.Img}></img>PHP MySQL</p></Link>
</div>
<p></p>
</div>
    </main>
)
}
export default IndexCertifications  