import Link from "next/link"
import styles from "../../../../../styles/getStyles.module.scss"
const IndexProjects=()=>{
return(
    <main>
       <div className="d-flex flex-wrap flex-column justify-content-center align-items-center">
            <p className={styles.title}>Projetos FullStack com JS</p>
             <p className={styles.subtitle}>Projeto de serviço para restaurantes</p>
            <div className="d-flex flex-row">
            <div  className={styles.container}>

            <img src="/2.jpg" alt=""  className={styles.slideImg}/>
             <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam, quas sit eligendi, quis saepe vitae iusto inventore
     architecto delectus nostrum obcaecati nisi animi consequatur praesentium deserunt explicabo earum incidunt.</p>
     
              <button className={styles.btn}>Ver Front-End</button>
            </div>
             
            <Link href="https://esadev.com.br/admin" target="_blank"  className={styles.container}>
 <img src="/2.jpg" alt=""  className={styles.slideImg}/>
 <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam, quas sit eligendi, quis saepe vitae iusto inventore
     architecto delectus nostrum obcaecati nisi animi consequatur praesentium deserunt explicabo earum incidunt.</p>
              <button className={styles.btn}>Ver Back-End</button>
            </Link>
            <Link href="https://blackjs-six.vercel.app" target="_blank" className={styles.container}>
             <img src="/2.jpg" alt=""  className={styles.slideImg}/>
 <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam, quas sit eligendi, quis saepe vitae iusto inventore
     architecto delectus nostrum obcaecati nisi animi consequatur praesentium deserunt explicabo earum incidunt.</p>
            </Link>
            </div>
          </div>
    </main>
)
}
export default IndexProjects