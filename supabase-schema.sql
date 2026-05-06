-- ═══════════════════════════════════════════════════════════════
--  PORTFOLIO ADMIN — Supabase Schema  (v2 — fixed RLS)
--  Run this entire file in your Supabase SQL Editor.
--  Safe to re-run: uses IF NOT EXISTS + OR REPLACE.
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
  role        text not null default '',
  tags        text[] not null default '{}',
  color       text not null default '#d1675a',
  featured    boolean not null default false,
  sort_order  integer not null default 0,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- ── Skill Groups ──────────────────────────────────────────────
create table if not exists skill_groups (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  label       text not null,
  color       text not null default '#398eb2',
  icon        text not null default 'Monitor',
  description text not null default '',
  sort_order  integer not null default 0,
  created_at  timestamptz default now()
);

-- ── Skills ────────────────────────────────────────────────────
create table if not exists skills (
  id         uuid primary key default gen_random_uuid(),
  group_id   uuid not null references skill_groups(id) on delete cascade,
  label      text not null,
  level      integer not null check (level between 1 and 5),
  used_in    text[] not null default '{}',
  sort_order integer not null default 0,
  created_at timestamptz default now()
);

-- ── Sidebar Skills ────────────────────────────────────────────
create table if not exists sidebar_skills (
  id         uuid primary key default gen_random_uuid(),
  label      text not null,
  category   text not null,
  sort_order integer not null default 0
);

-- ── RLS ───────────────────────────────────────────────────────
-- Enable RLS on all tables
alter table profile        enable row level security;
alter table experiences    enable row level security;
alter table projects       enable row level security;
alter table skill_groups   enable row level security;
alter table skills         enable row level security;
alter table sidebar_skills enable row level security;

-- Drop old policies if they exist (safe re-run)
drop policy if exists "public read profile"        on profile;
drop policy if exists "public read experiences"    on experiences;
drop policy if exists "public read projects"       on projects;
drop policy if exists "public read skill_groups"   on skill_groups;
drop policy if exists "public read skills"         on skills;
drop policy if exists "public read sidebar_skills" on sidebar_skills;
drop policy if exists "service write profile"        on profile;
drop policy if exists "service write experiences"    on experiences;
drop policy if exists "service write projects"       on projects;
drop policy if exists "service write skill_groups"   on skill_groups;
drop policy if exists "service write skills"         on skills;
drop policy if exists "service write sidebar_skills" on sidebar_skills;
drop policy if exists "allow all profile"        on profile;
drop policy if exists "allow all experiences"    on experiences;
drop policy if exists "allow all projects"       on projects;
drop policy if exists "allow all skill_groups"   on skill_groups;
drop policy if exists "allow all skills"         on skills;
drop policy if exists "allow all sidebar_skills" on sidebar_skills;

-- Public SELECT (anon key)
create policy "public read profile"        on profile        for select using (true);
create policy "public read experiences"    on experiences    for select using (true);
create policy "public read projects"       on projects       for select using (true);
create policy "public read skill_groups"   on skill_groups   for select using (true);
create policy "public read skills"         on skills         for select using (true);
create policy "public read sidebar_skills" on sidebar_skills for select using (true);

-- ALL operations allowed (service key bypasses RLS automatically in Supabase)
-- These policies are for anon/authenticated fallback — service_role always bypasses RLS
create policy "allow all profile"        on profile        for all using (true) with check (true);
create policy "allow all experiences"    on experiences    for all using (true) with check (true);
create policy "allow all projects"       on projects       for all using (true) with check (true);
create policy "allow all skill_groups"   on skill_groups   for all using (true) with check (true);
create policy "allow all skills"         on skills         for all using (true) with check (true);
create policy "allow all sidebar_skills" on sidebar_skills for all using (true) with check (true);

-- ── Updated-at trigger ────────────────────────────────────────
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

drop trigger if exists trg_profile_updated  on profile;
drop trigger if exists trg_exp_updated      on experiences;
drop trigger if exists trg_proj_updated     on projects;

create trigger trg_profile_updated before update on profile    for each row execute procedure set_updated_at();
create trigger trg_exp_updated     before update on experiences for each row execute procedure set_updated_at();
create trigger trg_proj_updated    before update on projects    for each row execute procedure set_updated_at();

-- ── Seed data (your actual portfolio data) ────────────────────

