export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'node:crypto';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({} as Record<string, unknown>));
    const timestamp = Math.floor(Date.now() / 1000);
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const folder = (body?.folder as string) || process.env.CLOUDINARY_UPLOAD_FOLDER || 'jbns';
    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json({ error: 'Cloudinary env not configured' }, { status: 500, headers: { 'Cache-Control': 'no-store, max-age=0' } });
    }

    // Compose params to sign. Must be sorted alphabetically by key.
    const toSignParams: Record<string, string> = {
      folder,
      source: 'uw',
      timestamp: String(timestamp),
    };
    if (typeof body?.public_id === 'string' && body.public_id) {
      toSignParams.public_id = body.public_id;
    }

    const toSign = Object.keys(toSignParams)
      .sort()
      .map((k) => `${k}=${toSignParams[k]}`)
      .join('&') + apiSecret;

    const signature = crypto.createHash('sha1').update(toSign).digest('hex');

    return NextResponse.json(
      {
        cloudName,
        apiKey,
        timestamp,
        folder,
        signature,
      },
      { headers: { 'Cache-Control': 'no-store, max-age=0' } }
    );
  } catch (e) {
    return NextResponse.json({ error: 'Signature error' }, { status: 500, headers: { 'Cache-Control': 'no-store, max-age=0' } });
  }
}



