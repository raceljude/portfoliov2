/**
 * lib/data.ts
 * ─────────────────────────────────────────────────────────────
 * Fetches portfolio data from Supabase on the server side.
 * Falls back to static config/personal.ts if env vars are missing.
 *
 * Uses @supabase/supabase-js (same client as API routes) so auth
 * headers, RLS, and error handling all work identically.
 */

import { createClient } from "@supabase/supabase-js";
import {
  profile  as staticProfile,
  education as staticEducation,
  experiences as staticExperiences,
  projects as staticProjects,
  skills as staticSkills,
  skillGroups as staticSkillGroups,
} from "@/config/personal";

// ─── Types ────────────────────────────────────────────────────

export interface ProfileData {
  name: string; firstName: string; lastName: string; initials: string;
  title: string; titles: string[]; tagline: string;
  email: string; phone: string; phoneDisplay: string; phoneHint: string;
  location: string; locationShort: string; locationHint: string;
  github: string; githubDisplay: string;
  linkedin: string; linkedinDisplay: string;
  available: boolean; availableText: string;
  statusText: string; statusHint: string;
  hireMeHeading: string; hireMeSubtext: string;
  ctaHeading: string; ctaSubtext: string;
  contactHeading: string; contactSubtext: string;
  siteTitle: string; siteDescription: string;
  languages: string[];
}

export interface EducationData {
  school: string; degree: string; major: string; years: string; badge: string;
}

export interface ExperienceData {
  id: string; slug?: string; role: string; company: string;
  period: string; location: string; status: string; color: string;
  summary: string; highlights: string[]; stack: string[];
}

export interface ProjectData {
  id: string; slug?: string; title: string; url: string;
  description: string; role: string; tags: string[];
  color: string; featured: boolean;
}

export interface SkillData {
  label: string; level: number; where: string[];
}

export interface SkillGroupData {
  id: string; label: string; color: string; icon: string;
  desc: string; skills: SkillData[];
}

export interface PortfolioData {
  profile:     ProfileData;
  education:   EducationData;
  experiences: ExperienceData[];
  projects:    ProjectData[];
  skills:      { label: string; category: string }[];
  skillGroups: SkillGroupData[];
}

// ─── Helpers ──────────────────────────────────────────────────

type Row = Record<string, unknown>;

function s(v: unknown, fb: string)   { return typeof v === "string"  ? v  : fb; }
function b(v: unknown, fb: boolean)  { return typeof v === "boolean" ? v  : fb; }
function n(v: unknown, fb: number)   { return typeof v === "number"  ? v  : fb; }
function sa(v: unknown, fb: string[]) {
  return Array.isArray(v) ? (v as string[]) : fb;
}

// ─── Row mappers ──────────────────────────────────────────────

function mapProfile(row: Row): ProfileData {
  return {
    name:            s(row.name,             staticProfile.name),
    firstName:       s(row.first_name,       staticProfile.firstName),
    lastName:        s(row.last_name,        staticProfile.lastName),
    initials:        s(row.initials,         staticProfile.initials),
    title:           s(row.title,            staticProfile.title),
    titles:          sa(row.titles,          staticProfile.titles),
    tagline:         s(row.tagline,          staticProfile.tagline),
    email:           s(row.email,            staticProfile.email),
    phone:           s(row.phone,            staticProfile.phone),
    phoneDisplay:    s(row.phone_display,    staticProfile.phoneDisplay),
    phoneHint:       s(row.phone_hint,       staticProfile.phoneHint),
    location:        s(row.location,         staticProfile.location),
    locationShort:   s(row.location_short,   staticProfile.locationShort),
    locationHint:    s(row.location_hint,    staticProfile.locationHint),
    github:          s(row.github,           staticProfile.github),
    githubDisplay:   s(row.github_display,   staticProfile.githubDisplay),
    linkedin:        s(row.linkedin,         staticProfile.linkedin),
    linkedinDisplay: s(row.linkedin_display, staticProfile.linkedinDisplay),
    available:       b(row.available,        staticProfile.available),
    availableText:   s(row.available_text,   staticProfile.availableText),
    statusText:      s(row.status_text,      staticProfile.statusText),
    statusHint:      s(row.status_hint,      staticProfile.statusHint),
    hireMeHeading:   s(row.hire_me_heading,  staticProfile.hireMeHeading),
    hireMeSubtext:   s(row.hire_me_subtext,  staticProfile.hireMeSubtext),
    ctaHeading:      s(row.cta_heading,      staticProfile.ctaHeading),
    ctaSubtext:      s(row.cta_subtext,      staticProfile.ctaSubtext),
    contactHeading:  s(row.contact_heading,  staticProfile.contactHeading),
    contactSubtext:  s(row.contact_subtext,  staticProfile.contactSubtext),
    siteTitle:       s(row.site_title,       staticProfile.siteTitle),
    siteDescription: s(row.site_description, staticProfile.siteDescription),
    languages:       sa(row.languages,       staticProfile.languages),
  };
}

