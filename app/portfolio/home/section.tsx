'use client'
import { useRouter } from "next/navigation"
import { Button } from "reactstrap"
import styles from "@/styles/getStyles.module.scss"

const Section=()=>{
const router= useRouter()
    return(
        <div className={styles.section}>
  <Button className={styles.contactButton} onClick={()=>router.push("/portfolio/projects")}>Projects</Button>
  <Button className={styles.contactButton} onClick={()=>router.push("/portfolio/aboutme")}>About me</Button>
  <Button className={styles.contactButton} onClick={()=>router.push("/portfolio/aboutme")}>Certifications</Button>
  </div>
    )
}
export default Section