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

  return (
    <>
      <div
        style={{
          background: isDark ? "#0f0f0f" : "#f0ebe0",
          color: isDark ? "#f5f0e8" : "#1a1008",
          minHeight: "100vh",
          transition: "background 0.4s ease, color 0.4s ease",
        }}
      >
        <Navbar theme={theme} onThemeToggle={toggleTheme} />
        <ScrollBackground theme={theme} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-6 pb-10 sm:px-6 lg:px-8">
          {/* ─── HERO ─── */}
          <header
            id="about"
            className="mb-10 scroll-mt-20"
            style={{ animation: "fadeUp 0.7s ease forwards", opacity: 0 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                {/* Status */}
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#c8602a] bg-[#c8602a]/10 border border-[#c8602a]/20 px-3 py-1 rounded-full mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c8602a] animate-pulse" />
                  Open to opportunities
                </div>

                {/* Name */}
                <h1
                  className="text-4xl sm:text-5xl font-display font-extrabold leading-none tracking-tight"
                  style={{ fontFamily: "var(--font-display)", color: isDark ? "#f5f0e8" : "#1a1008" }}
                >
                  {profile.name.split(" ").map((word, i) => (
                    <span key={i} className={i === 2 ? "text-[#c8602a]" : ""}>
                      {word}{" "}
                    </span>
                  ))}
                </h1>

                <p className="mt-2 font-mono text-sm tracking-wider uppercase" style={{ color: isDark ? "#8a8070" : "#9a7060" }}>
                  {profile.title}
                </p>

                <p className="mt-3 max-w-md text-sm leading-relaxed" style={{ color: isDark ? "#9a9080" : "#6a5040" }}>
                  {profile.tagline}
                </p>
              </div>

              {/* Contact cluster */}
              <div className="flex flex-col gap-2 text-xs font-mono text-[#6a6058] shrink-0">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-2 hover:text-[#c8602a] transition-colors"
                >
                  <Mail size={12} />
                  {profile.email}
                </a>
                <a
                  href={`tel:${profile.phone}`}
                  className="flex items-center gap-2 hover:text-[#c8602a] transition-colors"
                >
                  <Phone size={12} />
                  {profile.phone}
                </a>
                <span className="flex items-center gap-2">
                  <MapPin size={12} />
                  Makati, Metro Manila
                </span>
                <div className="flex items-center gap-3 mt-1">
                  <a
                    href="https://github.com/raceljude"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-md border border-[#2a2a2a] hover:border-[#c8602a] hover:text-[#c8602a] transition-all"
                    aria-label="GitHub"
                  >
                    <Github size={13} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/racel-jude-marahay-76b15a29b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-md border border-[#2a2a2a] hover:border-[#c8602a] hover:text-[#c8602a] transition-all"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={13} />
                  </a>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="mt-8 h-px bg-gradient-to-r from-[#c8602a]/40 via-[#2a2a2a] to-transparent" />
          </header>

          {/* ─── GRID ─── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ─── LEFT COL ─── */}
            <div className="flex flex-col gap-6">
              {/* Education */}
              <section
                className="rounded-xl border border-[#2a2a2a] bg-[#141414] p-5"
                style={{ animation: "fadeUp 0.6s ease 0.15s forwards", opacity: 0 }}
              >
                <h2 className="text-xs font-mono text-[#8a8070] uppercase tracking-widest mb-4 flex items-center gap-2">
                  <GraduationCap size={12} />
                  Education
                </h2>
                <p className="text-[#f5f0e8] font-display font-semibold text-sm leading-snug">
                  {education.school}
                </p>
                <p className="text-[#8a8070] text-xs mt-1 leading-relaxed">{education.degree}</p>
                <p className="text-[#6a6058] text-xs mt-0.5">{education.major}</p>
                <div className="mt-3 pt-3 border-t border-[#2a2a2a] flex items-center justify-between">
                  <span className="text-xs font-mono text-[#6a6058]">{education.years}</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#c8602a]/10 text-[#c8602a] border border-[#c8602a]/20">
                    BSIT
                  </span>
                </div>
              </section>

              {/* Languages */}
              <section
                className="rounded-xl border border-[#2a2a2a] bg-[#141414] p-5"
                style={{ animation: "fadeUp 0.6s ease 0.2s forwards", opacity: 0 }}
              >
                <h2 className="text-xs font-mono text-[#8a8070] uppercase tracking-widest mb-4">
                  Languages
                </h2>
                <div className="flex flex-col gap-2">
                  {profile.languages.map((lang) => (
                    <div key={lang} className="flex items-center justify-between">
                      <span className="text-sm text-[#c8c0b0]">{lang}</span>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="w-5 h-1 rounded-sm"
                            style={{ background: i < 5 ? "#c8602a" : "#2a2a2a" }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Skills */}
              <section
                className="rounded-xl border border-[#2a2a2a] bg-[#141414] p-5"
                style={{ animation: "fadeUp 0.6s ease 0.25s forwards", opacity: 0 }}
              >
                <h2 className="text-xs font-mono text-[#8a8070] uppercase tracking-widest mb-4">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <SkillBadge key={skill.label} skill={skill} index={i} />
                  ))}
                </div>
              </section>
            </div>

            {/* ─── RIGHT COL (Experience) ─── */}
            <div id="experience" className="lg:col-span-2 flex flex-col gap-4 scroll-mt-20">
              <div
                className="flex items-center justify-between"
                style={{ animation: "fadeUp 0.6s ease 0.1s forwards", opacity: 0 }}
              >
                <h2 className="text-xs font-mono text-[#8a8070] uppercase tracking-widest flex items-center gap-2">
                  Experience
                  <span className="text-[#4a4040]">— click to explore</span>
                </h2>
                <span className="text-xs font-mono text-[#4a4040]">{experiences.length} roles</span>
              </div>

              {experiences.map((exp, i) => (
                <ExperienceCard
                  key={exp.id}
                  experience={exp}
                  index={i}
                  onClick={setSelectedExp}
                />
              ))}

            </div>
          </div>

          {/* ─── DETAILED EXPERIENCE ─── */}
          <ExperienceDetailSection experiences={experiences} />

          {/* ─── PROJECTS ─── */}
          <section id="projects" className="mt-10 scroll-mt-20">
            <div
              className="flex items-center justify-between mb-5"
              style={{ animation: "fadeUp 0.6s ease 0.3s forwards", opacity: 0 }}
            >
              <h2 className="text-xs font-mono text-[#8a8070] uppercase tracking-widest flex items-center gap-2">
                Featured Projects
                <span className="text-[#4a4040]">— click to visit</span>
              </h2>
              <span className="text-xs font-mono text-[#4a4040]">{projects.length} projects</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer
            id="contact"
            className="mt-10 pt-6 border-t border-[#1e1e1e] scroll-mt-20"
            style={{ animation: "fadeIn 0.6s ease 0.8s forwards", opacity: 0 }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-xs font-mono text-[#6a6058]">
                <a href="mailto:raceljude@gmail.com" className="hover:text-[#c8602a] transition-colors flex items-center gap-1.5">
                  <Mail size={11} /> raceljude@gmail.com
                </a>
                <a href="tel:+639683971574" className="hover:text-[#c8602a] transition-colors flex items-center gap-1.5">
                  <Phone size={11} /> +63 968 397 1574
                </a>
              </div>
              <p className="text-xs font-mono text-[#3a3030]">
                Built with Next.js · Deployed on Vercel
              </p>
            </div>
          </footer>
        </div>
      </div>

      {/* Modal */}
      <ExperienceModal experience={selectedExp} onClose={() => setSelectedExp(null)} />

      <style jsx global>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}
