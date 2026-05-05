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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapProfile(row: Record<string, any>): ProfileData {
  return {
    name:            row.name            ?? staticProfile.name,
    firstName:       row.first_name      ?? staticProfile.firstName,
    lastName:        row.last_name       ?? staticProfile.lastName,
    initials:        row.initials        ?? staticProfile.initials,
    title:           row.title           ?? staticProfile.title,
    titles:          row.titles          ?? staticProfile.titles,
    tagline:         row.tagline         ?? staticProfile.tagline,
    email:           row.email           ?? staticProfile.email,
    phone:           row.phone           ?? staticProfile.phone,
    phoneDisplay:    row.phone_display   ?? staticProfile.phoneDisplay,
    phoneHint:       row.phone_hint      ?? staticProfile.phoneHint,
    location:        row.location        ?? staticProfile.location,
    locationShort:   row.location_short  ?? staticProfile.locationShort,
    locationHint:    row.location_hint   ?? staticProfile.locationHint,
    github:          row.github          ?? staticProfile.github,
    githubDisplay:   row.github_display  ?? staticProfile.githubDisplay,
    linkedin:        row.linkedin        ?? staticProfile.linkedin,
    linkedinDisplay: row.linkedin_display ?? staticProfile.linkedinDisplay,
    available:       row.available       ?? staticProfile.available,
    availableText:   row.available_text  ?? staticProfile.availableText,
    statusText:      row.status_text     ?? staticProfile.statusText,
    statusHint:      row.status_hint     ?? staticProfile.statusHint,
    hireMeHeading:   row.hire_me_heading ?? staticProfile.hireMeHeading,
    hireMeSubtext:   row.hire_me_subtext ?? staticProfile.hireMeSubtext,
    ctaHeading:      row.cta_heading     ?? staticProfile.ctaHeading,
    ctaSubtext:      row.cta_subtext     ?? staticProfile.ctaSubtext,
    contactHeading:  row.contact_heading ?? staticProfile.contactHeading,
    contactSubtext:  row.contact_subtext ?? staticProfile.contactSubtext,
    siteTitle:       row.site_title      ?? staticProfile.siteTitle,
    siteDescription: row.site_description ?? staticProfile.siteDescription,
    languages:       row.languages       ?? staticProfile.languages,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapEducation(row: Record<string, any>): EducationData {
  return {
    school: row.edu_school ?? staticEducation.school,
    degree: row.edu_degree ?? staticEducation.degree,
    major:  row.edu_major  ?? staticEducation.major,
    years:  row.edu_years  ?? staticEducation.years,
    badge:  row.edu_badge  ?? staticEducation.badge,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapExperience(row: Record<string, any>): ExperienceData {
  return {
    id:         row.id,
    slug:       row.slug,
    role:       row.role,
    company:    row.company,
    period:     row.period,
    location:   row.location,
    status:     row.status,
    color:      row.color,
    summary:    row.summary,
    highlights: row.highlights ?? [],
    stack:      row.stack ?? [],
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapProject(row: Record<string, any>): ProjectData {
  return {
    id:          row.id,
    slug:        row.slug,
    title:       row.title,
    url:         row.url,
    description: row.description,
    role:        row.role,
    tags:        row.tags ?? [],
    color:       row.color,
    featured:    row.featured ?? false,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapSkillGroup(row: Record<string, any>): SkillGroupData {
  return {
    id:    row.id,
    label: row.label,
    color: row.color,
    icon:  row.icon,
    desc:  row.description ?? "",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    skills: (row.skills ?? []).map((s: Record<string, any>) => ({
      label: s.label,
      level: s.level,
      where: s.used_in ?? [],
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
