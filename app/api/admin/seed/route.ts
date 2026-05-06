import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getAdminSession } from "@/lib/auth";
import { profile, education, experiences, projects, skills, skillGroups } from "@/config/personal";
import { revalidatePortfolio } from "@/lib/revalidate";

export async function POST(req: NextRequest) {
  if (!(await getAdminSession()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = supabaseAdmin();
  const errors: string[] = [];

  // ── Profile ──────────────────────────────────────────────────
  const { error: profErr } = await db.from("profile").upsert({
    id: 1,
    name:             profile.name,
    first_name:       profile.firstName,
    last_name:        profile.lastName,
    initials:         profile.initials,
    title:            profile.title,
    titles:           profile.titles,
    tagline:          profile.tagline,
    email:            profile.email,
    phone:            profile.phone,
    phone_display:    profile.phoneDisplay,
    phone_hint:       profile.phoneHint,
    location:         profile.location,
    location_short:   profile.locationShort,
    location_hint:    profile.locationHint,
    github:           profile.github,
    github_display:   profile.githubDisplay,
    linkedin:         profile.linkedin,
    linkedin_display: profile.linkedinDisplay,
    available:        profile.available,
    available_text:   profile.availableText,
    status_text:      profile.statusText,
    status_hint:      profile.statusHint,
    hire_me_heading:  profile.hireMeHeading,
    hire_me_subtext:  profile.hireMeSubtext,
    cta_heading:      profile.ctaHeading,
    cta_subtext:      profile.ctaSubtext,
    contact_heading:  profile.contactHeading,
    contact_subtext:  profile.contactSubtext,
    site_title:       profile.siteTitle,
    site_description: profile.siteDescription,
    languages:        profile.languages,
    edu_school:       education.school,
    edu_degree:       education.degree,
    edu_major:        education.major,
    edu_years:        education.years,
    edu_badge:        education.badge,
  }, { onConflict: "id" });
  if (profErr) errors.push("profile: " + profErr.message);

  // ── Experiences ───────────────────────────────────────────────
  for (let i = 0; i < experiences.length; i++) {
    const exp = experiences[i];
    const { error } = await db.from("experiences").upsert({
      slug:       exp.id,
      role:       exp.role,
      company:    exp.company,
      period:     exp.period,
      location:   exp.location,
      status:     exp.status,
      color:      exp.color,
      summary:    exp.summary,
      highlights: exp.highlights,
      stack:      exp.stack,
      sort_order: i,
    }, { onConflict: "slug" });
    if (error) errors.push("experience " + exp.id + ": " + error.message);
  }

  // ── Projects ──────────────────────────────────────────────────
  for (let i = 0; i < projects.length; i++) {
    const proj = projects[i];
    const { error } = await db.from("projects").upsert({
      slug:        proj.id,
      title:       proj.title,
      url:         proj.url,
      description: proj.description,
      role:        proj.role,
      tags:        proj.tags,
      color:       proj.color,
      featured:    proj.featured,
      sort_order:  i,
    }, { onConflict: "slug" });
    if (error) errors.push("project " + proj.id + ": " + error.message);
  }

  // ── Sidebar skills ────────────────────────────────────────────
  await db.from("sidebar_skills").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  const { error: sbErr } = await db.from("sidebar_skills").insert(
    skills.map((s, i) => ({ label: s.label, category: s.category, sort_order: i }))
  );
  if (sbErr) errors.push("sidebar_skills: " + sbErr.message);

  // ── Skill groups + skills ─────────────────────────────────────
  for (let gi = 0; gi < skillGroups.length; gi++) {
    const group = skillGroups[gi];
    const { data: gData, error: gErr } = await db.from("skill_groups").upsert({
      slug:        group.id,
      label:       group.label,
      color:       group.color,
      icon:        group.icon,
      description: group.desc,
      sort_order:  gi,
    }, { onConflict: "slug" }).select().single();

    if (gErr || !gData) { errors.push("skill_group " + group.id + ": " + gErr?.message); continue; }

    // Delete old skills in this group then re-insert
    await db.from("skills").delete().eq("group_id", gData.id);
    const { error: skErr } = await db.from("skills").insert(
      group.skills.map((s, si) => ({
        group_id:   gData.id,
        label:      s.label,
        level:      s.level,
        used_in:    s.where,
        sort_order: si,
      }))
    );
    if (skErr) errors.push("skills for " + group.id + ": " + skErr.message);
  }

  if (errors.length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 207 });
  }
  revalidatePortfolio();
  return NextResponse.json({ ok: true, message: "Database seeded successfully" });
}
