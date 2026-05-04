"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, GraduationCap, Github, Linkedin, Send, MessageSquare } from "lucide-react";
import ExperienceCard from "@/components/ExperienceCard";
import ExperienceModal from "@/components/ExperienceModal";
import SkillBadge from "@/components/SkillBadge";
import ProjectCard from "@/components/ProjectCard";
import ExperienceDetailSection from "@/components/ExperienceDetailSection";
import ScrollBackground from "@/components/ScrollBackground";
import Navbar from "@/components/Navbar";
import HireMeModal from "@/components/HireMeModal";
import { profile, education, skills, experiences, projects } from "./data";

type Experience = (typeof experiences)[number];

export const P = {
  deepRed: "#96312e",
  midRed:  "#d1675a",
  amber:   "#ffbf6b",
  blue:    "#398eb2",
  navy:    "#153d52",
};

export function tokens(isDark: boolean) {
  return {
    bg:      isDark ? "#0c1018"  : "#f0f4f8",
    card:    isDark ? "#111827"  : "#e8eef4",
    cardHov: isDark ? "#17202e"  : "#dce5ed",
    border:  isDark ? "#1e2a3a"  : "#c4d2de",
    borHov:  isDark ? "#2a3f56"  : "#9ab8cc",
    textPri: isDark ? "#f0ece8"  : "#0e1e2a",
    textSec: isDark ? "#8aa8bc"  : "#2a4f66",
    textMut: isDark ? "#4a6a80"  : "#5a8aaa",
    textDim: isDark ? "#2a4a60"  : "#8ab0c8",
    pillBg:  isDark ? "#0e1e2c"  : "#dce8f0",
    langTxt: isDark ? "#c8dce8"  : "#0e1e2a",
    divider: isDark ? "#1e2a3a"  : "#c4d2de",
  };
}

