import styles from "@/styles/getStyles.module.scss"
import { useRouter } from "next/navigation"
import { Project } from "./projects"

export interface ProjectCardProps{
    project:Project
}
const ProjectCard=({project}:ProjectCardProps)=>{
    const router= useRouter()
    
    return(
 <div className={styles.projects}>
          <div className={styles.container}>
            <img src={project.image} alt="" className={styles.slideImg} />
            <p>
           {project.description}
            </p>

            <button
              className={styles.contactButton}
              onClick={() => router.push(project.href)}
            >
             {project.title}
            </button>
          </div>
</div>

          )

}
export default ProjectCard