"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Loader2, X, Save, ChevronDown, ChevronRight } from "lucide-react";

interface Skill { id: string; label: string; level: number; used_in: string[]; sort_order: number; }
interface Group { id: string; slug: string; label: string; color: string; icon: string; description: string; skills: Skill[]; }

const inp = {
  width: "100%", padding: "8px 12px", borderRadius: "10px",
  background: "#0e1e2c", border: "1px solid #1e2a3a",
  color: "#f0ece8", fontSize: "13px", outline: "none",
};

const ICONS = ["Monitor","Server","GitBranch","Cloud","Wrench","Code2","Database","Globe"];

function SkillModal({ skill, groupId, onClose, onSave }: { skill: Partial<Skill>; groupId: string; onClose: () => void; onSave: (d: Partial<Skill>) => void }) {
  const [form, setForm] = useState<Partial<Skill>>(skill);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.85)" }}>
      <div className="w-full max-w-md rounded-2xl" style={{ background: "#111827", border: "1px solid #1e2a3a" }}>
        <div className="h-[3px]" style={{ background: "linear-gradient(90deg,#ffbf6b,transparent)" }} />
        <div className="p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold" style={{ color: "#f0ece8" }}>{form.id ? "Edit Skill" : "New Skill"}</h2>
            <button onClick={onClose} style={{ color: "#4a6a80" }}><X size={16} /></button>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest mb-1" style={{ color: "#4a6a80" }}>Label</label>
              <input style={inp} value={form.label ?? ""} onChange={e => setForm(f => ({ ...f, label: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest mb-1" style={{ color: "#4a6a80" }}>Proficiency (1–5)</label>
              <div className="flex gap-2">
                {[1,2,3,4,5].map(n => (
                  <button key={n} onClick={() => setForm(f => ({ ...f, level: n }))}
                    className="w-9 h-9 rounded-lg text-sm font-bold focus:outline-none"
                    style={{ background: (form.level ?? 0) >= n ? "#ffbf6b" : "#0e1e2c", color: (form.level ?? 0) >= n ? "#111827" : "#4a6a80", border: "1px solid #1e2a3a" }}>
                    {n}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest mb-1" style={{ color: "#4a6a80" }}>Used In (one per line)</label>
              <textarea rows={4} style={{ ...inp, resize: "vertical" }}
                value={(form.used_in ?? []).join("\n")}
                onChange={e => setForm(f => ({ ...f, used_in: e.target.value.split("\n").filter(Boolean) }))} />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button onClick={onClose} className="px-4 py-2 rounded-xl text-xs font-mono"
              style={{ background: "#0e1e2c", border: "1px solid #1e2a3a", color: "#4a6a80" }}>Cancel</button>
            <button onClick={() => onSave(form)} className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono"
              style={{ background: "#ffbf6b", color: "#111827" }}>
              <Save size={13} /> Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminSkills() {
  const [groups,    setGroups]   = useState<Group[]>([]);
  const [loading,   setLoading]  = useState(true);
  const [expanded,  setExpanded] = useState<string | null>(null);
  const [skillEdit, setSkillEdit]= useState<{ skill: Partial<Skill>; groupId: string } | null>(null);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/skills");
    if (res.ok) setGroups(await res.json());
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const saveSkill = async (form: Partial<Skill>) => {
    if (!skillEdit) return;
    if (form.id) {
      await fetch("/api/admin/skills/" + form.id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "skill", data: form }),
      });
    } else {
      await fetch("/api/admin/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "skill", data: { ...form, group_id: skillEdit.groupId } }),
      });
    }
    setSkillEdit(null);
    load();
  };

  const delSkill = async (id: string) => {
    await fetch("/api/admin/skills/" + id + "?type=skill", { method: "DELETE" });
    load();
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: "#4a6a80" }}>Admin</p>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)", color: "#f0ece8" }}>Skills</h1>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center gap-2" style={{ color: "#4a6a80" }}><Loader2 size={16} className="animate-spin" /> Loading...</div>
      ) : (
        <div className="flex flex-col gap-4">
          {groups.map(group => (
            <div key={group.id} className="rounded-xl overflow-hidden" style={{ background: "#111827", border: "1px solid #1e2a3a" }}>
              {/* Group header */}
              <button className="w-full flex items-center justify-between p-5 focus:outline-none"
                onClick={() => setExpanded(expanded === group.id ? null : group.id)}>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ background: group.color }} />
                  <span className="font-semibold text-sm" style={{ color: "#f0ece8" }}>{group.label}</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded"
                    style={{ background: "#0e1e2c", border: "1px solid #1e2a3a", color: "#4a6a80" }}>
                    {group.skills?.length ?? 0} skills
                  </span>
                </div>
                {expanded === group.id ? <ChevronDown size={16} style={{ color: "#4a6a80" }} /> : <ChevronRight size={16} style={{ color: "#4a6a80" }} />}
              </button>

              {/* Skills list */}
              {expanded === group.id && (
                <div style={{ borderTop: "1px solid #1e2a3a" }}>
                  <div className="p-4 flex flex-col gap-2">
                    {(group.skills ?? []).map(skill => (
                      <div key={skill.id} className="flex items-center justify-between p-3 rounded-xl"
                        style={{ background: "#0e1e2c", border: "1px solid #1e2a3a" }}>
                        <div className="flex items-center gap-3">
                          <span className="text-sm" style={{ color: "#f0ece8" }}>{skill.label}</span>
                          <div className="flex gap-0.5">
                            {[1,2,3,4,5].map(n => (
                              <div key={n} className="w-1.5 h-1.5 rounded-full"
                                style={{ background: n <= skill.level ? group.color : "#1e2a3a" }} />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button onClick={() => setSkillEdit({ skill, groupId: group.id })}
                            className="p-1.5 rounded-lg" style={{ background: "#111827", border: "1px solid #1e2a3a", color: "#4a6a80" }}>
                            <Pencil size={11} />
                          </button>
                          <button onClick={() => delSkill(skill.id)}
                            className="p-1.5 rounded-lg" style={{ background: "#111827", border: "1px solid #1e2a3a", color: "#d1675a" }}>
                            <Trash2 size={11} />
                          </button>
                        </div>
                      </div>
                    ))}
                    <button onClick={() => setSkillEdit({ skill: { label: "", level: 3, used_in: [] }, groupId: group.id })}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono mt-1 focus:outline-none"
                      style={{ border: "1px dashed #1e2a3a", color: "#2a4a60" }}>
                      <Plus size={12} /> Add skill to {group.label}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {skillEdit && (
        <SkillModal
          skill={skillEdit.skill}
          groupId={skillEdit.groupId}
          onClose={() => setSkillEdit(null)}
          onSave={saveSkill}
        />
      )}
    </div>
  );
}
