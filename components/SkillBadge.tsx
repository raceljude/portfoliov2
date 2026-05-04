"use client";

const P = { deepRed: "#96312e", midRed: "#d1675a", amber: "#ffbf6b", blue: "#398eb2", navy: "#153d52" };
const categoryColors: Record<string, string> = {
  fullstack: P.midRed, frontend: P.blue, backend: P.deepRed,
  devops: P.amber, language: P.navy, cloud: P.blue,
};

interface Skill { label: string; category: string; }
interface SkillBadgeProps { skill: Skill; index: number; isDark: boolean; }

export default function SkillBadge({ skill, index, isDark }: SkillBadgeProps) {
  const color = categoryColors[skill.category] || P.blue;
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1.5 rounded-lg cursor-default"
      style={{
        animation: "fadeIn 0.5s ease forwards",
        animationDelay: `${200 + index * 40}ms`,
        opacity: 0,
        border: `1px solid ${isDark ? "#1e2a3a" : "#c4d2de"}`,
        background: isDark ? "#0e1e2c" : "#dce8f0",
        color: isDark ? "#8aa8bc" : "#2a4f66",
        transition: "background 0.3s, border-color 0.3s, color 0.3s",
      }}>
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }}/>
      {skill.label}
    </span>
  );
}
