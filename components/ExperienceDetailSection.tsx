"use client";
import { tokens } from "@/lib/theme";

import { MapPin, Calendar, Code2, ChevronRight } from "lucide-react";

interface Experience {
  id: string; role: string; company: string; period: string;
  location: string; status: string; color: string;
  summary: string; highlights: string[]; stack: string[];
}
interface Props { experiences: Experience[]; isDark: boolean; }

export default function ExperienceDetailSection({ experiences, isDark }: Props) {
  const t = tokens(isDark);

  return (
    <section id="experience-detail" className="mt-14 scroll-mt-20">
      <div className="flex items-center justify-between mb-8"
        style={{ animation: "fadeUp 0.6s ease 0.1s forwards", opacity: 0 }}>
        <div>
          <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: t.textMut }}>Deep dive</p>
          <h2 className="text-xl font-bold" style={{ fontFamily: "var(--font-display)", color: t.textPri }}>Work History</h2>
        </div>
        <span className="text-xs font-mono" style={{ color: t.textDim }}>{experiences.length} roles</span>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-px ml-[7px] hidden sm:block"
          style={{ background: `linear-gradient(to bottom, #d1675a70, transparent)` }}/>

        <div className="flex flex-col gap-10">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative sm:pl-10"
              style={{ animation: `fadeUp 0.6s ease forwards`, animationDelay: `${150 + index * 120}ms`, opacity: 0 }}>

              {/* Timeline dot */}
              <div className="absolute left-0 top-1 w-[15px] h-[15px] rounded-full border-2 hidden sm:flex items-center justify-center"
                style={{
                  background: exp.color,
                  borderColor: t.bg,
                  boxShadow: exp.status === "current" ? `0 0 12px ${exp.color}80` : "none",
                }}>
                {exp.status === "current" && (
                  <span className="w-[5px] h-[5px] rounded-full animate-ping" style={{ background: exp.color }}/>
                )}
              </div>

              <div className="rounded-xl overflow-hidden"
                style={{ background: t.card, border: `1px solid ${t.border}`, transition: "background 0.3s, border-color 0.3s" }}>
                <div className="h-[3px] w-full"
                  style={{ background: `linear-gradient(90deg, ${exp.color}, transparent 70%)` }}/>
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                    <div>
                      {exp.status === "current" && (
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded-full mb-1.5"
                          style={{ color: exp.color, background: `${exp.color}18`, border: `1px solid ${exp.color}35` }}>
                          <span className="w-1 h-1 rounded-full animate-pulse" style={{ background: exp.color }}/> Current
                        </span>
                      )}
                      <h3 className="text-lg font-bold leading-tight"
                        style={{ fontFamily: "var(--font-display)", color: t.textPri }}>{exp.role}</h3>
                      <p className="text-sm font-medium mt-0.5" style={{ color: exp.color }}>{exp.company}</p>
                    </div>
                    <div className="flex flex-col gap-1.5 shrink-0 items-start sm:items-end">
                      <span className="flex items-center gap-1.5 text-[11px] font-mono" style={{ color: t.textMut }}>
                        <Calendar size={10}/>{exp.period}
                      </span>
                      <span className="flex items-center gap-1.5 text-[11px] font-mono" style={{ color: t.textMut }}>
                        <MapPin size={10}/>{exp.location}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed border-l-2 pl-3 mb-5"
                    style={{ color: t.textSec, borderColor: exp.color }}>{exp.summary}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-[10px] font-mono uppercase tracking-widest mb-3"
                        style={{ color: t.textMut }}>Responsibilities</h4>
                      <ul className="space-y-2">
                        {exp.highlights.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs leading-relaxed"
                            style={{ color: t.textSec }}>
                            <ChevronRight size={11} className="mt-0.5 shrink-0" style={{ color: exp.color }}/>{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-mono uppercase tracking-widest mb-3 flex items-center gap-1.5"
                        style={{ color: t.textMut }}>
                        <Code2 size={10}/> Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.stack.map(tech => (
                          <span key={tech} className="text-[11px] font-mono px-2.5 py-1 rounded-lg"
                            style={{ border: `1px solid ${t.border}`, color: t.textSec, background: t.pillBg }}>
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