function mapEducation(row: Row): EducationData {
  return {
    school: s(row.edu_school, staticEducation.school),
    degree: s(row.edu_degree, staticEducation.degree),
    major:  s(row.edu_major,  staticEducation.major),
    years:  s(row.edu_years,  staticEducation.years),
    badge:  s(row.edu_badge,  staticEducation.badge),
  };
}

function mapExperience(row: Row): ExperienceData {
  return {
    id:         s(row.id,       ""),
    slug:       s(row.slug,     ""),
    role:       s(row.role,     ""),
    company:    s(row.company,  ""),
    period:     s(row.period,   ""),
    location:   s(row.location, ""),
    status:     s(row.status,   "past"),
    color:      s(row.color,    "#d1675a"),
    summary:    s(row.summary,  ""),
    highlights: sa(row.highlights, []),
    stack:      sa(row.stack,      []),
  };
}

function mapProject(row: Row): ProjectData {
  return {
    id:          s(row.id,          ""),
    slug:        s(row.slug,        ""),
    title:       s(row.title,       ""),
    url:         s(row.url,         ""),
    description: s(row.description, ""),
    role:        s(row.role,        ""),
    tags:        sa(row.tags,       []),
    color:       s(row.color,       "#d1675a"),
    featured:    b(row.featured,    false),
  };
}

function mapSkillGroup(row: Row): SkillGroupData {
  const rawSkills = Array.isArray(row.skills) ? (row.skills as Row[]) : [];
  return {
    id:    s(row.id,          ""),
    label: s(row.label,       ""),
    color: s(row.color,       "#398eb2"),
    icon:  s(row.icon,        "Monitor"),
    desc:  s(row.description, ""),
    skills: rawSkills.map(sk => ({
      label: s(sk.label,   ""),
      level: n(sk.level,   1),
      where: sa(sk.used_in, []),
    })),
  };
}

// ─── Static fallback ──────────────────────────────────────────

function getStaticData(): PortfolioData {
  return {
    profile:     staticProfile as unknown as ProfileData,
    education:   staticEducation,
    experiences: staticExperiences,
    projects:    staticProjects,
    skills:      staticSkills,
    skillGroups: staticSkillGroups as unknown as SkillGroupData[],
  };
}

// ─── Main fetch ───────────────────────────────────────────────

export async function getPortfolioData(): Promise<PortfolioData> {
  const supabaseUrl    = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey    = process.env.SUPABASE_SERVICE_ROLE_KEY   // prefer service key server-side
                      ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn("[data] Supabase env vars not set — using static config");
    return getStaticData();
  }

  try {
    const db = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false },
    });

    const [
      { data: profileRows,    error: pErr },
      { data: expRows,        error: eErr },
      { data: projRows,       error: prErr },
      { data: groupRows,      error: gErr },
    ] = await Promise.all([
      db.from("profile").select("*").eq("id", 1).limit(1),
      db.from("experiences").select("*").order("sort_order", { ascending: true }),
      db.from("projects").select("*").order("sort_order", { ascending: true }),
      db.from("skill_groups").select("*, skills(*)").order("sort_order", { ascending: true }),
    ]);

    if (pErr || eErr || prErr || gErr) {
      console.warn("[data] Supabase query error:", pErr ?? eErr ?? prErr ?? gErr);
      return getStaticData();
    }

    const profileRow = Array.isArray(profileRows) && profileRows.length > 0
      ? (profileRows[0] as Row)
      : ({} as Row);

    return {
      profile:     mapProfile(profileRow),
      education:   mapEducation(profileRow),
      experiences: Array.isArray(expRows)   ? expRows.map(r => mapExperience(r as Row))   : staticExperiences,
      projects:    Array.isArray(projRows)  ? projRows.map(r => mapProject(r as Row))     : staticProjects,
      skills:      staticSkills,
      skillGroups: Array.isArray(groupRows) ? groupRows.map(r => mapSkillGroup(r as Row)) : (staticSkillGroups as unknown as SkillGroupData[]),
    };
  } catch (err) {
    console.warn("[data] Unexpected error, using static config:", err);
    return getStaticData();
  }
}
