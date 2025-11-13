#!/usr/bin/env tsx
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { COMPANY } from '../src/data/constants';
import { jotformUrls } from '../src/data/images';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!SUPABASE_URL || !SERVICE_ROLE) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

async function main() {
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, { db: { schema: 'api' } });
  const booking: Array<{ service: string; url: string }> = [
    { service: 'Personal Tax Client Intake', url: jotformUrls.individualTaxJotformUrl },
    { service: 'Business Accounting', url: jotformUrls.businessAccountingJotformUrl },
    { service: 'Real Estate', url: jotformUrls.realEstateJotformUrl },
    { service: 'Financial Planning', url: jotformUrls.financialPlanningJotformUrl },
    { service: 'Credit & Debt', url: jotformUrls.individualCreditDebtJotformUrl },
    { service: 'Executive Services', url: jotformUrls.businessExecutiveServicesJotformUrl },
    { service: 'Corporate Services', url: jotformUrls.businessCorporateServicesJotformUrl },
  ].filter((b) => !!b.url);

  const payload = {
    main_phone: COMPANY.contact.phone,
    main_email: COMPANY.contact.email,
    linkedin: COMPANY.social.linkedin || '',
    x_url: COMPANY.social.twitter || '',
    facebook: COMPANY.social.facebook || '',
    instagram: COMPANY.social.instagram || '',
    pinterest: (COMPANY as unknown as { social?: { pinterest?: string } }).social?.pinterest || '',
    weekday_hours: COMPANY.contact.hoursWeekdays,
    weekend_hours: COMPANY.contact.hoursWeekends,
    service_booking_links: booking,
  };

  const { data, error } = await supabase.from('website_info').upsert(payload).select('*').single();
  if (error) {
    console.error(error);
    process.exit(1);
  }
  console.log('Seeded website_info:', data?.id);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


