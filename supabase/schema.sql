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
  -- legacy columns
  label text,
  src text,
  alt text,
  width int,
  height int,
  category text,
  -- new columns
  page_slug text,
  image_location text,
  image_url text,
  image_alt text,
  created_at timestamptz not null default now()
);
create index if not exists images_category_idx on public.images(category);

-- Ensure columns exist if table was created before
alter table public.images add column if not exists page_slug text;
alter table public.images add column if not exists image_location text;
alter table public.images add column if not exists image_url text;
alter table public.images add column if not exists image_alt text;

-- Migrate legacy values into new columns if empty (best-effort; no-op if nulls)
do $$
begin
  update public.images
    set image_url = coalesce(image_url, src),
        image_alt = coalesce(image_alt, alt)
  where (src is not null and (image_url is null or image_url = ''))
     or (alt is not null and (image_alt is null or image_alt = ''));
end
$$;

create index if not exists images_page_loc_idx on public.images(page_slug, image_location);

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

-- Website Info (singleton)
create table if not exists public.website_info (
  id uuid primary key default gen_random_uuid(),
  main_phone text,
  fax text,
  main_email text,
  main_address_line1 text,
  main_address_line2 text,
  linkedin text,
  x_url text,
  facebook text,
  instagram text,
  pinterest text,
  weekday_hours text,
  weekend_hours text,
  service_booking_links jsonb default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists website_info_updated_idx on public.website_info(updated_at desc);

-- Add address columns if they don't exist (for existing installations)
alter table public.website_info add column if not exists main_address_line1 text;
alter table public.website_info add column if not exists main_address_line2 text;

alter table public.website_info enable row level security;
do $$
begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='website_info' and policyname='Allow read to anon') then
    create policy "Allow read to anon" on public.website_info for select to anon using (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='website_info' and policyname='Deny write to anon') then
    create policy "Deny write to anon" on public.website_info for all to anon using (false) with check (false);
  end if;
end
$$;

-- API view
create or replace view api.website_info as select * from public.website_info;
alter view api.website_info set (security_invoker = on);

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

-- Consultation Requests
create table if not exists public.consultation_requests (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  preferred_location text,
  preferred_language text,
  services jsonb default '[]'::jsonb,
  preferred_date text,
  preferred_time text,
  about text,
  is_military boolean default false,
  marketing_consent boolean default false,
  free_consent boolean default false,
  created_at timestamptz not null default now()
);
create index if not exists consultation_requests_created_idx on public.consultation_requests(created_at desc);

alter table public.consultation_requests enable row level security;
do $$
begin
  -- Allow public inserts for form submissions
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='consultation_requests' and policyname='Allow insert to anon') then
    create policy "Allow insert to anon" on public.consultation_requests for insert to anon with check (true);
  end if;
  -- Disallow reads/updates/deletes to anon by default (no policy)
end
$$;

create or replace view api.consultation_requests as select * from public.consultation_requests;
alter view api.consultation_requests set (security_invoker = on);

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


