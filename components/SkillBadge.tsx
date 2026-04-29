"use client";

const categoryColors: Record<string, string> = {
  fullstack: "#c8602a",
  frontend: "#7a9a5a",
  backend: "#5a7a9a",
  devops: "#9a7a5a",
  language: "#7a5a9a",
  cloud: "#5a9a8a",
};

interface Skill {
  label: string;
  category: string;
}

interface SkillBadgeProps {
  skill: Skill;
  index: number;
}

export default function SkillBadge({ skill, index }: SkillBadgeProps) {
  const color = categoryColors[skill.category] || "#8a8070";

  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1.5 rounded-lg border border-[#2a2a2a] text-[#b8b0a0] bg-[#141414] hover:bg-[#1e1e1e] hover:border-[#3a3a3a] transition-all duration-200 cursor-default"
      style={{
        animation: `fadeIn 0.5s ease forwards`,
        animationDelay: `${200 + index * 40}ms`,
        opacity: 0,
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }} />
      {skill.label}
    </span>
  );
}
