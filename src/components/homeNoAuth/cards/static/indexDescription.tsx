'use client'
import Link from "next/link"
import styles from "../../../../../styles/getStyles.module.scss"
import {  Container } from "reactstrap"
import Sections from "@/app/portfolio/aboutme/me"
import { useState } from "react"




const IndexDescription=()=>{
    const [open,setOpen]=useState<number|null>(null)

return(
    <main className={styles.main4} >
        <div className={styles.center}>
       
          <p className={styles.title}>
            Full Stack Web Developer focus on JavaScript/TypeScript, React,
            Node.js and PostgreSQL.
          </p>
<Container className={styles.content}>
  {Sections.map((section, index) => (
    <div className={styles.acc} key={section.title}>
      <h3
        className={styles.title}
        onClick={() =>
          setOpen(open === index ? null : index)
        }
      >
        {section.title}
      </h3>

      {open === index && (
        <div className={styles.content}>
          <p>{section.content}</p>
        </div>
      )}
    </div>
  ))}
</Container>

                <Link href="mailto:ewerton.60@hotmail.com">
            <button className={styles.contactButton}>Contact me</button>
          </Link>
          </div>
    </main>
)
}
export default IndexDescription

