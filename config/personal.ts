// ─────────────────────────────────────────────────────────────
//  PERSONAL CONFIG — edit this file to update your portfolio
//  All personal details, experiences, projects live here.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name:         "Racel Jude Marahay",
  firstName:    "Racel Jude",
  lastName:     "Marahay",
  initials:     "RJ",
  title:        "Software Developer",

  // ── Rotating job titles shown in the hero (edit order/wording freely)
  titles: [
    "Software Developer",
    "Full-Stack Developer",
    "Frontend Engineer",
    "React Developer",
    "Node.js Developer",
    "Google Workspace Developer",
    "Application Developer",
    "IT Support Specialist",
  ],
  tagline:      "Building things that work — from full-stack apps to automated business systems.",

  // ── Contact ─────────────────────────────────────────────────
  email:        "raceljude@gmail.com",
  phone:        "+639683971574",
  phoneDisplay: "+63 968 397 1574",
  location:     "Makati City, Metro Manila, PH",
  locationShort:"Makati, Metro Manila",
  phoneHint:    "Mon–Fri, 9AM–6PM PHT",
  locationHint: "Open to remote and on-site",

  // ── Social ──────────────────────────────────────────────────
  github:          "https://github.com/raceljude",
  githubDisplay:   "github.com/raceljude",
  linkedin:        "https://www.linkedin.com/in/racel-jude-marahay-76b15a29b",
  linkedinDisplay: "racel-jude-marahay",

  // ── Status ──────────────────────────────────────────────────
  available:     true,
  availableText: "Open to opportunities",
  statusText:    "Open to hire",
  statusHint:    "Actively looking for opportunities",

  // ── Copy displayed in components ────────────────────────────
  hireMeHeading:    "Let's work together",
  hireMeSubtext:    "I'm open to full-time, freelance, and contract opportunities. Reach out through any of the channels below.",
  ctaHeading:       "Drop me a message",
  ctaSubtext:       "I typically respond within 24 hours.",
  contactHeading:   "Let's work together",
  contactSubtext:   "I'm open to full-time roles, freelance projects, and contract work. Whether you have a project in mind or just want to connect — reach out.",

  // ── Site metadata ────────────────────────────────────────────
  siteTitle:       "Racel Jude Marahay — Software Developer",
  siteDescription: "Junior Software Developer specializing in MERN/PERN stack, Google Workspace automation, and full-stack web applications.",

  languages: ["English", "Tagalog"],
};

export const education = {
  school: "National University — Manila",
  degree: "Bachelor of Science in Information Technology",
  major:  "Major in Mobile and Web Application",
  years:  "2019 – 2024",
  badge:  "BSIT",
};

// Flat list used by the small SkillBadge component in the sidebar
export const skills = [
  { label: "PERN & MERN Stack",    category: "fullstack" },
  { label: "ReactJS",              category: "frontend"  },
  { label: "Tailwind CSS",         category: "frontend"  },
  { label: "Vite",                 category: "frontend"  },
  { label: "JavaScript",           category: "language"  },
  { label: "TypeScript",           category: "language"  },
  { label: "Restful API",          category: "backend"   },
  { label: "Node.js / Express",    category: "backend"   },
  { label: "Websocket",            category: "backend"   },
  { label: "Git",                  category: "devops"    },
  { label: "CI/CD Pipeline",       category: "devops"    },
  { label: "Render",               category: "devops"    },
  { label: "Vercel",               category: "devops"    },
  { label: "Google Cloud Console", category: "cloud"     },
  { label: "Google Appsheet",      category: "cloud"     },
  { label: "BigQuery",             category: "cloud"     },
  { label: "Apps Script",          category: "cloud"     },
];

