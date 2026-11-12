import { useState } from "react";

type AccProps={
title:string,
content:string
}
const Sections:AccProps[]=[
{
"title": "Who I am",
"content": "I am a Full Stack developer who builds custom software for clients starting or structuring new businesses, each with its own unique set of business rules. I work across the entire development lifecycle—from designing database schemas in PostgreSQL and building secure REST APIs to deploying and managing Linux VPS environments with Docker, NGINX, and PM2. My experience ranges from production systems like ComandasApp, a real-time order management platform, to international freelance work involving 3D WebGL (Three.js) and generative AI benchmarks (TerminalBench)."
},
{
"title": "My Journey",
"content": "My path into tech wasn't conventional. It started on the mechanical assembly lines at Mercedes-Benz when I was 16, while I was still completing my education. Working full-time in heavy industry instilled a deep sense of operational discipline, process efficiency, and problem-solving under pressure. I later pivoted into software engineering, combining that industrial rigor with modern full-stack development to build tangible, real-world solutions."
},
{
"title": "Tech Stack",
"content": "Core Technologies: TypeScript, JavaScript, React, Next.js (App Router), Node.js, Express.js, and PostgreSQL. \n\nArchitecture & Delivery: REST APIs, JWT authentication, Server-Side Rendering (SSR), Git, and deployment pipelines using Docker, NGINX, PM2, and Linux VPS."
},
{
"title": "What I Enjoy Building",
"content": "I thrive on building applications that streamline daily operations, eliminate logistics bottlenecks, and directly boost business efficiency. Whether it's optimizing workflows for service staff or building tools that increase profitability, I focus on software that delivers clear, measurable value to real clients."
},
{
"title": "Project Experience",
"content": "Beyond my personal portfolio, I have gained professional experience contributing to diverse development projects via Revelo. My scope of work has ranged from full-stack web applications and Figma UI design to specialized technical tasks, such as resolving long-horizon issues and oracle tests for TerminalBench 2.0, as well as developing immersive 3D web experiences with Three.js. These opportunities allowed me to collaborate on real-world engineering tasks, master modern tech stacks, and sharpen my problem-solving skills in professional development environments."
}
]

export default Sections