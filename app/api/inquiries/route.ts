import { NextResponse } from 'next/server';
import { z } from 'zod';
import { notifyAdmin } from '../../lib/mail';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const InquirySchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(7),
  email: z.string().email(),
  item: z.string().min(1),
  term: z.string().min(1),
  message: z.string().optional(),
});

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = InquirySchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid inquiry', issues: parsed.error.flatten() }, { status: 400 });
  }

  const inquiry = parsed.data;
  try {
    await notifyAdmin(`Rental inquiry — ${inquiry.item} (${inquiry.term})`, [
      `Name: ${inquiry.name}`,
      `Phone: ${inquiry.phone}`,
      `Email: ${inquiry.email}`,
      `Item: ${inquiry.item}`,
      `Term: ${inquiry.term}`,
      `Message: ${inquiry.message ?? '—'}`,
    ]);
  } catch {
    return NextResponse.json({ error: 'Could not deliver the inquiry' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
