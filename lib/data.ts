/**
 * lib/data.ts
 * ─────────────────────────────────────────────────────────────
 * Single source of truth for all portfolio data on the frontend.
 *
 * Priority:  Supabase (live) → config/personal.ts (fallback)
 *
 * This means:
 *  - If Supabase env vars are set → always reads from the database
 *  - If env vars are missing     → silently falls back to static config
 *
 * Usage (Server Component or API route):
 *   import { getPortfolioData } from "@/lib/data";
 *   const data = await getPortfolioData();
 */

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

// ─── Supabase row → domain type mappers ───────────────────────

type DbRow = Record<string, unknown>;

function str(v: unknown, fallback: string): string {
  return typeof v === "string" ? v : fallback;
}
function bool(v: unknown, fallback: boolean): boolean {
  return typeof v === "boolean" ? v : fallback;
}
function strArr(v: unknown, fallback: string[]): string[] {
  return Array.isArray(v) ? (v as string[]) : fallback;
}
function num(v: unknown, fallback: number): number {
  return typeof v === "number" ? v : fallback;
}

function mapProfile(row: DbRow): ProfileData {
  return {
    name:            str(row.name,             staticProfile.name),
    firstName:       str(row.first_name,       staticProfile.firstName),
    lastName:        str(row.last_name,        staticProfile.lastName),
    initials:        str(row.initials,         staticProfile.initials),
    title:           str(row.title,            staticProfile.title),
    titles:          strArr(row.titles,        staticProfile.titles),
    tagline:         str(row.tagline,          staticProfile.tagline),
    email:           str(row.email,            staticProfile.email),
    phone:           str(row.phone,            staticProfile.phone),
    phoneDisplay:    str(row.phone_display,    staticProfile.phoneDisplay),
    phoneHint:       str(row.phone_hint,       staticProfile.phoneHint),
    location:        str(row.location,         staticProfile.location),
    locationShort:   str(row.location_short,   staticProfile.locationShort),
    locationHint:    str(row.location_hint,    staticProfile.locationHint),
    github:          str(row.github,           staticProfile.github),
    githubDisplay:   str(row.github_display,   staticProfile.githubDisplay),
    linkedin:        str(row.linkedin,         staticProfile.linkedin),
    linkedinDisplay: str(row.linkedin_display, staticProfile.linkedinDisplay),
    available:       bool(row.available,       staticProfile.available),
    availableText:   str(row.available_text,   staticProfile.availableText),
    statusText:      str(row.status_text,      staticProfile.statusText),
    statusHint:      str(row.status_hint,      staticProfile.statusHint),
    hireMeHeading:   str(row.hire_me_heading,  staticProfile.hireMeHeading),
    hireMeSubtext:   str(row.hire_me_subtext,  staticProfile.hireMeSubtext),
    ctaHeading:      str(row.cta_heading,      staticProfile.ctaHeading),
    ctaSubtext:      str(row.cta_subtext,      staticProfile.ctaSubtext),
    contactHeading:  str(row.contact_heading,  staticProfile.contactHeading),
    contactSubtext:  str(row.contact_subtext,  staticProfile.contactSubtext),
    siteTitle:       str(row.site_title,       staticProfile.siteTitle),
    siteDescription: str(row.site_description, staticProfile.siteDescription),
    languages:       strArr(row.languages,     staticProfile.languages),
  };
}

function mapEducation(row: DbRow): EducationData {
  return {
    school: str(row.edu_school, staticEducation.school),
    degree: str(row.edu_degree, staticEducation.degree),
    major:  str(row.edu_major,  staticEducation.major),
    years:  str(row.edu_years,  staticEducation.years),
    badge:  str(row.edu_badge,  staticEducation.badge),
  };
}

function mapExperience(row: DbRow): ExperienceData {
  return {
    id:         str(row.id,       ""),
    slug:       str(row.slug,     ""),
    role:       str(row.role,     ""),
    company:    str(row.company,  ""),
    period:     str(row.period,   ""),
    location:   str(row.location, ""),
    status:     str(row.status,   "past"),
    color:      str(row.color,    "#d1675a"),
    summary:    str(row.summary,  ""),
    highlights: strArr(row.highlights, []),
    stack:      strArr(row.stack,      []),
  };
}

function mapProject(row: DbRow): ProjectData {
  return {
    id:          str(row.id,          ""),
    slug:        str(row.slug,        ""),
    title:       str(row.title,       ""),
    url:         str(row.url,         ""),
    description: str(row.description, ""),
    role:        str(row.role,        ""),
    tags:        strArr(row.tags,     []),
    color:       str(row.color,       "#d1675a"),
    featured:    bool(row.featured,   false),
  };
}

function mapSkillGroup(row: DbRow): SkillGroupData {
  const rawSkills = Array.isArray(row.skills) ? (row.skills as DbRow[]) : [];
  return {
    id:    str(row.id,          ""),
    label: str(row.label,       ""),
    color: str(row.color,       "#398eb2"),
    icon:  str(row.icon,        "Monitor"),
    desc:  str(row.description, ""),
    skills: rawSkills.map(s => ({
      label: str(s.label,   ""),
      level: num(s.level,   1),
      where: strArr(s.used_in, []),
    })),
  };
}

// ─── Main fetch function ───────────────────────────────────────

export async function getPortfolioData(): Promise<PortfolioData> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If env vars are missing, return static config immediately
  if (!supabaseUrl || !supabaseKey) {
    return getStaticData();
  }

  try {
    const headers = {
      apikey:        supabaseKey,
      Authorization: "Bearer " + supabaseKey,
      "Content-Type": "application/json",
    };
    const base = supabaseUrl + "/rest/v1";

    const [profileRes, experiencesRes, projectsRes, skillGroupsRes] =
      await Promise.all([
        fetch(base + "/profile?id=eq.1&limit=1", { headers, cache: "no-store" }),
        fetch(base + "/experiences?order=sort_order.asc", { headers, cache: "no-store" }),
        fetch(base + "/projects?order=sort_order.asc", { headers, cache: "no-store" }),
        fetch(base + "/skill_groups?order=sort_order.asc&select=*,skills(*)", { headers, cache: "no-store" }),
      ]);

    if (!profileRes.ok || !experiencesRes.ok || !projectsRes.ok || !skillGroupsRes.ok) {
      console.warn("[data] Supabase fetch failed, falling back to static config");
      return getStaticData();
    }

    const [profileRows, experienceRows, projectRows, skillGroupRows] =
      await Promise.all([
        profileRes.json(),
        experiencesRes.json(),
        projectsRes.json(),
        skillGroupsRes.json(),
      ]);

    const profileRow = Array.isArray(profileRows) ? profileRows[0] : profileRows;

    return {
      profile:     mapProfile(profileRow ?? {}),
      education:   mapEducation(profileRow ?? {}),
      experiences: Array.isArray(experienceRows) ? experienceRows.map(mapExperience) : staticExperiences,
      projects:    Array.isArray(projectRows)    ? projectRows.map(mapProject)    : staticProjects,
      skills:      staticSkills, // sidebar badges still from config
      skillGroups: Array.isArray(skillGroupRows) ? skillGroupRows.map(mapSkillGroup) : staticSkillGroups,
    };
  } catch (err) {
    console.warn("[data] Supabase error, using static config:", err);
    return getStaticData();
  }
}

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