export default function Home() {
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [hireMeOpen, setHireMeOpen] = useState(false);

  const isDark = theme === "dark";
  const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");
  const t = tokens(isDark);

  return (
    <>
      <div style={{ background: t.bg, color: t.textPri, minHeight: "100vh", transition: "background 0.4s ease, color 0.4s ease" }}>
        <Navbar theme={theme} onThemeToggle={toggleTheme} onHireMe={() => setHireMeOpen(true)} isDark={isDark} />
        <ScrollBackground theme={theme} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-6 pb-10 sm:px-6 lg:px-8">

          {/* ─── HERO ─── */}
          <header id="about" className="mb-10 scroll-mt-20"
            style={{ animation: "fadeUp 0.7s ease forwards", opacity: 0 }}>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1 rounded-full mb-4"
                  style={{ color: P.amber, background: `${P.amber}18`, border: `1px solid ${P.amber}40` }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: P.amber }} />
                  Open to opportunities
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold leading-none tracking-tight"
                  style={{ fontFamily: "var(--font-display)", color: t.textPri }}>
                  {profile.name.split(" ").map((word, i) => (
                    <span key={i} style={{ color: i === 2 ? P.midRed : t.textPri }}>{word}{" "}</span>
                  ))}
                </h1>
                <p className="mt-2 font-mono text-sm tracking-wider uppercase" style={{ color: P.blue }}>
                  {profile.title}
                </p>
                <p className="mt-3 max-w-md text-sm leading-relaxed" style={{ color: t.textSec }}>
                  {profile.tagline}
                </p>
              </div>

              {/* Contact cluster */}
              <div className="flex flex-col gap-2 text-xs font-mono shrink-0" style={{ color: t.textMut }}>
                <a href={`mailto:${profile.email}`} className="flex items-center gap-2 transition-colors"
                  style={{ color: t.textMut }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = P.midRed}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = t.textMut}>
                  <Mail size={12}/>{profile.email}
                </a>
                <a href={`tel:${profile.phone}`} className="flex items-center gap-2 transition-colors"
                  style={{ color: t.textMut }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = P.midRed}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = t.textMut}>
                  <Phone size={12}/>{profile.phone}
                </a>
                <span className="flex items-center gap-2"><MapPin size={12}/>Makati, Metro Manila</span>
                <div className="flex items-center gap-3 mt-1">
                  <a href="https://github.com/raceljude" target="_blank" rel="noopener noreferrer"
                    className="p-1.5 rounded-md transition-all"
                    style={{ border: `1px solid ${t.border}`, color: t.textMut }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = P.amber; (e.currentTarget as HTMLElement).style.borderColor = P.amber; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = t.textMut; (e.currentTarget as HTMLElement).style.borderColor = t.border; }}
                    aria-label="GitHub"><Github size={13}/></a>
                  <a href="https://www.linkedin.com/in/racel-jude-marahay-76b15a29b" target="_blank" rel="noopener noreferrer"
                    className="p-1.5 rounded-md transition-all"
                    style={{ border: `1px solid ${t.border}`, color: t.textMut }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = P.blue; (e.currentTarget as HTMLElement).style.borderColor = P.blue; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = t.textMut; (e.currentTarget as HTMLElement).style.borderColor = t.border; }}
                    aria-label="LinkedIn"><Linkedin size={13}/></a>
                </div>
              </div>
            </div>
            <div className="mt-8 h-px" style={{ background: `linear-gradient(to right, ${P.midRed}70, ${t.divider}, transparent)` }}/>
          </header>

          {/* ─── GRID ─── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="flex flex-col gap-6">

              {/* Education */}
              <section className="rounded-xl p-5" style={{ background: t.card, border: `1px solid ${t.border}`, animation: "fadeUp 0.6s ease 0.15s forwards", opacity: 0, transition: "background 0.3s, border-color 0.3s" }}>
                <h2 className="text-xs font-mono uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: t.textMut }}>
                  <GraduationCap size={12}/> Education
                </h2>
                <p className="font-semibold text-sm leading-snug" style={{ color: t.textPri }}>{education.school}</p>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: t.textSec }}>{education.degree}</p>
                <p className="text-xs mt-0.5" style={{ color: t.textMut }}>{education.major}</p>
                <div className="mt-3 pt-3 flex items-center justify-between" style={{ borderTop: `1px solid ${t.border}` }}>
                  <span className="text-xs font-mono" style={{ color: t.textMut }}>{education.years}</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded"
                    style={{ background: `${P.blue}18`, color: P.blue, border: `1px solid ${P.blue}35` }}>BSIT</span>
                </div>
              </section>

              {/* Languages */}
              <section className="rounded-xl p-5" style={{ background: t.card, border: `1px solid ${t.border}`, animation: "fadeUp 0.6s ease 0.2s forwards", opacity: 0, transition: "background 0.3s, border-color 0.3s" }}>
                <h2 className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: t.textMut }}>Languages</h2>
                <div className="flex flex-col gap-2.5">
                  {profile.languages.map((lang) => (
                    <div key={lang} className="flex items-center justify-between">
                      <span className="text-sm" style={{ color: t.langTxt }}>{lang}</span>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-5 h-1.5 rounded-sm"
                            style={{ background: i < 5 ? P.midRed : t.border }} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Skills */}
              <section className="rounded-xl p-5" style={{ background: t.card, border: `1px solid ${t.border}`, animation: "fadeUp 0.6s ease 0.25s forwards", opacity: 0, transition: "background 0.3s, border-color 0.3s" }}>
                <h2 className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: t.textMut }}>Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <SkillBadge key={skill.label} skill={skill} index={i} isDark={isDark}/>
                  ))}
                </div>
              </section>
            </div>

            {/* Experience cards */}
            <div id="experience" className="lg:col-span-2 flex flex-col gap-4 scroll-mt-20">
              <div className="flex items-center justify-between" style={{ animation: "fadeUp 0.6s ease 0.1s forwards", opacity: 0 }}>
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: t.textMut }}>Career</p>
                  <h2 className="text-xl font-bold" style={{ fontFamily: "var(--font-display)", color: t.textPri }}>Experience</h2>
                </div>
                <span className="text-xs font-mono" style={{ color: t.textDim }}>{experiences.length} roles</span>
              </div>
              {experiences.map((exp, i) => (
                <ExperienceCard key={exp.id} experience={exp} index={i} onClick={setSelectedExp} isDark={isDark}/>
              ))}
            </div>
          </div>

          {/* ─── DETAILED EXPERIENCE ─── */}
          <ExperienceDetailSection experiences={experiences} isDark={isDark}/>

          {/* ─── PROJECTS ─── */}
          <section id="projects" className="mt-14 scroll-mt-20">
            <div className="flex items-center justify-between mb-6" style={{ animation: "fadeUp 0.6s ease 0.3s forwards", opacity: 0 }}>
              <div>
                <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: t.textMut }}>Portfolio</p>
                <h2 className="text-xl font-bold" style={{ fontFamily: "var(--font-display)", color: t.textPri }}>Featured Projects</h2>
              </div>
              <span className="text-xs font-mono" style={{ color: t.textDim }}>{projects.length} projects</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} isDark={isDark}/>
              ))}
            </div>
          </section>

          {/* ─── CONTACT ─── */}
          <section id="contact" className="mt-14 scroll-mt-20">
            <div style={{ animation: "fadeUp 0.6s ease 0.1s forwards", opacity: 0 }}>
              <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: t.textMut }}>Get in touch</p>
              <h2 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-display)", color: t.textPri }}>
                Let&apos;s work together
              </h2>
              <p className="text-sm mb-8 max-w-lg" style={{ color: t.textSec }}>
                I&apos;m open to full-time roles, freelance projects, and contract work. Whether you have a project in mind or just want to connect — reach out.
              </p>
            </div>

            {/* Contact cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
              style={{ animation: "fadeUp 0.6s ease 0.2s forwards", opacity: 0 }}>
              {[
                { icon: Mail,          label: "Email",     value: "raceljude@gmail.com",                                           href: "mailto:raceljude@gmail.com",                                    hint: "Best for project inquiries",          color: P.midRed  },
                { icon: Phone,         label: "Phone",     value: "+63 968 397 1574",                                              href: "tel:+639683971574",                                             hint: "Mon–Fri, 9AM–6PM PHT",                color: P.amber   },
                { icon: Linkedin,      label: "LinkedIn",  value: "racel-jude-marahay",                                            href: "https://www.linkedin.com/in/racel-jude-marahay-76b15a29b",     hint: "Connect professionally",              color: P.blue    },
                { icon: Github,        label: "GitHub",    value: "github.com/raceljude",                                          href: "https://github.com/raceljude",                                  hint: "See my open source work",             color: P.navy    },
                { icon: MapPin,        label: "Location",  value: "Makati, Metro Manila",                                          href: null,                                                            hint: "Open to remote & on-site",            color: P.deepRed },
                { icon: MessageSquare, label: "Status",    value: "Open to hire",                                                  href: null,                                                            hint: "Actively looking for opportunities",  color: P.amber   },
              ].map((c) => {
                const Icon = c.icon;
                const cardStyle = { background: t.card, border: `1px solid ${t.border}`, minHeight: "148px", transition: "background 0.2s, border-color 0.2s, transform 0.2s, box-shadow 0.2s" };
                const inner = (
                  <div className="flex flex-col gap-3 h-full">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${c.color}18`, border: `1px solid ${c.color}35` }}>
                      <Icon size={16} style={{ color: c.color }}/>
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] font-mono uppercase tracking-widest mb-0.5" style={{ color: t.textMut }}>{c.label}</p>
                      <p className="text-sm font-semibold truncate" style={{ color: t.textPri }}>{c.value}</p>
                      <p className="text-xs mt-0.5" style={{ color: t.textMut }}>{c.hint}</p>
                    </div>
                    {c.href && <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: c.color }}>→ Open</span>}
                  </div>
                );
                return c.href ? (
                  <a key={c.label} href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="rounded-xl p-5 flex flex-col focus:outline-none"
                    style={cardStyle}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = t.cardHov; el.style.borderColor = c.color; el.style.transform = "translateY(-2px)"; el.style.boxShadow = `0 8px 24px ${c.color}20`; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = t.card; el.style.borderColor = t.border; el.style.transform = "translateY(0)"; el.style.boxShadow = "none"; }}>
                    {inner}
                  </a>
                ) : (
                  <div key={c.label} className="rounded-xl p-5 flex flex-col" style={cardStyle}>{inner}</div>
                );
              })}
            </div>

            {/* CTA Banner */}
            <div className="rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
              style={{ background: `linear-gradient(135deg, ${P.navy} 0%, #0a2235 100%)`, border: `1px solid ${P.blue}40`, animation: "fadeUp 0.6s ease 0.35s forwards", opacity: 0 }}>
              <div>
                <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: P.blue }}>Ready to start?</p>
                <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-display)" }}>Drop me a message</h3>
                <p className="text-sm" style={{ color: "#7aaabe" }}>I typically respond within 24 hours.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <a href="mailto:raceljude@gmail.com"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={{ background: P.midRed, color: "#fff", border: `1px solid ${P.midRed}` }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = P.deepRed}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = P.midRed}>
                  <Send size={14}/> Send email
                </a>
                <a href="https://www.linkedin.com/in/racel-jude-marahay-76b15a29b" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={{ background: "transparent", color: P.amber, border: `1px solid ${P.amber}50` }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = `${P.amber}18`}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}>
                  <Linkedin size={14}/> LinkedIn
                </a>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2"
              style={{ borderTop: `1px solid ${t.divider}` }}>
              <p className="text-xs font-mono" style={{ color: t.textDim }}>© {new Date().getFullYear()} Racel Jude Marahay</p>
              <p className="text-xs font-mono" style={{ color: t.textDim }}>Built with Next.js · Deployed on Vercel</p>
            </div>
          </section>

        </div>
      </div>

      <HireMeModal isOpen={hireMeOpen} onClose={() => setHireMeOpen(false)} isDark={isDark}/>
      <ExperienceModal experience={selectedExp} onClose={() => setSelectedExp(null)} isDark={isDark}/>

      <style jsx global>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
      `}</style>
    </>
  );
}
