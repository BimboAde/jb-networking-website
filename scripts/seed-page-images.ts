#!/usr/bin/env tsx
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { images } from '../src/data/images';
import { videos } from '../src/data/images';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!SUPABASE_URL || !SERVICE_ROLE) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

type Row = {
  page_slug: string;
  image_location: string;
  image_url: string;
  image_alt: string;
  label: string;
  src?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
};

function rows(): Row[] {
  const r: Row[] = [];
  const push = (page_slug: string, image_location: string, img?: { src?: string; alt?: string } | null) => {
    if (!img?.src) return;
    const label = `${page_slug}:${image_location}`;
    r.push({
      page_slug,
      image_location,
      image_url: img.src,
      image_alt: img.alt || '',
      label,
      src: img.src,
      alt: img.alt || '',
    });
  };

  // 1) homepage
  push('home', 'hero', images.homePageImage);
  if (videos.videoUrl) {
    r.push({
      page_slug: 'home',
      image_location: 'video',
      image_url: videos.videoUrl,
      image_alt: 'Homepage video',
      label: 'home:video',
      src: videos.videoUrl,
      alt: 'Homepage video',
    });
  }

  // 2) tax-client-intake
  push('tax-client-intake', 'hero', images.solutions?.taxServices?.heroImage);
  push('tax-client-intake', 'fullwidth', images.solutions?.taxServices?.fullWidthBannerImage || images.consultationPageImage);

  // 3) financial-insurance-planning
  push('financial-insurance-planning', 'hero', images.solutions?.financialPlanning?.heroImage);
  push('financial-insurance-planning', 'fullwidth', images.solutions?.financialPlanning?.fullWidthBannerImage);

  // 4) credit-debt-resolution
  push('credit-debt-resolution', 'hero', images.solutions?.creditDebt?.heroImage);
  push('credit-debt-resolution', 'fullwidth', images.solutions?.creditDebt?.fullWidthBannerImage);

  // 5) real-estate-mortgage
  push('real-estate-mortgage', 'hero', images.solutions?.realEstate?.heroImage);
  push('real-estate-mortgage', 'fullwidth', images.solutions?.realEstate?.fullWidthBannerImage);

  // 6) business-accountant-services
  push('business-accountant-services', 'hero', images.solutions?.businessAccounting?.heroImage || images.homePageImage);

  // 7) corporate-services
  push('corporate-services', 'hero', images.solutions?.corporate?.heroImage || images.homePageImage);
  push('executive-services', 'hero', images.solutions?.corporate?.heroImage || images.homePageImage);

  // 8) about
  push('about', 'about-section', images.aboutPageImage1 );
  push('about', 'discount-section', images.aboutPageImage2);

  // 9) consultation
  push('consultation', 'hero', images.consultationPageImage);

  // Logo
  push('global', 'logo', images.logo);

  return r;
}

async function main() {
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, { db: { schema: 'api' } });
  const data = rows();
  if (!data.length) return;
  const { error } = await supabase.from('images').upsert(data);
  if (error) {
    console.error(error);
    process.exit(1);
  }
  console.log(`Seeded ${data.length} images`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