// ─── FULL SKILLS SECTION ───────────────────────────────────────
// Each group = one category tab. Each skill has:
//   label    — display name
//   where    — comma-separated list of places this skill was used
//   level    — 1–5 proficiency dots
export const skillGroups = [
  {
    id:    "frontend",
    label: "Frontend",
    color: "#398eb2",
    icon:  "Monitor",
    desc:  "UI frameworks, styling, and build tools used to build user-facing interfaces.",
    skills: [
      { label: "ReactJS",         level: 5, where: ["3B Technologies", "Top Asia Portal", "Personal Projects"] },
      { label: "TypeScript",      level: 4, where: ["Top Asia Chatbot", "Employee Portal"] },
      { label: "JavaScript",      level: 5, where: ["All Projects"] },
      { label: "Tailwind CSS",    level: 5, where: ["3B Technologies", "Top Asia Portal", "Waste Wise"] },
      { label: "Vite",            level: 4, where: ["Top Asia Chatbot", "Internal Tools"] },
      { label: "HTML5 / CSS3",    level: 5, where: ["All Web Projects"] },
      { label: "Google Appsheet", level: 4, where: ["Top Asia — Shopping App", "HR Workflows"] },
    ],
  },
  {
    id:    "backend",
    label: "Backend",
    color: "#d1675a",
    icon:  "Server",
    desc:  "Server-side logic, APIs, and real-time communication tools.",
    skills: [
      { label: "Node.js",         level: 4, where: ["3B Technologies", "Top Asia Chatbot"] },
      { label: "Express.js",      level: 4, where: ["3B Technologies", "Top Asia Chatbot", "REST APIs"] },
      { label: "REST API Design", level: 4, where: ["3B Technologies", "Top Asia Portal"] },
      { label: "WebSocket",       level: 3, where: ["Real-time Features", "3B Technologies"] },
      { label: "Apps Script",     level: 4, where: ["Top Asia — HRIS", "Automation Workflows"] },
      { label: "PostgreSQL",      level: 3, where: ["PERN Stack Projects"] },
      { label: "MongoDB",         level: 3, where: ["MERN Stack Projects"] },
    ],
  },
  {
    id:    "devops",
    label: "DevOps & Deployment",
    color: "#ffbf6b",
    icon:  "GitBranch",
    desc:  "Version control, deployment pipelines, and hosting platforms.",
    skills: [
      { label: "Git",             level: 5, where: ["All Projects"] },
      { label: "GitHub",          level: 5, where: ["All Projects"] },
      { label: "CI/CD Pipelines", level: 4, where: ["3B Technologies", "Waste Wise"] },
      { label: "Vercel",          level: 4, where: ["3B Technologies", "Top Asia Portal", "Lucky Break"] },
      { label: "Render",          level: 4, where: ["Waste Wise", "3B Technologies", "Lucky Break"] },
      { label: "GitHub Actions",  level: 3, where: ["Automated Deployments"] },
    ],
  },
  {
    id:    "cloud",
    label: "Cloud & Automation",
    color: "#153d52",
    icon:  "Cloud",
    desc:  "Cloud infrastructure, data platforms, and business process automation.",
    skills: [
      { label: "Google Cloud Console", level: 4, where: ["Top Asia — HRIS System", "Cloud Bucket Storage"] },
      { label: "BigQuery",             level: 3, where: ["Top Asia — HRIS Database"] },
      { label: "Google Cloud Bucket",  level: 3, where: ["Top Asia — Centralized HRIS"] },
      { label: "Google Appsheet",      level: 4, where: ["Top Asia — Shopping App", "Inventory System"] },
      { label: "Apps Script",          level: 4, where: ["Top Asia — HRIS Automation", "Business Workflows"] },
      { label: "Google Workspace",     level: 5, where: ["Top Asia — All Internal Tools"] },
    ],
  },
  {
    id:    "tools",
    label: "Tools & Platforms",
    color: "#96312e",
    icon:  "Wrench",
    desc:  "Development tools, productivity software, and support platforms used day-to-day.",
    skills: [
      { label: "VS Code",              level: 5, where: ["All Development Work"] },
      { label: "Postman",              level: 4, where: ["API Testing — All Projects"] },
      { label: "Figma",                level: 3, where: ["UI Design References"] },
      { label: "Google Workspace",     level: 5, where: ["Top Asia — Internal Systems"] },
      { label: "Hardware Maintenance", level: 4, where: ["Hilmarcs — Field IT Support"] },
      { label: "IT Troubleshooting",   level: 4, where: ["Hilmarcs — Multi-branch Support"] },
    ],
  },
];

