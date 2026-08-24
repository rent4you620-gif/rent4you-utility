import { NextResponse } from 'next/server';
import { z } from 'zod';
import { notifyAdmin } from '../../lib/mail';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ApplicationSchema = z.object({
  item: z.string().min(1),
  tier: z.enum(['self', 'partner']),
  name: z.string().min(1),
  dob: z.string().min(1),
  phone: z.string().min(7),
  email: z.string().email(),
  address: z.string().min(1),
});

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = ApplicationSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid application', issues: parsed.error.flatten() }, { status: 400 });
  }

  const application = parsed.data;
  const route = application.tier === 'self' ? 'In-house soft check' : 'Financing partner';

  try {
    await notifyAdmin(`Rent-to-own application — ${application.item}`, [
      `Item: ${application.item}`,
      `Route: ${route}`,
      `Name: ${application.name}`,
      `Date of birth: ${application.dob}`,
      `Phone: ${application.phone}`,
      `Email: ${application.email}`,
      `Address: ${application.address}`,
    ]);
  } catch {
    return NextResponse.json({ error: 'Could not deliver the application' }, { status: 502 });
  }

  return NextResponse.json({ ok: true, route });
}
