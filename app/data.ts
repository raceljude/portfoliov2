export const profile = {
  name: "Racel Jude Marahay",
  title: "Software Developer",
  tagline: "Building things that work — from full-stack apps to automated business systems.",
  phone: "+639683971574",
  email: "raceljude@gmail.com",
  address: "3913 Quingua St. Brgy. Pinagkaisahan, Makati City",
  languages: ["English", "Tagalog"],
};

export const education = {
  school: "National University — Manila",
  degree: "Bachelor of Science in Information Technology",
  major: "Major in Mobile and Web Application",
  years: "2019 – 2024",
};

export const skills = [
  { label: "PERN & MERN Stack", category: "fullstack" },
  { label: "ReactJS", category: "frontend" },
  { label: "Tailwind CSS", category: "frontend" },
  { label: "Vite", category: "frontend" },
  { label: "JavaScript", category: "language" },
  { label: "TypeScript", category: "language" },
  { label: "Restful API", category: "backend" },
  { label: "Node.js / Express", category: "backend" },
  { label: "Websocket", category: "backend" },
  { label: "Git", category: "devops" },
  { label: "CI/CD Pipeline", category: "devops" },
  { label: "Render", category: "devops" },
  { label: "Vercel", category: "devops" },
  { label: "Google Cloud Console", category: "cloud" },
  { label: "Google Appsheet", category: "cloud" },
  { label: "BigQuery", category: "cloud" },
  { label: "Apps Script", category: "cloud" },
];

export const projects = [
  {
    id: "waste-wise",
    title: "Waste Wise Web",
    url: "https://waste-wise-free.onrender.com",
    description:
      "College project donated to CEMO Marikina. A waste management web platform built for real-world civic use.",
    role: "Mainly contributed as frontend and devops of the project.",
    tags: ["Frontend", "DevOps", "Full Stack"],
    color: "#d1675a",
    featured: true,
  },
  {
    id: "lccad",
    title: "LCCAD Holdings Website",
    url: "https://lccadholdings.com",
    description:
      "Official website for LCCAD Holdings — a corporate web presence built for a professional audience.",
    role: "Mainly contributed as frontend of the project.",
    tags: ["Frontend"],
    color: "#398eb2",
    featured: false,
  },
  {
    id: "3b-website",
    title: "3B Technologies Website",
    url: "https://threebtechincwebsite.onrender.com",
    description:
      "Official company website for 3B Technologies Solutions Incorporated — showcasing their services and identity.",
    role: "Mainly contributed as frontend of the project.",
    tags: ["Frontend"],
    color: "#96312e",
    featured: false,
  },
  {
    id: "lucky-break",
    title: "Lucky Break Website",
    url: "https://lucky-break.onrender.com",
    description:
      "Billiards gambling platform for Lucky Taya group of companies — built with frontend, devops, and minor backend contributions.",
    role: "Mainly contributed as devops and frontend with minor backend of the project.",
    tags: ["Frontend", "DevOps", "Backend"],
    color: "#ffbf6b",
    featured: true,
  },
  {
    id: "top-asia-talent",
    title: "Top Asia Talent Portal",
    url: "https://www.topasiamanagement.com/TalentPortal",
    description:
      "Official talent portal for Top Asia Management Solutions — a full-stack internal system for HR and recruitment.",
    role: "Mainly contributed as the full stack developer of the project.",
    tags: ["Frontend", "Full Stack"],
    color: "#d1675a",
    featured: true,
  },
];

export const experiences = [
  {
    id: "top-asia",
    role: "Junior Application Developer",
    company: "Top Asia Management Solutions Incorporated",
    period: "April 2025 – Present",
    location: "219 Wilson St. Greenhills, San Juan City",
    status: "current",
    color: "#d1675a",
    summary:
      "Building Google Workspace-powered internal tools — from HRIS to ticketing systems — that streamline operations for Top Asia Management.",
    highlights: [
      "Developed a Ticketing System, Inventory Management, and HRIS System using Google Workspace tools",
      "Built an Employee Portal covering payslip dashboard, leave availment, and ticket submission",
      "Centralized HRIS database using Google Cloud Bucket, BigQuery, and Apps Script for scalable data pipelines",
      "Engineered a chatbot for employee inquiries — Vite + TypeScript on the frontend, Node + Express on the backend",
      "Created a simple shopping app using Appsheet and Google Sheets for lightweight commerce workflows",
      "Automated business processes across the organization using Appsheet, Apps Script, and Google Cloud Console",
    ],
    stack: ["Google Workspace", "Appsheet", "Apps Script", "BigQuery", "Vite", "TypeScript", "Node.js", "Express", "Google Cloud"],
  },
  {
    id: "3b-tech",
    role: "Junior Software Developer",
    company: "3B Technologies Solutions Incorporated",
    period: "August 2024 – January 2025",
    location: "Unit 404 Crowne Bay Tower, Roxas Blvd, Parañaque",
    status: "past",
    color: "#398eb2",
    summary:
      "Client-facing full-stack development using MERN and PERN stacks, shipping production software with modern frontend tooling and managed deployments.",
    highlights: [
      "Developed client-driven software using MERN and PERN stacks tailored to specific business requirements",
      "Managed Git version control and maintained CI/CD pipelines via Render, Vercel, and GitHub",
      "Built frontend interfaces with ReactJS and TailwindCSS for polished, responsive user experiences",
    ],
    stack: ["ReactJS", "Tailwind CSS", "Node.js", "Express", "PostgreSQL", "MongoDB", "Git", "Render", "Vercel"],
  },
  {
    id: "hilmarcs",
    role: "Technical Support Intern",
    company: "Hilmarcs Construction Corporation",
    period: "January 2024 – August 2024",
    location: "1835 E Rodriguez Sr. Ave, Cubao, Quezon City",
    status: "past",
    color: "#96312e",
    summary:
      "Hands-on technical support across multiple company locations — keeping hardware and software running smoothly in a construction company environment.",
    highlights: [
      "Resolved software and hardware malfunctions across the company's systems",
      "Deployed to various branch locations to provide thorough on-site technical assistance",
      "Performed hardware maintenance, including updates and physical upkeep",
    ],
    stack: ["Hardware Maintenance", "Software Troubleshooting", "IT Support", "Field Deployment"],
  },
];
