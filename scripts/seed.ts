#!/usr/bin/env tsx
import 'dotenv/config';
import path from 'node:path';
import { readFile, readdir } from 'node:fs/promises';
import { createClient } from '@supabase/supabase-js';

type LeadershipMember = {
  name?: string;
  role?: string;
  bio?: string;
  avatar?: string;
};
type Leadership = { members?: LeadershipMember[] };
type AboutPage = { leadership?: Leadership };
type LocationsContentItem = {
  name?: string;
  area?: string;
  address?: string[] | null;
  phone?: string | null;
  email?: string | null;
  hours?: string[] | null;
  specialties?: string[] | null;
};
type Locations = { items?: LocationsContentItem[] };
type LocationsPage = { offices?: Locations };
type EnJson = { about_page?: AboutPage; locations_page?: LocationsPage };

type TeamMemberInsert = {
  name: string;
  role: string | null;
  bio: string | null;
  avatar_url: string | null;
  order_index: number;
  email: string | null;
  linkedin_url: string | null;
};

type LocationInsert = {
  slug: string;
  name: string;
  manager: string | null;
  area: string | null;
  address_line1: string | null;
  address_line2: string | null;
  phone: string | null;
  email: string | null;
  hours: string[];
  specialties: string[];
};

type ImageInsert = {
  label: string;
  src: string;
  alt: string;
  category?: string;
};

const ROOT = path.resolve(__dirname, '..');
const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  // eslint-disable-next-line no-console
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  db: { schema: 'api' },
});

function titleCase(input: string) {
  return input
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

async function seedTeamMembers(en: EnJson) {
  const base = en?.about_page?.leadership;
  const members: Array<TeamMemberInsert> = [];
  if (!base?.members || !Array.isArray(base.members)) return;
  const arr = base.members as LeadershipMember[];
  for (let i = 0; i < arr.length; i++) {
    const m = arr[i];
    if (!m?.name) continue;
    members.push({
      name: m.name,
      role: m.role || null,
      bio: m.bio || null,
      avatar_url: m.avatar || null,
      order_index: i,
      email: null,
      linkedin_url: null,
    });
  }
  // Replace all to avoid duplicates
  await supabase.from('team_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (members.length) {
    const { error } = await supabase.from('team_members').insert(members);
    if (error) throw error;
  }
}

async function seedLocations(en: EnJson) {
  const base = en?.locations_page?.offices;
  const items = Array.isArray(base?.items) ? base.items : [];
  const mapSlug = (name: string, idx: number) => {
    const low = name.toLowerCase();
    if (low.includes('georgia')) return 'georgia';
    if (low.includes('alabama')) return 'alabama';
    if (low.includes('texas')) return 'texas';
    return ['georgia', 'alabama', 'texas'][idx] || `office-${idx + 1}`;
  };
  const records: Array<LocationInsert> = items.map((it: LocationsContentItem, i: number) => ({
    slug: mapSlug(it.name || '', i),
    name: it.name || `Office ${i + 1}`,
    manager: (it.area || '').replace(/^.*?:\s*/i, '') || null,
    area: it.area || null,
    address_line1: Array.isArray(it.address) ? it.address[0] : null,
    address_line2: Array.isArray(it.address) ? it.address[1] : null,
    phone: it.phone || null,
    email: it.email || null,
    hours: Array.isArray(it.hours) ? it.hours : [],
    specialties: Array.isArray(it.specialties) ? it.specialties : [],
  }));
  await supabase.from('locations').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (records.length) {
    const { error } = await supabase.from('locations').insert(records);
    if (error) throw error;
  }
}

async function seedImages(en: EnJson) {
  const imagesModule = await import(path.join(ROOT, 'src', 'data', 'images.tsx')).catch(() => null);
  const imagesConst = imagesModule?.images as Record<string, { src?: string; alt?: string }>;
  const records: Array<ImageInsert> = [];

  if (imagesConst && typeof imagesConst === 'object') {
    for (const [label, val] of Object.entries(imagesConst)) {
      if (val && typeof val === 'object' && val.src && val.alt) {
        records.push({
          label,
          src: val.src,
          alt: val.alt,
          category: 'app',
        });
      }
    }
  }

  // Team avatars from en.json
  const team = en?.about_page?.leadership?.members;
  if (Array.isArray(team)) {
    for (const m of team) {
      if (m?.avatar && m?.name) {
        records.push({
          label: `team:${m.name}`,
          src: m.avatar,
          alt: m.name,
          category: 'team',
        });
      }
    }
  }

  // Public folder assets
  const publicDir = path.join(ROOT, 'public');
  const files = await readdir(publicDir);
  for (const file of files) {
    if (!/\.(png|jpe?g|webp|svg|gif)$/i.test(file)) continue;
    const basename = file.replace(/\.(png|jpe?g|webp|svg|gif)$/i, '');
    records.push({
      label: `public:${basename}`,
      src: `/${file}`,
      alt: titleCase(basename),
      category: 'public',
    });
  }

  // Upsert by label
  if (records.length) {
    const { error } = await supabase.from('images').upsert(records, { onConflict: 'label' });
    if (error) throw error;
  }
}

async function main() {
  const enPath = path.join(ROOT, 'src', 'messages', 'en.json');
  const en = JSON.parse(await readFile(enPath, 'utf-8')) as EnJson;
  await seedTeamMembers(en);
  await seedLocations(en);
  await seedImages(en);
  // eslint-disable-next-line no-console
  console.log('Seed completed.');
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});


