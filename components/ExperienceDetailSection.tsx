"use client";

import { MapPin, Calendar, Code2, ChevronRight } from "lucide-react";

const tagColors: Record<string, string> = {
  Frontend: "#5a7a9a",
  Backend: "#7a9a5a",
  DevOps: "#9a7a5a",
  "Full Stack": "#c8602a",
};

interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  status: string;
  color: string;
  summary: string;
  highlights: string[];
  stack: string[];
}

interface ExperienceDetailSectionProps {
  experiences: Experience[];
}

export default function ExperienceDetailSection({ experiences }: ExperienceDetailSectionProps) {
  return (
    <section id="experience-detail" className="mt-14 scroll-mt-20">
      {/* Section header */}
      <div
        className="flex items-center justify-between mb-8"
        style={{ animation: "fadeUp 0.6s ease 0.1s forwards", opacity: 0 }}
      >
        <div>
          <h2
            className="text-xs font-mono text-[#8a8070] uppercase tracking-widest mb-1"
          >
            Work History
          </h2>
          <p className="text-xl font-display font-bold text-[#f5f0e8]" style={{ fontFamily: "var(--font-display)" }}>
            Detailed Experience
          </p>
        </div>
        <span className="text-xs font-mono text-[#4a4040]">{experiences.length} roles</span>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#c8602a]/40 via-[#2a2a2a] to-transparent ml-[7px] hidden sm:block" />

        <div className="flex flex-col gap-10">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="relative sm:pl-10"
              style={{
                animation: `fadeUp 0.6s ease forwards`,
                animationDelay: `${150 + index * 120}ms`,
                opacity: 0,
              }}
            >
              {/* Timeline dot */}
              <div
                className="absolute left-0 top-1 w-[15px] h-[15px] rounded-full border-2 border-[#0f0f0f] hidden sm:flex items-center justify-center"
                style={{ background: exp.color, boxShadow: exp.status === "current" ? `0 0 10px ${exp.color}80` : "none" }}
              >
                {exp.status === "current" && (
                  <span
                    className="w-[5px] h-[5px] rounded-full animate-ping"
                    style={{ background: exp.color }}
                  />
                )}
              </div>

              {/* Card */}
              <div className="rounded-xl border border-[#2a2a2a] bg-[#141414] overflow-hidden">
                {/* Accent bar */}
                <div
                  className="h-[3px] w-full"
                  style={{ background: `linear-gradient(90deg, ${exp.color}, transparent 70%)` }}
                />

                <div className="p-6">
                  {/* Header row */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        {exp.status === "current" && (
                          <span className="text-[10px] font-mono text-[#c8602a] bg-[#c8602a]/10 border border-[#c8602a]/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-[#c8602a] animate-pulse" />
                            Current
                          </span>
                        )}
                      </div>
                      <h3
                        className="text-lg font-display font-bold text-[#f5f0e8] leading-tight"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {exp.role}
                      </h3>
                      <p className="text-sm font-medium mt-0.5" style={{ color: exp.color }}>
                        {exp.company}
                      </p>
                    </div>

                    {/* Meta badges */}
                    <div className="flex flex-col gap-1.5 shrink-0 items-start sm:items-end">
                      <span className="flex items-center gap-1.5 text-[11px] font-mono text-[#6a6058]">
                        <Calendar size={10} />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5 text-[11px] font-mono text-[#6a6058]">
                        <MapPin size={10} />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p
                    className="text-sm text-[#b8b0a0] leading-relaxed border-l-2 pl-3 mb-5"
                    style={{ borderColor: exp.color }}
                  >
                    {exp.summary}
                  </p>

                  {/* Two-col layout: highlights + stack */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Highlights */}
                    <div>
                      <h4 className="text-[10px] font-mono text-[#8a8070] uppercase tracking-widest mb-3">
                        Responsibilities
                      </h4>
                      <ul className="space-y-2">
                        {exp.highlights.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-[#b8b0a0] leading-relaxed">
                            <ChevronRight
                              size={11}
                              className="mt-0.5 shrink-0"
                              style={{ color: exp.color }}
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Stack */}
                    <div>
                      <h4 className="text-[10px] font-mono text-[#8a8070] uppercase tracking-widest mb-3 flex items-center gap-1.5">
                        <Code2 size={10} />
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.stack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[11px] font-mono px-2.5 py-1 rounded-lg border border-[#2a2a2a] text-[#b8b0a0] bg-[#1a1a1a] hover:border-[#3a3a3a] transition-colors"
                          >
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
