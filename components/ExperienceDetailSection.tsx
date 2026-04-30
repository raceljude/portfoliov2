"use client";

import { MapPin, Calendar, Code2, ChevronRight } from "lucide-react";

interface Experience {
  id: string; role: string; company: string; period: string;
  location: string; status: string; color: string;
  summary: string; highlights: string[]; stack: string[];
}

interface ExperienceDetailSectionProps {
  experiences: Experience[];
  isDark: boolean;
}

export default function ExperienceDetailSection({ experiences, isDark }: ExperienceDetailSectionProps) {
  const card    = isDark ? "#141414" : "#ede8df";
  const border  = isDark ? "#2a2a2a" : "#d0c8bc";
  const textPri = isDark ? "#f5f0e8" : "#1a1008";
  const textSec = isDark ? "#b8b0a0" : "#5a4838";
  const textMut = isDark ? "#8a8070" : "#8a7868";
  const pillBg  = isDark ? "#1a1a1a" : "#e5ddd0";
  const hlText  = isDark ? "#b8b0a0" : "#4a3828";
  const lineCol = isDark ? "rgba(200,96,42,0.4)" : "rgba(200,96,42,0.3)";

  return (
    <section id="experience-detail" className="mt-14 scroll-mt-20">
      <div className="flex items-center justify-between mb-8"
        style={{ animation: "fadeUp 0.6s ease 0.1s forwards", opacity: 0 }}>
        <div>
          <h2 className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: textMut }}>
            Work History
          </h2>
          <p className="text-xl font-display font-bold" style={{ fontFamily: "var(--font-display)", color: textPri }}>
            Detailed Experience
          </p>
        </div>
        <span className="text-xs font-mono" style={{ color: isDark ? "#4a4040" : "#9a8878" }}>
          {experiences.length} roles
        </span>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 top-0 bottom-0 w-px ml-[7px] hidden sm:block"
          style={{ background: `linear-gradient(to bottom, ${lineCol}, transparent)` }} />

        <div className="flex flex-col gap-10">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative sm:pl-10"
              style={{
                animation: `fadeUp 0.6s ease forwards`,
                animationDelay: `${150 + index * 120}ms`,
                opacity: 0,
              }}>

              {/* Timeline dot */}
              <div className="absolute left-0 top-1 w-[15px] h-[15px] rounded-full border-2 hidden sm:flex items-center justify-center"
                style={{
                  background: exp.color,
                  borderColor: isDark ? "#0f0f0f" : "#f0ebe0",
                  boxShadow: exp.status === "current" ? `0 0 10px ${exp.color}80` : "none",
                }}>
                {exp.status === "current" && (
                  <span className="w-[5px] h-[5px] rounded-full animate-ping" style={{ background: exp.color }} />
                )}
              </div>

              {/* Card */}
              <div className="rounded-xl overflow-hidden"
                style={{
                  background: card,
                  border: `1px solid ${border}`,
                  transition: "background 0.3s, border-color 0.3s",
                }}>
                <div className="h-[3px] w-full"
                  style={{ background: `linear-gradient(90deg, ${exp.color}, transparent 70%)` }} />

                <div className="p-6">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                    <div>
                      {exp.status === "current" && (
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#c8602a] bg-[#c8602a]/10 border border-[#c8602a]/20 px-2 py-0.5 rounded-full mb-1.5">
                          <span className="w-1 h-1 rounded-full bg-[#c8602a] animate-pulse" /> Current
                        </span>
                      )}
                      <h3 className="text-lg font-display font-bold leading-tight"
                        style={{ fontFamily: "var(--font-display)", color: textPri }}>
                        {exp.role}
                      </h3>
                      <p className="text-sm font-medium mt-0.5" style={{ color: exp.color }}>
                        {exp.company}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1.5 shrink-0 items-start sm:items-end">
                      <span className="flex items-center gap-1.5 text-[11px] font-mono" style={{ color: textMut }}>
                        <Calendar size={10} />{exp.period}
                      </span>
                      <span className="flex items-center gap-1.5 text-[11px] font-mono" style={{ color: textMut }}>
                        <MapPin size={10} />{exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-sm leading-relaxed border-l-2 pl-3 mb-5"
                    style={{ color: textSec, borderColor: exp.color }}>
                    {exp.summary}
                  </p>

                  {/* Two-col */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-[10px] font-mono uppercase tracking-widest mb-3" style={{ color: textMut }}>
                        Responsibilities
                      </h4>
                      <ul className="space-y-2">
                        {exp.highlights.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: hlText }}>
                            <ChevronRight size={11} className="mt-0.5 shrink-0" style={{ color: exp.color }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-mono uppercase tracking-widest mb-3 flex items-center gap-1.5" style={{ color: textMut }}>
                        <Code2 size={10} /> Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.stack.map((tech) => (
                          <span key={tech} className="text-[11px] font-mono px-2.5 py-1 rounded-lg"
                            style={{
                              border: `1px solid ${border}`,
                              color: isDark ? "#b8b0a0" : "#5a4838",
                              background: pillBg,
                              transition: "background 0.3s, border-color 0.3s",
                            }}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
