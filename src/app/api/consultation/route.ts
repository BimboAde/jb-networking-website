import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const required = ['firstName', 'lastName', 'email', 'phone', 'location'];
    for (const key of required) {
      if (!body?.[key]) {
        return NextResponse.json({ error: `Missing field: ${key}` }, { status: 400 });
      }
    }

    // Persist to consultation_requests
    try {
      const supabase = createClient(
        process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        process.env.SUPABASE_SERVICE_ROLE_KEY || '',
        { db: { schema: 'api' } }
      );
      await supabase.from('consultation_requests').insert({
        first_name: body.firstName,
        last_name: body.lastName,
        email: body.email,
        phone: body.phone,
        preferred_location: body.location,
        preferred_language: body.language || null,
        services: Array.isArray(body.services) ? body.services : [],
        preferred_date: body.date || null,
        preferred_time: body.time || null,
        about: body.about || null,
        is_military: !!body.isMilitary,
        marketing_consent: !!body.marketing,
        free_consent: !!body.freeConsent,
      });
    } catch {
      // non-fatal
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const fromEmail = process.env.FROM_EMAIL || 'no-reply@example.com';

    const subject = `New Consultation Request — ${body.firstName} ${body.lastName}`;
    const html = `
      <div style="font-family: Arial, sans-serif;">
        <h2>New Consultation Request</h2>
        <p><strong>Name:</strong> ${body.firstName} ${body.lastName}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone}</p>
        <p><strong>Preferred Location:</strong> ${body.location}</p>
        <p><strong>Preferred Language:</strong> ${body.language || ''}</p>
        <p><strong>Preferred Date/Time:</strong> ${body.date || ''} ${body.time || ''}</p>
        <p><strong>Services of Interest:</strong> ${(Array.isArray(body.services) ? body.services : []).join(', ')}</p>
        <p><strong>Military:</strong> ${body.isMilitary ? 'Yes' : 'No'}</p>
        <p><strong>Marketing Consent:</strong> ${body.marketing ? 'Yes' : 'No'}</p>
        <p><strong>Free Consultation Acknowledgment:</strong> ${body.freeConsent ? 'Yes' : 'No'}</p>
        <hr />
        <p><strong>About:</strong></p>
        <p>${(body.about || '').toString().replace(/\n/g, '<br />')}</p>
      </div>
    `;

    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY missing; skipping email send');
      return NextResponse.json({ ok: true, skipped: true });
    }

    await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Consultation POST error', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}


