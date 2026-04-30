"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, GraduationCap, Github, Linkedin } from "lucide-react";
import ExperienceCard from "@/components/ExperienceCard";
import ExperienceModal from "@/components/ExperienceModal";
import SkillBadge from "@/components/SkillBadge";
import ProjectCard from "@/components/ProjectCard";
import ExperienceDetailSection from "@/components/ExperienceDetailSection";
import ScrollBackground from "@/components/ScrollBackground";
import Navbar from "@/components/Navbar";
import { profile, education, skills, experiences, projects } from "./data";

type Experience = (typeof experiences)[number];

export default function Home() {
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const isDark = theme === "dark";
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  // Theme tokens for inline cards on this page
  const bg      = isDark ? "#0f0f0f" : "#f0ebe0";
  const card    = isDark ? "#141414" : "#ede8df";
  const border  = isDark ? "#2a2a2a" : "#d0c8bc";
  const textPri = isDark ? "#f5f0e8" : "#1a1008";
  const textSec = isDark ? "#8a8070" : "#7a6858";
  const textMut = isDark ? "#6a6058" : "#9a8878";
  const textDim = isDark ? "#4a4040" : "#b0a090";
  const langTxt = isDark ? "#c8c0b0" : "#4a3828";
  const divider = isDark ? "#2a2a2a" : "#d0c8bc";
  const footerB = isDark ? "#1e1e1e" : "#d8d0c4";

  return (
    <>
      <div style={{ background: bg, color: textPri, minHeight: "100vh", transition: "background 0.4s ease, color 0.4s ease" }}>
        <Navbar theme={theme} onThemeToggle={toggleTheme} />
        <ScrollBackground theme={theme} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-6 pb-10 sm:px-6 lg:px-8">

          {/* ─── HERO ─── */}
          <header id="about" className="mb-10 scroll-mt-20"
            style={{ animation: "fadeUp 0.7s ease forwards", opacity: 0 }}>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                {/* Status badge */}
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#c8602a] bg-[#c8602a]/10 border border-[#c8602a]/20 px-3 py-1 rounded-full mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c8602a] animate-pulse" />
                  Open to opportunities
                </div>

                <h1 className="text-4xl sm:text-5xl font-display font-extrabold leading-none tracking-tight"
                  style={{ fontFamily: "var(--font-display)", color: textPri }}>
                  {profile.name.split(" ").map((word, i) => (
                    <span key={i} style={{ color: i === 2 ? "#c8602a" : textPri }}>{word}{" "}</span>
                  ))}
                </h1>

                <p className="mt-2 font-mono text-sm tracking-wider uppercase" style={{ color: textSec }}>
                  {profile.title}
                </p>
                <p className="mt-3 max-w-md text-sm leading-relaxed" style={{ color: textSec }}>
                  {profile.tagline}
                </p>
              </div>

              {/* Contact cluster */}
              <div className="flex flex-col gap-2 text-xs font-mono shrink-0" style={{ color: textMut }}>
                <a href={`mailto:${profile.email}`}
                  className="flex items-center gap-2 hover:text-[#c8602a] transition-colors">
                  <Mail size={12} />{profile.email}
                </a>
                <a href={`tel:${profile.phone}`}
                  className="flex items-center gap-2 hover:text-[#c8602a] transition-colors">
                  <Phone size={12} />{profile.phone}
                </a>
                <span className="flex items-center gap-2">
                  <MapPin size={12} />Makati, Metro Manila
                </span>
                <div className="flex items-center gap-3 mt-1">
                  <a href="https://github.com/raceljude" target="_blank" rel="noopener noreferrer"
                    className="p-1.5 rounded-md transition-all hover:text-[#c8602a]"
                    style={{ border: `1px solid ${border}` }} aria-label="GitHub">
                    <Github size={13} />
                  </a>
                  <a href="https://www.linkedin.com/in/racel-jude-marahay-76b15a29b" target="_blank" rel="noopener noreferrer"
                    className="p-1.5 rounded-md transition-all hover:text-[#c8602a]"
                    style={{ border: `1px solid ${border}` }} aria-label="LinkedIn">
                    <Linkedin size={13} />
                  </a>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="mt-8 h-px" style={{ background: `linear-gradient(to right, rgba(200,96,42,0.4), ${divider}, transparent)` }} />
          </header>

          {/* ─── GRID ─── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* ─── LEFT COL ─── */}
            <div className="flex flex-col gap-6">

              {/* Education */}
              <section className="rounded-xl p-5"
                style={{
                  background: card, border: `1px solid ${border}`,
                  animation: "fadeUp 0.6s ease 0.15s forwards", opacity: 0,
                  transition: "background 0.3s, border-color 0.3s",
                }}>
                <h2 className="text-xs font-mono uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: textSec }}>
                  <GraduationCap size={12} /> Education
                </h2>
                <p className="font-display font-semibold text-sm leading-snug" style={{ color: textPri }}>
                  {education.school}
                </p>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: textSec }}>{education.degree}</p>
                <p className="text-xs mt-0.5" style={{ color: textMut }}>{education.major}</p>
                <div className="mt-3 pt-3 flex items-center justify-between" style={{ borderTop: `1px solid ${border}` }}>
                  <span className="text-xs font-mono" style={{ color: textMut }}>{education.years}</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#c8602a]/10 text-[#c8602a] border border-[#c8602a]/20">
                    BSIT
                  </span>
                </div>
              </section>

              {/* Languages */}
              <section className="rounded-xl p-5"
                style={{
                  background: card, border: `1px solid ${border}`,
                  animation: "fadeUp 0.6s ease 0.2s forwards", opacity: 0,
                  transition: "background 0.3s, border-color 0.3s",
                }}>
                <h2 className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: textSec }}>
                  Languages
                </h2>
                <div className="flex flex-col gap-2">
                  {profile.languages.map((lang) => (
                    <div key={lang} className="flex items-center justify-between">
                      <span className="text-sm" style={{ color: langTxt }}>{lang}</span>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-5 h-1 rounded-sm"
                            style={{ background: "#c8602a" }} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Skills */}
              <section className="rounded-xl p-5"
                style={{
                  background: card, border: `1px solid ${border}`,
                  animation: "fadeUp 0.6s ease 0.25s forwards", opacity: 0,
                  transition: "background 0.3s, border-color 0.3s",
                }}>
                <h2 className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: textSec }}>
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <SkillBadge key={skill.label} skill={skill} index={i} isDark={isDark} />
                  ))}
                </div>
              </section>
            </div>

            {/* ─── RIGHT COL (Experience Cards) ─── */}
            <div id="experience" className="lg:col-span-2 flex flex-col gap-4 scroll-mt-20">
              <div className="flex items-center justify-between"
                style={{ animation: "fadeUp 0.6s ease 0.1s forwards", opacity: 0 }}>
                <h2 className="text-xs font-mono uppercase tracking-widest flex items-center gap-2" style={{ color: textSec }}>
                  Experience
                  <span style={{ color: textDim }}>— click to explore</span>
                </h2>
                <span className="text-xs font-mono" style={{ color: textDim }}>{experiences.length} roles</span>
              </div>

              {experiences.map((exp, i) => (
                <ExperienceCard
                  key={exp.id}
                  experience={exp}
                  index={i}
                  onClick={setSelectedExp}
                  isDark={isDark}
                />
              ))}
            </div>
          </div>

          {/* ─── DETAILED EXPERIENCE ─── */}
          <ExperienceDetailSection experiences={experiences} isDark={isDark} />

          {/* ─── PROJECTS ─── */}
          <section id="projects" className="mt-10 scroll-mt-20">
            <div className="flex items-center justify-between mb-5"
              style={{ animation: "fadeUp 0.6s ease 0.3s forwards", opacity: 0 }}>
              <h2 className="text-xs font-mono uppercase tracking-widest flex items-center gap-2" style={{ color: textSec }}>
                Featured Projects
                <span style={{ color: textDim }}>— click to visit</span>
              </h2>
              <span className="text-xs font-mono" style={{ color: textDim }}>{projects.length} projects</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} isDark={isDark} />
              ))}
            </div>
          </section>

          {/* ─── FOOTER / CONTACT ─── */}
          <footer id="contact" className="mt-10 pt-6 scroll-mt-20"
            style={{
              borderTop: `1px solid ${footerB}`,
              animation: "fadeIn 0.6s ease 0.8s forwards", opacity: 0,
            }}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-xs font-mono" style={{ color: textMut }}>
                <a href="mailto:raceljude@gmail.com"
                  className="hover:text-[#c8602a] transition-colors flex items-center gap-1.5">
                  <Mail size={11} /> raceljude@gmail.com
                </a>
                <a href="tel:+639683971574"
                  className="hover:text-[#c8602a] transition-colors flex items-center gap-1.5">
                  <Phone size={11} /> +63 968 397 1574
                </a>
              </div>
              <p className="text-xs font-mono" style={{ color: isDark ? "#3a3030" : "#b0a090" }}>
                Built with Next.js · Deployed on Vercel
              </p>
            </div>
          </footer>

        </div>
      </div>

      {/* Modal */}
      <ExperienceModal experience={selectedExp} onClose={() => setSelectedExp(null)} isDark={isDark} />

      <style jsx global>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </>
  );
}