export const experiences = [
  {
    id:       "top-asia",
    role:     "Junior Application Developer",
    company:  "Top Asia Management Solutions Incorporated",
    period:   "April 2025 – Present",
    location: "219 Wilson St. Greenhills, San Juan City",
    status:   "current",
    color:    "#d1675a",
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
    stack: ["Google Workspace","Appsheet","Apps Script","BigQuery","Vite","TypeScript","Node.js","Express","Google Cloud"],
  },
  {
    id:       "3b-tech",
    role:     "Junior Software Developer",
    company:  "3B Technologies Solutions Incorporated",
    period:   "August 2024 – January 2025",
    location: "Unit 404 Crowne Bay Tower, Roxas Blvd, Parañaque",
    status:   "past",
    color:    "#398eb2",
    summary:
      "Client-facing full-stack development using MERN and PERN stacks, shipping production software with modern frontend tooling and managed deployments.",
    highlights: [
      "Developed client-driven software using MERN and PERN stacks tailored to specific business requirements",
      "Managed Git version control and maintained CI/CD pipelines via Render, Vercel, and GitHub",
      "Built frontend interfaces with ReactJS and TailwindCSS for polished, responsive user experiences",
    ],
    stack: ["ReactJS","Tailwind CSS","Node.js","Express","PostgreSQL","MongoDB","Git","Render","Vercel"],
  },
  {
    id:       "hilmarcs",
    role:     "Technical Support Intern",
    company:  "Hilmarcs Construction Corporation",
    period:   "January 2024 – August 2024",
    location: "1835 E Rodriguez Sr. Ave, Cubao, Quezon City",
    status:   "past",
    color:    "#96312e",
    summary:
      "Hands-on technical support across multiple company locations — keeping hardware and software running smoothly in a construction company environment.",
    highlights: [
      "Resolved software and hardware malfunctions across the company's systems",
      "Deployed to various branch locations to provide thorough on-site technical assistance",
      "Performed hardware maintenance, including updates and physical upkeep",
    ],
    stack: ["Hardware Maintenance","Software Troubleshooting","IT Support","Field Deployment"],
  },
];

export const projects = [
  {
    id:          "waste-wise",
    title:       "Waste Wise Web",
    url:         "https://waste-wise-free.onrender.com",
    description: "College project donated to CEMO Marikina. A waste management web platform built for real-world civic use.",
    role:        "Mainly contributed as frontend and devops of the project.",
    tags:        ["Frontend","DevOps","Full Stack"],
    color:       "#d1675a",
    featured:    true,
  },
  {
    id:          "lccad",
    title:       "LCCAD Holdings Website",
    url:         "https://lccadholdings.com",
    description: "Official website for LCCAD Holdings — a corporate web presence built for a professional audience.",
    role:        "Mainly contributed as frontend of the project.",
    tags:        ["Frontend"],
    color:       "#398eb2",
    featured:    false,
  },
  {
    id:          "3b-website",
    title:       "3B Technologies Website",
    url:         "https://threebtechincwebsite.onrender.com",
    description: "Official company website for 3B Technologies Solutions Incorporated.",
    role:        "Mainly contributed as frontend of the project.",
    tags:        ["Frontend"],
    color:       "#96312e",
    featured:    false,
  },
  {
    id:          "lucky-break",
    title:       "Lucky Break Website",
    url:         "https://lucky-break.onrender.com",
    description: "Billiards gambling platform for Lucky Taya group of companies.",
    role:        "Mainly contributed as devops and frontend with minor backend.",
    tags:        ["Frontend","DevOps","Backend"],
    color:       "#ffbf6b",
    featured:    true,
  },
  {
    id:          "top-asia-talent",
    title:       "Top Asia Talent Portal",
    url:         "https://www.topasiamanagement.com/TalentPortal",
    description: "Official talent portal for Top Asia Management Solutions — a full-stack internal HR and recruitment system.",
    role:        "Mainly contributed as the full stack developer of the project.",
    tags:        ["Frontend","Full Stack"],
    color:       "#d1675a",
    featured:    true,
  },
];