-- Profile
update profile set
  name             = 'Racel Jude Marahay',
  first_name       = 'Racel Jude',
  last_name        = 'Marahay',
  initials         = 'RJ',
  title            = 'Software Developer',
  titles           = array['Software Developer','Full-Stack Developer','Frontend Engineer','React Developer','Node.js Developer','Google Workspace Developer','Application Developer','IT Support Specialist'],
  tagline          = 'Building things that work — from full-stack apps to automated business systems.',
  email            = 'raceljude@gmail.com',
  phone            = '+639683971574',
  phone_display    = '+63 968 397 1574',
  phone_hint       = 'Mon–Fri, 9AM–6PM PHT',
  location         = 'Makati City, Metro Manila, PH',
  location_short   = 'Makati, Metro Manila',
  location_hint    = 'Open to remote and on-site',
  github           = 'https://github.com/raceljude',
  github_display   = 'github.com/raceljude',
  linkedin         = 'https://www.linkedin.com/in/racel-jude-marahay-76b15a29b',
  linkedin_display = 'racel-jude-marahay',
  available        = true,
  available_text   = 'Open to opportunities',
  status_text      = 'Open to hire',
  status_hint      = 'Actively looking for opportunities',
  hire_me_heading  = 'Let''s work together',
  hire_me_subtext  = 'I''m open to full-time, freelance, and contract opportunities. Reach out through any of the channels below.',
  cta_heading      = 'Drop me a message',
  cta_subtext      = 'I typically respond within 24 hours.',
  contact_heading  = 'Let''s work together',
  contact_subtext  = 'I''m open to full-time roles, freelance projects, and contract work. Whether you have a project in mind or just want to connect — reach out.',
  site_title       = 'Racel Jude Marahay — Software Developer',
  site_description = 'Junior Software Developer specializing in MERN/PERN stack, Google Workspace automation, and full-stack web applications.',
  languages        = array['English','Tagalog'],
  edu_school       = 'National University — Manila',
  edu_degree       = 'Bachelor of Science in Information Technology',
  edu_major        = 'Major in Mobile and Web Application',
  edu_years        = '2019 – 2024',
  edu_badge        = 'BSIT'
where id = 1;

-- Experiences
insert into experiences (slug, role, company, period, location, status, color, summary, highlights, stack, sort_order)
values
  ('top-asia',
   'Junior Application Developer',
   'Top Asia Management Solutions Incorporated',
   'April 2025 – Present',
   '219 Wilson St. Greenhills, San Juan City',
   'current', '#d1675a',
   'Building Google Workspace-powered internal tools — from HRIS to ticketing systems — that streamline operations for Top Asia Management.',
   array[
     'Developed a Ticketing System, Inventory Management, and HRIS System using Google Workspace tools',
     'Built an Employee Portal covering payslip dashboard, leave availment, and ticket submission',
     'Centralized HRIS database using Google Cloud Bucket, BigQuery, and Apps Script for scalable data pipelines',
     'Engineered a chatbot for employee inquiries — Vite + TypeScript on the frontend, Node + Express on the backend',
     'Created a simple shopping app using Appsheet and Google Sheets for lightweight commerce workflows',
     'Automated business processes across the organization using Appsheet, Apps Script, and Google Cloud Console'
   ],
   array['Google Workspace','Appsheet','Apps Script','BigQuery','Vite','TypeScript','Node.js','Express','Google Cloud'],
   0),

  ('3b-tech',
   'Junior Software Developer',
   '3B Technologies Solutions Incorporated',
   'August 2024 – January 2025',
   'Unit 404 Crowne Bay Tower, Roxas Blvd, Parañaque',
   'past', '#398eb2',
   'Client-facing full-stack development using MERN and PERN stacks, shipping production software with modern frontend tooling and managed deployments.',
   array[
     'Developed client-driven software using MERN and PERN stacks tailored to specific business requirements',
     'Managed Git version control and maintained CI/CD pipelines via Render, Vercel, and GitHub',
     'Built frontend interfaces with ReactJS and TailwindCSS for polished, responsive user experiences'
   ],
   array['ReactJS','Tailwind CSS','Node.js','Express','PostgreSQL','MongoDB','Git','Render','Vercel'],
   1),

  ('hilmarcs',
   'Technical Support Intern',
   'Hilmarcs Construction Corporation',
   'January 2024 – August 2024',
   '1835 E Rodriguez Sr. Ave, Cubao, Quezon City',
   'past', '#96312e',
   'Hands-on technical support across multiple company locations — keeping hardware and software running smoothly in a construction company environment.',
   array[
     'Resolved software and hardware malfunctions across the company''s systems',
     'Deployed to various branch locations to provide thorough on-site technical assistance',
     'Performed hardware maintenance, including updates and physical upkeep'
   ],
   array['Hardware Maintenance','Software Troubleshooting','IT Support','Field Deployment'],
   2)
