-- ═══════════════════════════════════════════════════════════════
--  PORTFOLIO ADMIN — Supabase Schema
--  Run this entire file in your Supabase SQL Editor (one paste).
-- ═══════════════════════════════════════════════════════════════

-- ── Profile (single row) ──────────────────────────────────────
create table if not exists profile (
  id               serial primary key,
  name             text not null default 'Racel Jude Marahay',
  first_name       text not null default 'Racel Jude',
  last_name        text not null default 'Marahay',
  initials         text not null default 'RJ',
  title            text not null default 'Software Developer',
  titles           text[] not null default array[
    'Software Developer','Full-Stack Developer','Frontend Engineer',
    'React Developer','Node.js Developer','Google Workspace Developer',
    'Application Developer','IT Support Specialist'
  ],
  tagline          text not null default 'Building things that work — from full-stack apps to automated business systems.',
  email            text not null default 'raceljude@gmail.com',
  phone            text not null default '+639683971574',
  phone_display    text not null default '+63 968 397 1574',
  phone_hint       text not null default 'Mon–Fri, 9AM–6PM PHT',
  location         text not null default 'Makati City, Metro Manila, PH',
  location_short   text not null default 'Makati, Metro Manila',
  location_hint    text not null default 'Open to remote and on-site',
  github           text not null default 'https://github.com/raceljude',
  github_display   text not null default 'github.com/raceljude',
  linkedin         text not null default 'https://www.linkedin.com/in/racel-jude-marahay-76b15a29b',
  linkedin_display text not null default 'racel-jude-marahay',
  available        boolean not null default true,
  available_text   text not null default 'Open to opportunities',
  status_text      text not null default 'Open to hire',
  status_hint      text not null default 'Actively looking for opportunities',
  hire_me_heading  text not null default 'Let''s work together',
  hire_me_subtext  text not null default 'I''m open to full-time, freelance, and contract opportunities.',
  cta_heading      text not null default 'Drop me a message',
  cta_subtext      text not null default 'I typically respond within 24 hours.',
  contact_heading  text not null default 'Let''s work together',
  contact_subtext  text not null default 'I''m open to full-time roles, freelance projects, and contract work.',
  site_title       text not null default 'Racel Jude Marahay — Software Developer',
  site_description text not null default 'Junior Software Developer specializing in MERN/PERN stack.',
  languages        text[] not null default array['English','Tagalog'],
  edu_school       text not null default 'National University — Manila',
  edu_degree       text not null default 'Bachelor of Science in Information Technology',
  edu_major        text not null default 'Major in Mobile and Web Application',
  edu_years        text not null default '2019 – 2024',
  edu_badge        text not null default 'BSIT',
  updated_at       timestamptz default now()
);

-- Ensure only one row ever exists
insert into profile (id) values (1) on conflict (id) do nothing;

-- ── Experiences ───────────────────────────────────────────────
create table if not exists experiences (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  role        text not null,
  company     text not null,
  period      text not null,
  location    text not null,
  status      text not null check (status in ('current','past')),
  color       text not null default '#d1675a',
  summary     text not null,
  highlights  text[] not null default '{}',
  stack       text[] not null default '{}',
  sort_order  integer not null default 0,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- ── Projects ──────────────────────────────────────────────────
create table if not exists projects (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  url         text not null,
  description text not null,
  role        text not null,
  tags        text[] not null default '{}',
  color       text not null default '#d1675a',
  featured    boolean not null default false,
  sort_order  integer not null default 0,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- ── Skill Groups ──────────────────────────────────────────────
create table if not exists skill_groups (
  id         uuid primary key default gen_random_uuid(),
  slug       text unique not null,
  label      text not null,
  color      text not null default '#398eb2',
  icon       text not null default 'Monitor',
  description text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz default now()
);

-- ── Skills ────────────────────────────────────────────────────
create table if not exists skills (
  id             uuid primary key default gen_random_uuid(),
  group_id       uuid not null references skill_groups(id) on delete cascade,
  label          text not null,
  level          integer not null check (level between 1 and 5),
  used_in        text[] not null default '{}',
  sort_order     integer not null default 0,
  created_at     timestamptz default now()
);

-- ── Sidebar Skills (simple badges) ────────────────────────────
create table if not exists sidebar_skills (
  id         uuid primary key default gen_random_uuid(),
  label      text not null,
  category   text not null,
  sort_order integer not null default 0
);

-- ── RLS: allow public read, restrict write ────────────────────
alter table profile       enable row level security;
alter table experiences   enable row level security;
alter table projects      enable row level security;
alter table skill_groups  enable row level security;
alter table skills        enable row level security;
alter table sidebar_skills enable row level security;

-- Public can read everything
create policy "public read profile"        on profile        for select using (true);
create policy "public read experiences"    on experiences    for select using (true);
create policy "public read projects"       on projects       for select using (true);
create policy "public read skill_groups"   on skill_groups   for select using (true);
create policy "public read skills"         on skills         for select using (true);
create policy "public read sidebar_skills" on sidebar_skills for select using (true);

-- Service role (used by API routes with SUPABASE_SERVICE_KEY) can write
create policy "service write profile"        on profile        for all using (auth.role() = 'service_role');
create policy "service write experiences"    on experiences    for all using (auth.role() = 'service_role');
create policy "service write projects"       on projects       for all using (auth.role() = 'service_role');
create policy "service write skill_groups"   on skill_groups   for all using (auth.role() = 'service_role');
create policy "service write skills"         on skills         for all using (auth.role() = 'service_role');
create policy "service write sidebar_skills" on sidebar_skills for all using (auth.role() = 'service_role');

-- ── Updated-at trigger ────────────────────────────────────────
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

create trigger trg_profile_updated    before update on profile    for each row execute procedure set_updated_at();
create trigger trg_exp_updated        before update on experiences for each row execute procedure set_updated_at();
create trigger trg_projects_updated   before update on projects    for each row execute procedure set_updated_at();
