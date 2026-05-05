"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Loader2, X, Save, ExternalLink } from "lucide-react";

interface Project {
  id: string; slug: string; title: string; url: string;
  description: string; role: string; tags: string[];
  color: string; featured: boolean; sort_order: number;
}

const EMPTY: Partial<Project> = {
  slug: "", title: "", url: "", description: "", role: "",
  tags: [], color: "#d1675a", featured: false,
};

const inp = {
  width: "100%", padding: "8px 12px", borderRadius: "10px",
  background: "#0e1e2c", border: "1px solid #1e2a3a",
  color: "#f0ece8", fontSize: "13px", outline: "none",
};

function Modal({ proj, onClose, onSave }: { proj: Partial<Project>; onClose: () => void; onSave: (d: Partial<Project>) => void }) {
  const [form, setForm] = useState<Partial<Project>>(proj);
  const set = (k: keyof Project, v: unknown) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)" }}>
      <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{ background: "#111827", border: "1px solid #1e2a3a" }}>
        <div className="h-[3px]" style={{ background: "linear-gradient(90deg,#398eb2,transparent)" }} />
        <div className="p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-lg" style={{ color: "#f0ece8" }}>
              {form.id ? "Edit Project" : "New Project"}
            </h2>
            <button onClick={onClose} style={{ color: "#4a6a80" }}><X size={16} /></button>
          </div>

          <div className="flex flex-col gap-4">
            {([["slug","Slug (unique ID)"],["title","Title"],["url","URL"],["color","Accent Color"]] as [keyof Project,string][]).map(([k,l]) => (
              <div key={k}>
                <label className="block text-xs font-mono uppercase tracking-widest mb-1" style={{ color: "#4a6a80" }}>{l}</label>
                <input style={inp} value={(form[k] as string) ?? ""} onChange={e => set(k, e.target.value)} />
              </div>
            ))}

            <div>
              <label className="block text-xs font-mono uppercase tracking-widest mb-1" style={{ color: "#4a6a80" }}>Description</label>
              <textarea rows={3} style={{ ...inp, resize: "vertical" }} value={form.description ?? ""}
                onChange={e => set("description", e.target.value)} />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-widest mb-1" style={{ color: "#4a6a80" }}>Your Role</label>
              <input style={inp} value={form.role ?? ""} onChange={e => set("role", e.target.value)} />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-widest mb-1" style={{ color: "#4a6a80" }}>Tags (comma separated)</label>
              <input style={inp} value={(form.tags ?? []).join(", ")}
                onChange={e => set("tags", e.target.value.split(",").map(s => s.trim()).filter(Boolean))} />
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.featured ?? false} onChange={e => set("featured", e.target.checked)} className="w-4 h-4 accent-red-400" />
              <span className="text-sm font-mono" style={{ color: "#8aa8bc" }}>Featured project</span>
            </label>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button onClick={onClose} className="px-4 py-2 rounded-xl text-xs font-mono"
              style={{ background: "#0e1e2c", border: "1px solid #1e2a3a", color: "#4a6a80" }}>Cancel</button>
            <button onClick={() => onSave(form)} className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono"
              style={{ background: "#398eb2", color: "#fff" }}>
              <Save size={13} /> Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminProjects() {
  const [items,    setItems]    = useState<Project[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [editing,  setEditing]  = useState<Partial<Project> | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/projects");
    if (res.ok) setItems(await res.json());
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const save = async (form: Partial<Project>) => {
    const method = form.id ? "PATCH" : "POST";
    const url    = form.id ? "/api/admin/projects/" + form.id : "/api/admin/projects";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setEditing(null);
    load();
  };

  const del = async (id: string) => {
    setDeleting(id);
    await fetch("/api/admin/projects/" + id, { method: "DELETE" });
    setDeleting(null);
    load();
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: "#4a6a80" }}>Admin</p>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)", color: "#f0ece8" }}>Projects</h1>
        </div>
        <button onClick={() => setEditing(EMPTY)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono"
          style={{ background: "#398eb2", color: "#fff" }}>
          <Plus size={14} /> Add Project
        </button>
      </div>

      {loading ? (
        <div className="flex items-center gap-2" style={{ color: "#4a6a80" }}><Loader2 size={16} className="animate-spin" /> Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {items.map(proj => (
            <div key={proj.id} className="rounded-xl p-5" style={{ background: "#111827", border: "1px solid #1e2a3a" }}>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: proj.color }} />
                  <span className="font-semibold text-sm" style={{ color: "#f0ece8" }}>{proj.title}</span>
                  {proj.featured && <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full" style={{ color: "#ffbf6b", background: "#ffbf6b18", border: "1px solid #ffbf6b35" }}>Featured</span>}
                </div>
                <div className="flex items-center gap-1.5">
                  <a href={proj.url} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg"
                    style={{ background: "#0e1e2c", border: "1px solid #1e2a3a", color: "#4a6a80" }}>
                    <ExternalLink size={12} />
                  </a>
                  <button onClick={() => setEditing(proj)} className="p-1.5 rounded-lg"
                    style={{ background: "#0e1e2c", border: "1px solid #1e2a3a", color: "#4a6a80" }}>
                    <Pencil size={12} />
                  </button>
                  <button onClick={() => del(proj.id)} disabled={deleting === proj.id} className="p-1.5 rounded-lg"
                    style={{ background: "#0e1e2c", border: "1px solid #1e2a3a", color: "#d1675a" }}>
                    {deleting === proj.id ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
                  </button>
                </div>
              </div>
              <p className="text-xs line-clamp-2 mb-2" style={{ color: "#4a6a80" }}>{proj.description}</p>
              <div className="flex flex-wrap gap-1">
                {proj.tags.map(t => (
                  <span key={t} className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                    style={{ background: "#0e1e2c", border: "1px solid #1e2a3a", color: "#4a6a80" }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <p className="text-sm font-mono col-span-2" style={{ color: "#2a4a60" }}>No projects yet.</p>
          )}
        </div>
      )}

      {editing && <Modal proj={editing} onClose={() => setEditing(null)} onSave={save} />}
    </div>
  );
}
