import { useState } from "react";

type AccProps={
title:string,
content:string
}
  const Sections:AccProps[]=[
    {
         title: "Who I am",
         content:"Hi, I'm Ewerton Silva de Abreu, a Full Stack JavaScript/TypeScript Developer passionate about building modern, scalable, and user-friendly web applications. I enjoy transforming ideas into complete digital solutions by developing both frontend interfaces and backend services."
    },
    {
        title:"My Journey",
        content: "My interest in programming started with a curiosity about how websites and applications work. As I learned more, that curiosity became a passion for software development. Since then, I've been continuously improving my skills by building personal projects and studying modern web technologies."
 
    },
    {
        title:"Tech Stack",
        content: `My primary technologies include:
JavaScript
TypeScript
React
Next.js
Node.js
Express.js
PostgreSQL
Bootstrap
HTML & CSS

I also have experience working with REST APIs, authentication, Server-Side Rendering (SSR), responsive design, Git, and modern development workflows.`
    },
    {
        title:"What I Enjoy Building",
        content:"I enjoy creating full stack web applications that combine intuitive user interfaces with robust backend services. I'm particularly interested in developing responsive applications, designing scalable APIs, and building software that provides a smooth and efficient user experience."
    },
    {
        title:"Project Experience",
        content:"In addition to my personal portfolio projects, I've gained practical experience by contributing to development projects through Revelo. These experiences allowed me to work with modern technologies, improve my problem-solving skills, collaborate on real development tasks, and strengthen my understanding of professional software development practices."
    },
    {
        title:"Professional Goals",
        content:"My goal is to join a collaborative development team where I can continue learning, contribute to meaningful projects, and grow as a Full Stack Developer. I'm always looking for opportunities to expand my knowledge, take on new challenges, and build high-quality software that creates value for users."
    }
  ]

  export default Sections