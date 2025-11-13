#!/usr/bin/env tsx
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

type TestimonialSeed = {
  name: string;
  role: string;
  text: string;
  avatar_url: string;
  order_index: number;
};

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!SUPABASE_URL || !SERVICE_ROLE) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

async function main() {
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, { db: { schema: 'api' } });

  const defaults: TestimonialSeed[] = [
    {
      name: 'Maria Gonzalez',
      role: 'Small Business Owner',
      text:
        'JBNS helped streamline my accounting and saved me hours every week. Their team is responsive and professional.',
      avatar_url: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg',
      order_index: 0,
    },
    {
      name: 'James Carter',
      role: 'Entrepreneur',
      text:
        'Excellent guidance on tax planning and business compliance. Highly recommend JBNS to any founder.',
      avatar_url: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
      order_index: 1,
    },
    {
      name: 'Sarah Lee',
      role: 'Real Estate Agent',
      text:
        'The attention to detail and clarity in explaining complex topics has been outstanding.',
      avatar_url: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg',
      order_index: 2,
    },
    {
      name: 'Michael Thompson',
      role: 'Consultant',
      text:
        'Great partner for both strategy and execution. They made my quarterly filings painless.',
      avatar_url: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg',
      order_index: 3,
    },
    {
      name: 'Lisa Park',
      role: 'Freelancer',
      text:
        'Their credit and debt advisory gave me a clear plan and real results. Thank you, JBNS!',
      avatar_url: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg',
      order_index: 4,
    },
    {
      name: 'Robert Davis',
      role: 'Restaurant Owner',
      text:
        'From bookkeeping to corporate filings, JBNS has been rock solid for our business.',
      avatar_url: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg',
      order_index: 5,
    },
  ];

  const head = await supabase.from('testimonials').select('id', { count: 'exact', head: true });
  if ((head.count || 0) > 0) {
    console.log('Testimonials table already has rows; skipping insert.');
    process.exit(0);
  }

  const { error } = await supabase.from('testimonials').insert(defaults);
  if (error) {
    console.error('Insert failed:', error);
    process.exit(1);
  }
  console.log(`Inserted ${defaults.length} testimonials.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


