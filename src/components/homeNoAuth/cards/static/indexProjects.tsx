"use client";

import Link from "next/link";
import styles from "../../../../../styles/getStyles.module.scss";
import { useRouter } from "next/navigation";  

const IndexProjects = () => {
  const router = useRouter();

  return (
    <main className={styles.main5} data-aos="fade-left" data-aos-duration="2000">
      <div className="d-flex flex-wrap flex-column justify-content-center align-items-center mt-10 mb-10">
        <h1 className={styles.title}>
          Bem-vindo(a) ao portfólio de Ewerton Silva de Abreu
        </h1>
        <p className={styles.subtitle}>Projetos FullStack com JS</p>

        <div className={styles.projects}>
          <div className={styles.container}>
            <img src="/ComandasApp.jpg" alt="" className={styles.slideImg} />
            <p>
           This is the frontend of ComandasApp, a restaurant management application built with HTML, Bootstrap, React.js, and Next.js. The application uses a hybrid rendering approach, combining Server-Side Rendering (SSR) with client-side React features to provide fast initial page loads and a smooth, interactive user experience. Click "View Front-end" to explore the application. 
            </p>

            <button
              className={styles.contactButton}
              onClick={() => router.push("/indexComandas")}
            >
              Ver Front-End
            </button>
          </div>

          <Link
            href="https://api.esadev.com.br/admin"
            target="_blank"
            className={styles.container}
          >
            <img src="/ComandasApp.jpg" alt="" className={styles.slideImg} />
            <p>
             This is the backend of ComandasApp, a monolithic REST API developed with Node.js, Express.js, TypeScript, PostgreSQL, and AdminJS. It handles authentication, business logic, and data persistence while serving the frontend application. The project also features an AdminJS dashboard for managing application resources through a web interface. Click "View Backend" to explore the project.
            </p>
            <button className={styles.contactButton}>View Back-End</button>
          </Link>

          <Link
            href="https://blackjs-six.vercel.app"
            target="_blank"
            className={styles.container}
          >
            <img src="/vercel.svg" alt="" className={styles.slideImg} />
            <p>
This is a study project built with Next.js and React.js that simulates an e-commerce application. Users can browse products, add them to the shopping cart, and view the total price updated in real time. The project focuses on the shopping experience and does not include checkout or payment features. Click "View Project" below to explore it.
            </p>
            <button className={styles.contactButton}>Ver na Vercel</button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default IndexProjects;