on conflict (slug) do update set
  role       = excluded.role,
  company    = excluded.company,
  period     = excluded.period,
  location   = excluded.location,
  status     = excluded.status,
  color      = excluded.color,
  summary    = excluded.summary,
  highlights = excluded.highlights,
  stack      = excluded.stack,
  sort_order = excluded.sort_order,
  updated_at = now();

-- Projects
insert into projects (slug, title, url, description, role, tags, color, featured, sort_order)
values
  ('waste-wise', 'Waste Wise Web', 'https://waste-wise-free.onrender.com',
   'College project donated to CEMO Marikina. A waste management web platform built for real-world civic use.',
   'Mainly contributed as frontend and devops of the project.',
   array['Frontend','DevOps','Full Stack'], '#d1675a', true, 0),

  ('lccad', 'LCCAD Holdings Website', 'https://lccadholdings.com',
   'Official website for LCCAD Holdings — a corporate web presence built for a professional audience.',
   'Mainly contributed as frontend of the project.',
   array['Frontend'], '#398eb2', false, 1),

  ('3b-website', '3B Technologies Website', 'https://threebtechincwebsite.onrender.com',
   'Official company website for 3B Technologies Solutions Incorporated.',
   'Mainly contributed as frontend of the project.',
   array['Frontend'], '#96312e', false, 2),

  ('lucky-break', 'Lucky Break Website', 'https://lucky-break.onrender.com',
   'Billiards gambling platform for Lucky Taya group of companies.',
   'Mainly contributed as devops and frontend with minor backend.',
   array['Frontend','DevOps','Backend'], '#ffbf6b', true, 3),

  ('top-asia-talent', 'Top Asia Talent Portal', 'https://www.topasiamanagement.com/TalentPortal',
   'Official talent portal for Top Asia Management Solutions — a full-stack internal HR and recruitment system.',
   'Mainly contributed as the full stack developer of the project.',
   array['Frontend','Full Stack'], '#d1675a', true, 4)
on conflict (slug) do update set
  title       = excluded.title,
  url         = excluded.url,
  description = excluded.description,
  role        = excluded.role,
  tags        = excluded.tags,
  color       = excluded.color,
  featured    = excluded.featured,
  sort_order  = excluded.sort_order,
  updated_at  = now();

-- Sidebar skills
delete from sidebar_skills;
insert into sidebar_skills (label, category, sort_order) values
  ('PERN & MERN Stack',    'fullstack', 0),
  ('ReactJS',              'frontend',  1),
  ('Tailwind CSS',         'frontend',  2),
  ('Vite',                 'frontend',  3),
  ('JavaScript',           'language',  4),
  ('TypeScript',           'language',  5),
  ('Restful API',          'backend',   6),
  ('Node.js / Express',    'backend',   7),
  ('Websocket',            'backend',   8),
  ('Git',                  'devops',    9),
  ('CI/CD Pipeline',       'devops',   10),
  ('Render',               'devops',   11),
  ('Vercel',               'devops',   12),
  ('Google Cloud Console', 'cloud',    13),
  ('Google Appsheet',      'cloud',    14),
  ('BigQuery',             'cloud',    15),
  ('Apps Script',          'cloud',    16);

-- Skill groups + skills
-- Frontend
with g as (
  insert into skill_groups (slug, label, color, icon, description, sort_order)
  values ('frontend', 'Frontend', '#398eb2', 'Monitor',
    'UI frameworks, styling, and build tools used to build user-facing interfaces.', 0)
  on conflict (slug) do update set
    label = excluded.label, color = excluded.color,
    description = excluded.description, sort_order = excluded.sort_order
  returning id
)
insert into skills (group_id, label, level, used_in, sort_order)
select g.id, s.label, s.level, s.used_in, s.sort_order from g,
(values
  ('ReactJS',         5, array['3B Technologies','Top Asia Portal','Personal Projects'],   0),
  ('TypeScript',      4, array['Top Asia Chatbot','Employee Portal'],                      1),
  ('JavaScript',      5, array['All Projects'],                                             2),
  ('Tailwind CSS',    5, array['3B Technologies','Top Asia Portal','Waste Wise'],          3),
  ('Vite',            4, array['Top Asia Chatbot','Internal Tools'],                       4),
  ('HTML5 / CSS3',    5, array['All Web Projects'],                                        5),
  ('Google Appsheet', 4, array['Top Asia — Shopping App','HR Workflows'],                  6)
) as s(label, level, used_in, sort_order)
on conflict do nothing;

