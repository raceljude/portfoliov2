"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import RJMMIcon from "@/components/RJMMIcon";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [show,     setShow]     = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/admin");
    } else {
      const data = await res.json();
      setError(data.error ?? "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "#0c1018" }}>

      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden>
        <div style={{
          position: "absolute", left: "50%", top: "30%",
          width: 500, height: 500, borderRadius: "50%",
          background: "#d1675a", opacity: 0.06,
          filter: "blur(120px)", transform: "translate(-50%,-50%)",
        }} />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Card */}
        <div className="rounded-2xl overflow-hidden"
          style={{ background: "#111827", border: "1px solid #1e2a3a" }}>
          <div className="h-[3px]" style={{ background: "linear-gradient(90deg, #96312e, #d1675a, #ffbf6b, transparent)" }} />

          <div className="p-8">
            {/* Logo */}
            <div className="flex flex-col items-center mb-8">
              <RJMMIcon size={48} />
              <p className="mt-3 text-xs font-mono uppercase tracking-widest" style={{ color: "#4a6a80" }}>
                Admin Portal
              </p>
            </div>

            <form onSubmit={submit} className="flex flex-col gap-4">
              {/* Password */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "#4a6a80" }}>
                  Password
                </label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#2a4a60" }} />
                  <input
                    type={show ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    required
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl text-sm font-mono focus:outline-none"
                    style={{
                      background: "#0e1e2c",
                      border: "1px solid " + (error ? "#d1675a" : "#1e2a3a"),
                      color: "#f0ece8",
                    }}
                  />
                  <button type="button" onClick={() => setShow(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 focus:outline-none"
                    style={{ color: "#2a4a60" }}>
                    {show ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
                {error && <p className="mt-1.5 text-xs font-mono" style={{ color: "#d1675a" }}>{error}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold mt-2 transition-all focus:outline-none"
                style={{
                  background: loading ? "#2a4a60" : "#d1675a",
                  color: "#fff",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? <Loader2 size={15} className="animate-spin" /> : <Lock size={15} />}
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>
          </div>
        </div>

        <p className="text-center text-xs font-mono mt-4" style={{ color: "#1e2a3a" }}>
          Portfolio Admin · Secured access only
        </p>
      </div>
    </div>
  );
}
