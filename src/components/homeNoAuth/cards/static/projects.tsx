export interface Project {
  id: number;
  image: string;
  description: string;
  title: string;
  href: string;
  type: "internal" | "external";
}

const projects:Project[]=[
  {
    id:1,
    type:'internal',
    image:"/front.jpg",
    title:"Frontend",
    description: `This is the frontend of ComandasApp, a restaurant management application built with HTML, Bootstrap, React.js, and Next.js. The application uses a hybrid rendering approach, combining Server-Side Rendering (SSR) with client-side React features to provide fast initial page loads and a smooth, interactive user experience. Click "View Front-end" to explore the application.`,
  href:"/indexComandas"
  },
  {
      id:2,
    type:'external',
    image:"/test.jpg",
    title:"Backend",
    description:`This is the backend of ComandasApp, a monolithic REST API developed with Node.js, Express.js, TypeScript, PostgreSQL, and AdminJS. It handles authentication, business logic, and data persistence while serving the frontend application. The project also features an AdminJS dashboard for managing application resources through a web interface. Click "View Backend" to explore the project.`,
    href:"https://api.esadev.com.br/admin"

  },
  {
      id:3,
    type:'external',
    image:"/black.png",
    title:"Black Js",
    description:`This is a study project built with Next.js and React.js that simulates an e-commerce application. Users can browse products, add them to the shopping cart, and view the total price updated in real time. The project focuses on the shopping experience and does not include checkout or payment features. Click "View Project" below to explore it.`
 ,
    href:"https://blackjs-six.vercel.app"
  },
  {
    id:4,
    type:"external",
    image:"/download.png",
    title:"eCommerce frontend",
description: `This is a prototype e-commerce frontend built with Vanilla JavaScript, HTML, and CSS. The project focuses on fundamental web development concepts, including DOM manipulation, asynchronous data fetching, shopping cart management, and responsive user interface design. It currently uses a static JSON file as a mock data source.`,
    href:"https://fake-api-xi-two.vercel.app/"

  }
]
export default projects