-- Backend
with g as (
  insert into skill_groups (slug, label, color, icon, description, sort_order)
  values ('backend', 'Backend', '#d1675a', 'Server',
    'Server-side logic, APIs, and real-time communication tools.', 1)
  on conflict (slug) do update set
    label = excluded.label, color = excluded.color,
    description = excluded.description, sort_order = excluded.sort_order
  returning id
)
insert into skills (group_id, label, level, used_in, sort_order)
select g.id, s.label, s.level, s.used_in, s.sort_order from g,
(values
  ('Node.js',         4, array['3B Technologies','Top Asia Chatbot'],              0),
  ('Express.js',      4, array['3B Technologies','Top Asia Chatbot','REST APIs'],  1),
  ('REST API Design', 4, array['3B Technologies','Top Asia Portal'],               2),
  ('WebSocket',       3, array['Real-time Features','3B Technologies'],            3),
  ('Apps Script',     4, array['Top Asia — HRIS','Automation Workflows'],          4),
  ('PostgreSQL',      3, array['PERN Stack Projects'],                              5),
  ('MongoDB',         3, array['MERN Stack Projects'],                              6)
) as s(label, level, used_in, sort_order)
on conflict do nothing;

-- DevOps
with g as (
  insert into skill_groups (slug, label, color, icon, description, sort_order)
  values ('devops', 'DevOps & Deployment', '#ffbf6b', 'GitBranch',
    'Version control, deployment pipelines, and hosting platforms.', 2)
  on conflict (slug) do update set
    label = excluded.label, color = excluded.color,
    description = excluded.description, sort_order = excluded.sort_order
  returning id
)
insert into skills (group_id, label, level, used_in, sort_order)
select g.id, s.label, s.level, s.used_in, s.sort_order from g,
(values
  ('Git',             5, array['All Projects'],                        0),
  ('GitHub',          5, array['All Projects'],                        1),
  ('CI/CD Pipelines', 4, array['3B Technologies','Waste Wise'],        2),
  ('Vercel',          4, array['3B Technologies','Top Asia','Lucky Break'], 3),
  ('Render',          4, array['Waste Wise','3B Technologies','Lucky Break'], 4),
  ('GitHub Actions',  3, array['Automated Deployments'],               5)
) as s(label, level, used_in, sort_order)
on conflict do nothing;

-- Cloud
with g as (
  insert into skill_groups (slug, label, color, icon, description, sort_order)
  values ('cloud', 'Cloud & Automation', '#153d52', 'Cloud',
    'Cloud infrastructure, data platforms, and business process automation.', 3)
  on conflict (slug) do update set
    label = excluded.label, color = excluded.color,
    description = excluded.description, sort_order = excluded.sort_order
  returning id
)
insert into skills (group_id, label, level, used_in, sort_order)
select g.id, s.label, s.level, s.used_in, s.sort_order from g,
(values
  ('Google Cloud Console', 4, array['Top Asia — HRIS System','Cloud Bucket Storage'], 0),
  ('BigQuery',             3, array['Top Asia — HRIS Database'],                       1),
  ('Google Cloud Bucket',  3, array['Top Asia — Centralized HRIS'],                   2),
  ('Google Appsheet',      4, array['Top Asia — Shopping App','Inventory System'],     3),
  ('Apps Script',          4, array['Top Asia — HRIS Automation','Business Workflows'],4),
  ('Google Workspace',     5, array['Top Asia — All Internal Tools'],                  5)
) as s(label, level, used_in, sort_order)
on conflict do nothing;

-- Tools
with g as (
  insert into skill_groups (slug, label, color, icon, description, sort_order)
  values ('tools', 'Tools & Platforms', '#96312e', 'Wrench',
    'Development tools, productivity software, and support platforms.', 4)
  on conflict (slug) do update set
    label = excluded.label, color = excluded.color,
    description = excluded.description, sort_order = excluded.sort_order
  returning id
)
insert into skills (group_id, label, level, used_in, sort_order)
select g.id, s.label, s.level, s.used_in, s.sort_order from g,
(values
  ('VS Code',              5, array['All Development Work'],           0),
  ('Postman',              4, array['API Testing — All Projects'],     1),
  ('Figma',                3, array['UI Design References'],           2),
  ('Google Workspace',     5, array['Top Asia — Internal Systems'],   3),
  ('Hardware Maintenance', 4, array['Hilmarcs — Field IT Support'],    4),
  ('IT Troubleshooting',   4, array['Hilmarcs — Multi-branch Support'],5)
) as s(label, level, used_in, sort_order)
on conflict do nothing;
