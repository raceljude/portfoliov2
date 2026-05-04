"use client";
import { skillColors } from "@/lib/theme";

interface Skill { label: string; category: string; }
interface Props { skill: Skill; index: number; isDark: boolean; }

export default function SkillBadge({ skill, index, isDark }: Props) {
  const color = skillColors[skill.category] || "#398eb2";
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
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }} />
      {skill.label}
    </span>
  );
}
