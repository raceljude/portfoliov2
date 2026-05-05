"use client";

import { useRouter, usePathname } from "next/navigation";
import { User, Briefcase, FolderOpen, Code2, LogOut, Home, Database } from "lucide-react";
import RJMMIcon from "@/components/RJMMIcon";

const navItems = [
  { href: "/admin",            label: "Dashboard",  icon: Home       },
  { href: "/admin/profile",    label: "Profile",    icon: User       },
  { href: "/admin/experiences",label: "Experience", icon: Briefcase  },
  { href: "/admin/projects",   label: "Projects",   icon: FolderOpen },
  { href: "/admin/skills",     label: "Skills",     icon: Code2      },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="min-h-screen flex" style={{ background: "#0c1018", color: "#f0ece8" }}>

      {/* Sidebar */}
      <aside className="w-56 shrink-0 flex flex-col"
        style={{ background: "#0a0f17", borderRight: "1px solid #1e2a3a" }}>

        {/* Logo */}
        <div className="flex items-center gap-2.5 p-5 pb-4" style={{ borderBottom: "1px solid #1e2a3a" }}>
          <RJMMIcon size={32} />
          <div>
            <p className="text-xs font-bold" style={{ color: "#f0ece8", fontFamily: "var(--font-display)" }}>
              Portfolio
            </p>
            <p className="text-[10px] font-mono" style={{ color: "#2a4a60" }}>Admin Panel</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 p-3 flex-1">
          {navItems.map(item => {
            const Icon    = item.icon;
            const active  = pathname === item.href;
            return (
              <button key={item.href} onClick={() => router.push(item.href)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-mono text-left w-full focus:outline-none transition-all"
                style={{
                  background: active ? "#1e2a3a" : "transparent",
                  color:      active ? "#d1675a" : "#4a6a80",
                  borderLeft: active ? "2px solid #d1675a" : "2px solid transparent",
                }}>
                <Icon size={14} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-3" style={{ borderTop: "1px solid #1e2a3a" }}>
          <a href="/" target="_blank"
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-mono w-full mb-1"
            style={{ color: "#2a4a60" }}>
            <Home size={13} /> View site
          </a>
          <button onClick={logout}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-mono w-full focus:outline-none transition-all"
            style={{ color: "#4a6a80" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#d1675a"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#4a6a80"}>
            <LogOut size={13} /> Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
