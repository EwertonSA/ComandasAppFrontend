import Link from "next/link"
import styles from "../../../../../styles/getStyles.module.scss"
import { useRouter } from "next/router"
const IndexProjects=()=>{
    const router=useRouter()
return(
    <main className={styles.main4} data-aos="fade-left" data-aos-duration="2000">
       <div className="d-flex flex-wrap flex-column justify-content-center align-items-center">
            <p className={styles.title}>Projetos FullStack com JS</p>
             <p className={styles.subtitle}>Projeto de serviço para restaurantes</p>
            <div className="d-flex flex-row">
            <div  className={styles.container}>

            <img src="/comandasApp.jpg" alt=""  className={styles.slideImg}/>
             <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam, quas sit eligendi, quis saepe vitae iusto inventore
     architecto delectus nostrum obcaecati nisi animi consequatur praesentium deserunt explicabo earum incidunt.</p>
     
              <button className={styles.contactButton} onClick={()=>router.push('/indexComandas')}>Ver Front-End</button>
            </div>
             
            <Link href="https://esadev.com.br/admin" target="_blank"  className={styles.container}>
 <img src="/comandasApp.jpg" alt=""  className={styles.slideImg}/>
 <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam, quas sit eligendi, quis saepe vitae iusto inventore
     architecto delectus nostrum obcaecati nisi animi consequatur praesentium deserunt explicabo earum incidunt.</p>
              <button className={styles.contactButton}>Ver Back-End</button>
            </Link>
            <Link href="https://blackjs-six.vercel.app" target="_blank" className={styles.container}>
             <img src="/vercel.svg" alt=""  className={styles.slideImg}/>
 <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam, quas sit eligendi, quis saepe vitae iusto inventore
     architecto delectus nostrum obcaecati nisi animi consequatur praesentium deserunt explicabo earum incidunt.</p>
             <button className={styles.contactButton}>Ver na Vercel</button>
            </Link>
            </div>
          </div>
    </main>
)
}
export default IndexProjects