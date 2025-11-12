-- Team Members
create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  bio text,
  avatar_url text,
  linkedin_url text,
  email text,
  order_index int default 0,
  created_at timestamptz not null default now()
);
create index if not exists team_members_order_idx on public.team_members(order_index asc, created_at desc);

-- Images (global image registry)
create table if not exists public.images (
  id uuid primary key default gen_random_uuid(),
  label text not null unique,
  src text not null,
  alt text not null,
  width int,
  height int,
  category text,
  created_at timestamptz not null default now()
);
create index if not exists images_category_idx on public.images(category);

-- Locations (Offices)
create table if not exists public.locations (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  manager text,
  area text,
  address_line1 text,
  address_line2 text,
  phone text,
  email text,
  hours jsonb default '[]'::jsonb,
  specialties jsonb default '[]'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists locations_slug_idx on public.locations(slug);

-- App Users (maps to auth.users with roles)
create table if not exists public.app_users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid not null unique,
  email text not null unique,
  role text not null default 'user' check (role in ('user','admin')),
  created_at timestamptz not null default now()
);
create index if not exists app_users_auth_idx on public.app_users(auth_user_id);

-- Enable RLS
alter table public.team_members enable row level security;
alter table public.images enable row level security;
alter table public.locations enable row level security;
alter table public.app_users enable row level security;

-- Read-only for anon (select only)
do $$
begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='team_members' and policyname='Allow read to anon') then
    create policy "Allow read to anon" on public.team_members for select to anon using (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='images' and policyname='Allow read to anon') then
    create policy "Allow read to anon" on public.images for select to anon using (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='locations' and policyname='Allow read to anon') then
    create policy "Allow read to anon" on public.locations for select to anon using (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='app_users' and policyname='Allow self read') then
    create policy "Allow self read" on public.app_users for select to anon using (true);
  end if;
end
$$;

-- Optional: prevent anon insert/update/delete (implicit deny with RLS, added for clarity)
do $$
begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='team_members' and policyname='Deny write to anon') then
    create policy "Deny write to anon" on public.team_members for all to anon using (false) with check (false);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='images' and policyname='Deny write to anon') then
    create policy "Deny write to anon" on public.images for all to anon using (false) with check (false);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='locations' and policyname='Deny write to anon') then
    create policy "Deny write to anon" on public.locations for all to anon using (false) with check (false);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='app_users' and policyname='Deny write to anon') then
    create policy "Deny write to anon" on public.app_users for all to anon using (false) with check (false);
  end if;
end
$$;

-- API schema and updatable views to match PostgREST exposed schema
create schema if not exists api;

-- Views with security_invoker to respect base table RLS
create or replace view api.team_members as select * from public.team_members;
alter view api.team_members set (security_invoker = on);

create or replace view api.images as select * from public.images;
alter view api.images set (security_invoker = on);

create or replace view api.locations as select * from public.locations;
alter view api.locations set (security_invoker = on);

create or replace view api.app_users as select * from public.app_users;
alter view api.app_users set (security_invoker = on);

-- Testimonials
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  text text not null,
  avatar_url text,
  order_index int default 0,
  created_at timestamptz not null default now()
);
create index if not exists testimonials_order_idx on public.testimonials(order_index asc, created_at desc);

alter table public.testimonials enable row level security;
do $$
begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='testimonials' and policyname='Allow read to anon') then
    create policy "Allow read to anon" on public.testimonials for select to anon using (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='testimonials' and policyname='Deny write to anon') then
    create policy "Deny write to anon" on public.testimonials for all to anon using (false) with check (false);
  end if;
end
$$;

create or replace view api.testimonials as select * from public.testimonials;
alter view api.testimonials set (security_invoker = on);

-- Grants for API schema (PostgREST)
do $$
begin
  execute 'grant usage on schema api to anon, authenticated, service_role';
  execute 'grant select on all tables in schema api to anon, authenticated';
  execute 'grant all privileges on all tables in schema api to service_role';
  -- Future objects default privileges
  execute 'alter default privileges in schema api grant select on tables to anon, authenticated';
  execute 'alter default privileges in schema api grant all on tables to service_role';
end
$$;


