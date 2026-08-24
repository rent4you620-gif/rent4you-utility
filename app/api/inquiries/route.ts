import { NextResponse } from 'next/server';
import { z } from 'zod';
import { notifyAdmin } from '../../lib/mailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const InquirySchema = z.object({
  name: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(7).max(40),
  email: z.string().trim().email().max(200),
  item: z.string().trim().min(1).max(120),
  term: z.string().trim().min(1).max(60),
  message: z.string().trim().max(2000).optional().default(''),
});

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = InquirySchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Please check the form and try again.' },
      { status: 400 },
    );
  }

  const inquiry = parsed.data;
  const text = [
    'New rental inquiry',
    '',
    `Name:    ${inquiry.name}`,
    `Phone:   ${inquiry.phone}`,
    `Email:   ${inquiry.email}`,
    `Item:    ${inquiry.item}`,
    `Term:    ${inquiry.term}`,
    '',
    inquiry.message ? `Message:\n${inquiry.message}` : 'No message left.',
  ].join('\n');

  try {
    const result = await notifyAdmin({
      subject: `Rental inquiry — ${inquiry.item} (${inquiry.term})`,
      text,
      replyTo: inquiry.email,
    });

    if (!result.delivered) {
      // Email is not wired up yet — keep the lead in the function log rather
      // than losing it, and still let the customer through.
      console.warn(`[inquiry] not emailed (${result.reason}):\n${text}`);
    }

    return NextResponse.json({ ok: true, delivered: result.delivered });
  } catch (cause) {
    console.error('[inquiry] delivery failed', cause);
    console.warn(`[inquiry] undelivered submission:\n${text}`);
    return NextResponse.json(
      { ok: false, error: 'We could not send that just now.' },
      { status: 502 },
    );
  }
}
