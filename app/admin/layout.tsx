"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { User, Briefcase, FolderOpen, Code2, LogOut, Home, Menu, X } from "lucide-react";
import RJMMIcon from "@/components/RJMMIcon";

const navItems = [
  { href: "/admin",             label: "Dashboard",  icon: Home       },
  { href: "/admin/profile",     label: "Profile",    icon: User       },
  { href: "/admin/experiences", label: "Experience", icon: Briefcase  },
  { href: "/admin/projects",    label: "Projects",   icon: FolderOpen },
  { href: "/admin/skills",      label: "Skills",     icon: Code2      },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  if (pathname === "/admin/login") return <>{children}</>;

  const NavContent = () => (
    <>
      {/* Logo */}
      <div className="flex items-center gap-2.5 p-5 pb-4 shrink-0" style={{ borderBottom: "1px solid #1e2a3a" }}>
        <RJMMIcon size={32} />
        <div>
          <p className="text-xs font-bold" style={{ color: "#f0ece8", fontFamily: "var(--font-display)" }}>
            Portfolio
          </p>
          <p className="text-[10px] font-mono" style={{ color: "#2a4a60" }}>Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 p-3 flex-1 overflow-y-auto">
        {navItems.map(item => {
          const Icon   = item.icon;
          const active = pathname === item.href;
          return (
            <button
              key={item.href}
              onClick={() => { router.push(item.href); setMobileOpen(false); }}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-mono text-left w-full focus:outline-none transition-all"
              style={{
                background: active ? "#1e2a3a" : "transparent",
                color:      active ? "#d1675a" : "#4a6a80",
                borderLeft: active ? "2px solid #d1675a" : "2px solid transparent",
              }}
            >
              <Icon size={14} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3 shrink-0" style={{ borderTop: "1px solid #1e2a3a" }}>
        <a
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-mono w-full mb-1"
          style={{ color: "#2a4a60" }}
        >
          <Home size={13} /> View site
        </a>
        <button
          onClick={logout}
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-mono w-full focus:outline-none transition-all"
          style={{ color: "#4a6a80" }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#d1675a"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#4a6a80"}
        >
          <LogOut size={13} /> Sign out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0c1018", color: "#f0ece8" }}>

      {/* Mobile top bar */}
      <header
        className="flex sm:hidden items-center justify-between px-4 py-3 shrink-0"
        style={{ background: "#0a0f17", borderBottom: "1px solid #1e2a3a" }}
      >
        <div className="flex items-center gap-2.5">
          <RJMMIcon size={28} />
          <div>
            <p className="text-xs font-bold leading-none" style={{ color: "#f0ece8", fontFamily: "var(--font-display)" }}>Portfolio</p>
            <p className="text-[10px] font-mono mt-0.5" style={{ color: "#2a4a60" }}>Admin Panel</p>
          </div>
        </div>
        <button
          onClick={() => setMobileOpen(v => !v)}
          className="p-2 rounded-xl focus:outline-none"
          style={{ background: "#111827", border: "1px solid #1e2a3a", color: "#4a6a80" }}
        >
          {mobileOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </header>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 sm:hidden"
          style={{ background: "rgba(0,0,0,0.6)" }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar drawer */}
      <aside
        className="fixed top-0 left-0 bottom-0 z-50 flex flex-col w-56 sm:hidden transition-transform duration-300"
        style={{
          background: "#0a0f17",
          borderRight: "1px solid #1e2a3a",
          transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <NavContent />
      </aside>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop sidebar */}
        <aside
          className="hidden sm:flex flex-col w-56 shrink-0"
          style={{ background: "#0a0f17", borderRight: "1px solid #1e2a3a" }}
        >
          <NavContent />
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
