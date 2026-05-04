"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Monitor, Server, GitBranch, Cloud, Wrench, CheckCircle2,
} from "lucide-react";
import { tokens } from "@/lib/theme";
import { skillGroups } from "@/config/personal";

const IconMap: Record<string, LucideIcon> = {
  Monitor,
  Server,
  GitBranch,
  Cloud,
  Wrench,
};

interface Props { isDark: boolean; }

export default function SkillsSection({ isDark }: Props) {
  const [activeTab, setActiveTab] = useState(skillGroups[0].id);
  const t = tokens(isDark);

  const group = skillGroups.find(g => g.id === activeTab) ?? skillGroups[0];

  return (
    <section id="skills" className="mt-14 scroll-mt-20">
      {/* Header */}
      <div
        className="flex items-center justify-between mb-6"
        style={{ animation: "fadeUp 0.6s ease 0.1s forwards", opacity: 0 }}
      >
        <div>
          <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: t.textMut }}>
            Tech Stack
          </p>
          <h2
            className="text-xl font-bold"
            style={{ fontFamily: "var(--font-display)", color: t.textPri }}
          >
            Skills
          </h2>
        </div>
        <span className="text-xs font-mono" style={{ color: t.textDim }}>
          {skillGroups.reduce((acc, g) => acc + g.skills.length, 0)} skills across {skillGroups.length} categories
        </span>
      </div>

      {/* Tab bar */}
      <div
        className="flex gap-2 flex-wrap mb-6"
        style={{ animation: "fadeUp 0.6s ease 0.15s forwards", opacity: 0 }}
      >
        {skillGroups.map(g => {
          const Icon = IconMap[g.icon];
          const isActive = activeTab === g.id;
          return (
            <button
              key={g.id}
              onClick={() => setActiveTab(g.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono tracking-wide transition-all focus:outline-none"
              style={{
                background: isActive ? g.color + "20" : t.card,
                border: "1px solid " + (isActive ? g.color + "60" : t.border),
                color: isActive ? g.color : t.textMut,
                transform: isActive ? "translateY(-1px)" : "none",
                boxShadow: isActive ? "0 4px 16px " + g.color + "25" : "none",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.borderColor = g.color + "40";
                  (e.currentTarget as HTMLElement).style.color = g.color;
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.borderColor = t.border;
                  (e.currentTarget as HTMLElement).style.color = t.textMut;
                }
              }}
            >
              {Icon && <Icon size={12} style={{ color: isActive ? g.color : "currentColor" }} />}
              {g.label}
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <div
        key={activeTab}
        className="rounded-2xl overflow-hidden"
        style={{
          background: t.card,
          border: "1px solid " + t.border,
          animation: "fadeUp 0.35s ease forwards",
          opacity: 0,
        }}
      >
        {/* Panel top accent */}
        <div
          className="h-[3px] w-full"
          style={{ background: "linear-gradient(90deg, " + group.color + ", transparent 70%)" }}
        />

        <div className="p-6">
          {/* Group header */}
          <div className="flex items-start gap-4 mb-6 pb-5" style={{ borderBottom: "1px solid " + t.border }}>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: group.color + "18", border: "1px solid " + group.color + "35" }}
            >
              {(() => { const I = IconMap[group.icon]; return I ? <I size={18} style={{ color: group.color }} /> : null; })()}
            </div>
            <div>
              <h3 className="font-bold text-base" style={{ fontFamily: "var(--font-display)", color: t.textPri }}>
                {group.label}
              </h3>
              <p className="text-xs mt-1 leading-relaxed" style={{ color: t.textSec }}>
                {group.desc}
              </p>
            </div>
          </div>

          {/* Skills grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {group.skills.map((skill, i) => (
              <div
                key={skill.label}
                className="rounded-xl p-4"
                style={{
                  background: isDark ? "#0e1e2c" : "#dce8f0",
                  border: "1px solid " + t.border,
                  animation: "fadeUp 0.4s ease forwards",
                  animationDelay: i * 50 + "ms",
                  opacity: 0,
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = group.color + "50"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = t.border; }}
              >
                {/* Skill name + dots */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold" style={{ color: t.textPri }}>
                    {skill.label}
                  </span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(dot => (
                      <div
                        key={dot}
                        className="w-2 h-2 rounded-full"
                        style={{
                          background: dot <= skill.level ? group.color : t.border,
                          opacity: dot <= skill.level ? 1 : 0.4,
                          transition: "background 0.2s",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Where used */}
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest mb-1.5" style={{ color: t.textMut }}>
                    Used in
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.where.map(place => (
                      <span
                        key={place}
                        className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-md"
                        style={{
                          background: group.color + "12",
                          border: "1px solid " + group.color + "28",
                          color: isDark ? group.color : group.color,
                        }}
                      >
                        <CheckCircle2 size={8} />
                        {place}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary bar — all categories at a glance */}
      <div
        className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
        style={{ animation: "fadeUp 0.6s ease 0.4s forwards", opacity: 0 }}
      >
        {skillGroups.map(g => {
          const Icon = IconMap[g.icon];
          const avgLevel = Math.round(g.skills.reduce((a, s) => a + s.level, 0) / g.skills.length);
          return (
            <button
              key={g.id}
              onClick={() => setActiveTab(g.id)}
              className="rounded-xl p-3 text-left focus:outline-none transition-all"
              style={{
                background: activeTab === g.id ? g.color + "18" : t.card,
                border: "1px solid " + (activeTab === g.id ? g.color + "50" : t.border),
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = g.color + "50"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = activeTab === g.id ? g.color + "50" : t.border; }}
            >
              <div className="flex items-center gap-2 mb-2">
                {Icon && <Icon size={12} style={{ color: g.color }} />}
                <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: g.color }}>
                  {g.label}
                </span>
              </div>
              <p className="text-lg font-bold" style={{ color: t.textPri, fontFamily: "var(--font-display)" }}>
                {g.skills.length}
              </p>
              <p className="text-[10px] font-mono" style={{ color: t.textMut }}>skills</p>
              {/* Mini proficiency bar */}
              <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ background: t.border }}>
                <div
                  className="h-full rounded-full"
                  style={{ width: (avgLevel / 5 * 100) + "%", background: g.color, transition: "width 0.4s ease" }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
