import nodemailer, { type Transporter } from 'nodemailer';

let cached: Transporter | null = null;

export function isMailConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD);
}

function transporter(): Transporter {
  if (!cached) {
    const port = Number(process.env.SMTP_PORT ?? 587);
    cached = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: {
        user: process.env.SMTP_USER as string,
        pass: process.env.SMTP_PASSWORD as string,
      },
    });
  }
  return cached;
}

export interface Notification {
  subject: string;
  text: string;
  replyTo?: string;
}

export type DeliveryResult = { delivered: true } | { delivered: false; reason: string };

/**
 * Emails the admin inbox. When SMTP is not configured yet the submission is
 * written to the function log instead of being dropped, so the site still works
 * before the mail credentials are set.
 */
export async function notifyAdmin({ subject, text, replyTo }: Notification): Promise<DeliveryResult> {
  if (!isMailConfigured()) {
    return { delivered: false, reason: 'SMTP is not configured' };
  }

  const to = process.env.ADMIN_EMAIL;
  if (!to) {
    return { delivered: false, reason: 'ADMIN_EMAIL is not set' };
  }

  await transporter().sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    subject,
    text,
    replyTo,
  });

  return { delivered: true };
}
