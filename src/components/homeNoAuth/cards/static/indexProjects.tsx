"use client";


import styles from "../../../../../styles/getStyles.module.scss";

import SlideComponent from "@/src/components/common/slideComponent";
import ProjectCard, { ProjectCardProps } from "./projectsCard";
import projects, { Project } from "./projects";


const IndexProjects = (  ) => {


  return (
    <main className={styles.main5} data-aos="fade-left" data-aos-duration="2000">
      <div className="d-flex flex-wrap flex-column justify-content-center align-items-center mt-10 mb-10">
        <h1 className={styles.title}>
          Bem-vindo(a) ao portfólio de Ewerton Silva de Abreu
        </h1>
        <p className={styles.subtitle}>Projetos FullStack com JS</p>

        <div className={styles.projects}>
  <SlideComponent itemsLength={projects.length}>
  {projects.map((project) => (
    <ProjectCard
      key={project.id}
      project={project}
    />
  ))}
</SlideComponent>
        </div>
      </div>
    </main>
  );
};

export default IndexProjects;
