import { NextResponse } from 'next/server';
import { z } from 'zod';
import { notifyAdmin } from '../../lib/mailer';
import { approvalThreshold, findItem, tierFor } from '../../lib/rto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ApplicationSchema = z.object({
  item: z.string().trim().min(1).max(120),
  itemId: z.string().trim().min(1).max(60).optional(),
  tier: z.enum(['self', 'partner']),
  name: z.string().trim().min(1).max(120),
  dob: z.string().trim().min(4).max(40),
  phone: z.string().trim().min(7).max(40),
  email: z.string().trim().email().max(200),
  address: z.string().trim().min(5).max(300),
});

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = ApplicationSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Please check the application and try again.' },
      { status: 400 },
    );
  }

  const application = parsed.data;

  // The client sends a tier, but the server decides. Never trust the browser
  // to say which applications skip partner financing.
  const known = application.itemId ? findItem(application.itemId) : undefined;
  const tier = known ? tierFor(known.cost, approvalThreshold()) : application.tier;
  const routed = tier === 'partner' ? 'FINANCING PARTNER' : 'IN-HOUSE APPROVAL';

  const text = [
    `New rent-to-own application — ${routed}`,
    '',
    `Item:     ${application.item}`,
    `Name:     ${application.name}`,
    `DOB:      ${application.dob}`,
    `Phone:    ${application.phone}`,
    `Email:    ${application.email}`,
    `Address:  ${application.address}`,
    '',
    tier === 'partner'
      ? 'Next step: forward to the financing partner for a soft check.'
      : 'Next step: run the in-house soft check and reply with a decision.',
  ].join('\n');

  try {
    const result = await notifyAdmin({
      subject: `RTO application — ${application.item} (${routed})`,
      text,
      replyTo: application.email,
    });

    if (!result.delivered) {
      console.warn(`[application] not emailed (${result.reason}):\n${text}`);
    }

    return NextResponse.json({ ok: true, tier, delivered: result.delivered });
  } catch (cause) {
    console.error('[application] delivery failed', cause);
    console.warn(`[application] undelivered submission:\n${text}`);
    return NextResponse.json(
      { ok: false, error: 'We could not submit that just now.' },
      { status: 502 },
    );
  }
}
