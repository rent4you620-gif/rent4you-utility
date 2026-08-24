import nodemailer from 'nodemailer';

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM, ADMIN_EMAIL } = process.env;

function isConfigured() {
  return Boolean(SMTP_HOST && SMTP_USER && SMTP_PASSWORD && ADMIN_EMAIL);
}

/**
 * Emails the submission to the admin inbox when SMTP is configured.
 * Without SMTP credentials the submission is logged instead, so local and
 * preview deploys keep working without secrets.
 */
export async function notifyAdmin(subject: string, lines: string[]) {
  const body = lines.join('\n');

  if (!isConfigured()) {
    console.info(`[rent4you] ${subject}\n${body}`);
    return;
  }

  const port = Number(SMTP_PORT ?? 587);
  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER as string, pass: SMTP_PASSWORD as string },
  });

  await transport.sendMail({
    from: SMTP_FROM ?? SMTP_USER,
    to: ADMIN_EMAIL,
    subject,
    text: body,
  });
}
