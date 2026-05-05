"use client";

import { useEffect, useState } from "react";
import { Save, Loader2, RefreshCw } from "lucide-react";

type ProfileRow = Record<string, unknown>;

const TEXT_FIELDS = [
  { key: "name",             label: "Full Name" },
  { key: "first_name",       label: "First Name" },
  { key: "last_name",        label: "Last Name" },
  { key: "initials",         label: "Initials" },
  { key: "title",            label: "Title (static)" },
  { key: "tagline",          label: "Tagline" },
  { key: "email",            label: "Email" },
  { key: "phone",            label: "Phone (raw)" },
  { key: "phone_display",    label: "Phone (display)" },
  { key: "phone_hint",       label: "Phone Hint" },
  { key: "location",         label: "Location (full)" },
  { key: "location_short",   label: "Location (short)" },
  { key: "location_hint",    label: "Location Hint" },
  { key: "github",           label: "GitHub URL" },
  { key: "github_display",   label: "GitHub Display" },
  { key: "linkedin",         label: "LinkedIn URL" },
  { key: "linkedin_display", label: "LinkedIn Display" },
  { key: "available_text",   label: "Available Badge Text" },
  { key: "status_text",      label: "Status Text" },
  { key: "status_hint",      label: "Status Hint" },
  { key: "hire_me_heading",  label: "Hire Me Modal Heading" },
  { key: "hire_me_subtext",  label: "Hire Me Modal Subtext" },
  { key: "cta_heading",      label: "CTA Banner Heading" },
  { key: "cta_subtext",      label: "CTA Banner Subtext" },
  { key: "contact_heading",  label: "Contact Section Heading" },
  { key: "contact_subtext",  label: "Contact Section Subtext" },
  { key: "site_title",       label: "SEO Title" },
  { key: "site_description", label: "SEO Description" },
  { key: "edu_school",       label: "School" },
  { key: "edu_degree",       label: "Degree" },
  { key: "edu_major",        label: "Major" },
  { key: "edu_years",        label: "Education Years" },
  { key: "edu_badge",        label: "Education Badge" },
];

const ARRAY_FIELDS = [
  { key: "titles",    label: "Rotating Job Titles (one per line)" },
  { key: "languages", label: "Languages (one per line)" },
];

const BOOL_FIELDS = [
  { key: "available", label: "Available for hire" },
];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-mono uppercase tracking-widest mb-1.5" style={{ color: "#4a6a80" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%", padding: "8px 12px", borderRadius: "10px",
  background: "#0e1e2c", border: "1px solid #1e2a3a",
  color: "#f0ece8", fontSize: "13px", fontFamily: "var(--font-mono)",
  outline: "none",
};

export default function AdminProfile() {
  const [data,    setData]    = useState<ProfileRow | null>(null);
  const [saving,  setSaving]  = useState(false);
  const [msg,     setMsg]     = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/profile");
    if (res.ok) setData(await res.json());
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const set = (key: string, val: unknown) => setData(d => d ? { ...d, [key]: val } : d);

  const save = async () => {
    if (!data) return;
    setSaving(true); setMsg("");
    const res  = await fetch("/api/admin/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setMsg(res.ok ? "Saved!" : "Error saving.");
    setTimeout(() => setMsg(""), 3000);
  };

  if (loading) return (
    <div className="p-8 flex items-center gap-2" style={{ color: "#4a6a80" }}>
      <Loader2 size={16} className="animate-spin" /> Loading...
    </div>
  );

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: "#4a6a80" }}>Admin</p>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)", color: "#f0ece8" }}>Profile</h1>
        </div>
        <div className="flex items-center gap-2">
          {msg && <span className="text-xs font-mono" style={{ color: msg === "Saved!" ? "#4a9a6a" : "#d1675a" }}>{msg}</span>}
          <button onClick={load} className="p-2 rounded-xl focus:outline-none"
            style={{ background: "#0e1e2c", border: "1px solid #1e2a3a", color: "#4a6a80" }}>
            <RefreshCw size={14} />
          </button>
          <button onClick={save} disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono focus:outline-none"
            style={{ background: "#d1675a", color: "#fff" }}>
            {saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {/* Text fields */}
        {TEXT_FIELDS.map(f => (
          <Field key={f.key} label={f.label}>
            <input
              style={inputStyle}
              value={(data?.[f.key] as string) ?? ""}
              onChange={e => set(f.key, e.target.value)}
            />
          </Field>
        ))}

        {/* Array fields */}
        {ARRAY_FIELDS.map(f => (
          <Field key={f.key} label={f.label}>
            <textarea
              rows={5}
              style={{ ...inputStyle, resize: "vertical" }}
              value={((data?.[f.key] as string[]) ?? []).join("\n")}
              onChange={e => set(f.key, e.target.value.split("\n").filter(Boolean))}
            />
          </Field>
        ))}

        {/* Bool fields */}
        {BOOL_FIELDS.map(f => (
          <Field key={f.key} label={f.label}>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={(data?.[f.key] as boolean) ?? false}
                onChange={e => set(f.key, e.target.checked)}
                className="w-4 h-4 accent-red-400"
              />
              <span className="text-sm font-mono" style={{ color: "#8aa8bc" }}>
                {(data?.[f.key] as boolean) ? "Yes — showing available badge" : "No — badge hidden"}
              </span>
            </label>
          </Field>
        ))}
      </div>
    </div>
  );
}
