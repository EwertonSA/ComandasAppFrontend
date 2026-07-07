'use client'
import { useRouter } from "next/navigation"
import { Button } from "reactstrap"
import styles from "@/styles/getStyles.module.scss"

const Section=()=>{
const router= useRouter()
    return(
        <div className={styles.section}>
  <Button className={styles.contactButton} onClick={()=>router.push("/portfolio/projects")}>See Projects</Button>
  <Button className={styles.contactButton} onClick={()=>router.push("/portfolio/aboutme")}>See About me</Button>
  <Button className={styles.contactButton} onClick={()=>router.push("/portfolio/aboutme")}>See Certifications</Button>
  </div>
    )
}
export default Section