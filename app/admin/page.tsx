"use client";

import { useEffect, useState } from "react";
import { Briefcase, FolderOpen, Code2, User, Database, RefreshCw, ExternalLink } from "lucide-react";

interface Stats { experiences: number; projects: number; skillGroups: number; }

export default function AdminDashboard() {
  const [stats,   setStats]   = useState<Stats | null>(null);
  const [seeding, setSeeding] = useState(false);
  const [seedMsg, setSeedMsg] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/experiences").then(r => r.json()),
      fetch("/api/admin/projects").then(r => r.json()),
      fetch("/api/admin/skills").then(r => r.json()),
    ]).then(([exp, proj, sk]) => {
      setStats({
        experiences: Array.isArray(exp) ? exp.length : 0,
        projects:    Array.isArray(proj) ? proj.length : 0,
        skillGroups: Array.isArray(sk) ? sk.length : 0,
      });
    });
  }, []);

  const seed = async () => {
    setSeeding(true);
    setSeedMsg("");
    const res  = await fetch("/api/admin/seed", { method: "POST" });
    const data = await res.json();
    setSeeding(false);
    setSeedMsg(data.ok ? "Seeded successfully!" : "Errors: " + data.errors?.join(", "));
  };

  const cards = [
    { label: "Experience",   value: stats?.experiences,  icon: Briefcase,  href: "/admin/experiences", color: "#d1675a" },
    { label: "Projects",     value: stats?.projects,     icon: FolderOpen, href: "/admin/projects",    color: "#398eb2" },
    { label: "Skill Groups", value: stats?.skillGroups,  icon: Code2,      href: "/admin/skills",      color: "#ffbf6b" },
    { label: "Profile",      value: "1",                 icon: User,       href: "/admin/profile",     color: "#96312e" },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: "#4a6a80" }}>Admin Panel</p>
        <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)", color: "#f0ece8" }}>
          Dashboard
        </h1>
        <p className="text-sm mt-1" style={{ color: "#4a6a80" }}>
          Manage your portfolio content from here.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map(c => {
          const Icon = c.icon;
          return (
            <a key={c.label} href={c.href}
              className="rounded-xl p-5 flex flex-col gap-3 transition-all focus:outline-none"
              style={{ background: "#111827", border: "1px solid #1e2a3a" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = c.color + "60"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#1e2a3a"; }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: c.color + "18", border: "1px solid " + c.color + "35" }}>
                <Icon size={16} style={{ color: c.color }} />
              </div>
              <div>
                <p className="text-2xl font-bold" style={{ color: "#f0ece8", fontFamily: "var(--font-display)" }}>
                  {stats ? c.value : "—"}
                </p>
                <p className="text-xs font-mono" style={{ color: "#4a6a80" }}>{c.label}</p>
              </div>
            </a>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="rounded-xl p-6" style={{ background: "#111827", border: "1px solid #1e2a3a" }}>
        <h2 className="text-sm font-semibold mb-4" style={{ color: "#f0ece8" }}>Quick Actions</h2>

        <div className="flex flex-wrap gap-3">
          {/* Seed button */}
          <button onClick={seed} disabled={seeding}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono transition-all focus:outline-none"
            style={{ background: "#0e1e2c", border: "1px solid #1e2a3a", color: "#8aa8bc", cursor: seeding ? "not-allowed" : "pointer" }}
            onMouseEnter={e => { if (!seeding) (e.currentTarget as HTMLElement).style.borderColor = "#398eb2"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#1e2a3a"; }}>
            {seeding
              ? <RefreshCw size={13} className="animate-spin" />
              : <Database size={13} />
            }
            {seeding ? "Seeding..." : "Seed DB from config"}
          </button>

          <a href="/" target="_blank"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono transition-all"
            style={{ background: "#0e1e2c", border: "1px solid #1e2a3a", color: "#8aa8bc" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#d1675a"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#1e2a3a"; }}>
            <ExternalLink size={13} /> View portfolio
          </a>
        </div>

        {seedMsg && (
          <p className="mt-3 text-xs font-mono" style={{ color: seedMsg.includes("success") ? "#4a9a6a" : "#d1675a" }}>
            {seedMsg}
          </p>
        )}

        <div className="mt-4 p-4 rounded-xl" style={{ background: "#0e1e2c", border: "1px solid #1e2a3a" }}>
          <p className="text-xs font-mono" style={{ color: "#2a4a60" }}>
            <span style={{ color: "#ffbf6b" }}>Tip:</span>{" "}
            Click &quot;Seed DB from config&quot; to push your current{" "}
            <code style={{ color: "#8aa8bc" }}>config/personal.ts</code>{" "}
            data into Supabase. After seeding, the portfolio reads live from the database.
          </p>
        </div>
      </div>
    </div>
  );
}
