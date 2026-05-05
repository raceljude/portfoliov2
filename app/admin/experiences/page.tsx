"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Loader2, X, Save, ChevronDown, ChevronUp } from "lucide-react";

interface Exp {
  id: string; slug: string; role: string; company: string;
  period: string; location: string; status: string; color: string;
  summary: string; highlights: string[]; stack: string[]; sort_order: number;
}

const EMPTY: Partial<Exp> = {
  slug: "", role: "", company: "", period: "", location: "",
  status: "past", color: "#d1675a", summary: "", highlights: [], stack: [],
};

const inp = {
  width: "100%", padding: "8px 12px", borderRadius: "10px",
  background: "#0e1e2c", border: "1px solid #1e2a3a",
  color: "#f0ece8", fontSize: "13px", outline: "none",
};

function Modal({ exp, onClose, onSave }: { exp: Partial<Exp>; onClose: () => void; onSave: (d: Partial<Exp>) => void }) {
  const [form, setForm] = useState<Partial<Exp>>(exp);
  const set = (k: keyof Exp, v: unknown) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)" }}>
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{ background: "#111827", border: "1px solid #1e2a3a" }}>
        <div className="h-[3px]" style={{ background: "linear-gradient(90deg,#d1675a,transparent)" }} />
        <div className="p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-lg" style={{ color: "#f0ece8" }}>
              {form.id ? "Edit Experience" : "New Experience"}
            </h2>
            <button onClick={onClose} style={{ color: "#4a6a80" }}><X size={16} /></button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {([["slug","Slug (unique ID)"],["role","Role"],["company","Company"],["period","Period"],["location","Location"],["color","Accent Color"]] as [keyof Exp, string][]).map(([k,l]) => (
              <div key={k} className={k === "role" || k === "company" || k === "location" ? "col-span-2" : ""}>
                <label className="block text-xs font-mono uppercase tracking-widest mb-1" style={{ color: "#4a6a80" }}>{l}</label>
                <input style={inp} value={(form[k] as string) ?? ""} onChange={e => set(k, e.target.value)} />
              </div>
            ))}

            <div>
              <label className="block text-xs font-mono uppercase tracking-widest mb-1" style={{ color: "#4a6a80" }}>Status</label>
              <select style={inp} value={form.status ?? "past"} onChange={e => set("status", e.target.value)}>
                <option value="current">Current</option>
                <option value="past">Past</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-xs font-mono uppercase tracking-widest mb-1" style={{ color: "#4a6a80" }}>Summary</label>
              <textarea rows={3} style={{ ...inp, resize: "vertical" }} value={form.summary ?? ""}
                onChange={e => set("summary", e.target.value)} />
            </div>

            <div className="col-span-2">
              <label className="block text-xs font-mono uppercase tracking-widest mb-1" style={{ color: "#4a6a80" }}>Highlights (one per line)</label>
              <textarea rows={5} style={{ ...inp, resize: "vertical" }}
                value={(form.highlights ?? []).join("\n")}
                onChange={e => set("highlights", e.target.value.split("\n"))} />
            </div>

            <div className="col-span-2">
              <label className="block text-xs font-mono uppercase tracking-widest mb-1" style={{ color: "#4a6a80" }}>Stack (comma separated)</label>
              <input style={inp} value={(form.stack ?? []).join(", ")}
                onChange={e => set("stack", e.target.value.split(",").map(s => s.trim()).filter(Boolean))} />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button onClick={onClose} className="px-4 py-2 rounded-xl text-xs font-mono"
              style={{ background: "#0e1e2c", border: "1px solid #1e2a3a", color: "#4a6a80" }}>Cancel</button>
            <button onClick={() => onSave(form)} className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono"
              style={{ background: "#d1675a", color: "#fff" }}>
              <Save size={13} /> Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminExperiences() {
  const [items,   setItems]   = useState<Exp[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Exp> | null>(null);
  const [deleting,setDeleting]= useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/experiences");
    if (res.ok) setItems(await res.json());
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const save = async (form: Partial<Exp>) => {
    const method = form.id ? "PATCH" : "POST";
    const url    = form.id ? "/api/admin/experiences/" + form.id : "/api/admin/experiences";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setEditing(null);
    load();
  };

  const del = async (id: string) => {
    setDeleting(id);
    await fetch("/api/admin/experiences/" + id, { method: "DELETE" });
    setDeleting(null);
    load();
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: "#4a6a80" }}>Admin</p>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)", color: "#f0ece8" }}>Experiences</h1>
        </div>
        <button onClick={() => setEditing(EMPTY)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono focus:outline-none"
          style={{ background: "#d1675a", color: "#fff" }}>
          <Plus size={14} /> Add Experience
        </button>
      </div>

      {loading ? (
        <div className="flex items-center gap-2" style={{ color: "#4a6a80" }}>
          <Loader2 size={16} className="animate-spin" /> Loading...
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map(exp => (
            <div key={exp.id} className="rounded-xl p-5 flex items-start justify-between gap-4"
              style={{ background: "#111827", border: "1px solid #1e2a3a" }}>
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-3 h-3 rounded-full mt-1.5 shrink-0" style={{ background: exp.color }} />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-semibold text-sm" style={{ color: "#f0ece8" }}>{exp.role}</span>
                    {exp.status === "current" && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full"
                        style={{ color: "#d1675a", background: "#d1675a18", border: "1px solid #d1675a35" }}>Current</span>
                    )}
                  </div>
                  <p className="text-xs" style={{ color: "#4a6a80" }}>{exp.company} · {exp.period}</p>
                  <p className="text-xs mt-1 line-clamp-1" style={{ color: "#2a4a60" }}>{exp.summary}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => setEditing(exp)} className="p-2 rounded-lg focus:outline-none"
                  style={{ background: "#0e1e2c", border: "1px solid #1e2a3a", color: "#4a6a80" }}>
                  <Pencil size={13} />
                </button>
                <button onClick={() => del(exp.id)} disabled={deleting === exp.id}
                  className="p-2 rounded-lg focus:outline-none"
                  style={{ background: "#0e1e2c", border: "1px solid #1e2a3a", color: "#d1675a" }}>
                  {deleting === exp.id ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <p className="text-sm font-mono" style={{ color: "#2a4a60" }}>
              No experiences yet. Click &quot;Add Experience&quot; or seed from config.
            </p>
          )}
        </div>
      )}

      {editing && <Modal exp={editing} onClose={() => setEditing(null)} onSave={save} />}
    </div>
  );
}
