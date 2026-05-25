import nodemailer, { type Transporter } from "nodemailer";

const globalForMailer = globalThis as unknown as {
  mailer: Transporter | undefined;
};

export function getMailer(): Transporter {
  if (globalForMailer.mailer) return globalForMailer.mailer;

  const host = process.env.BREVO_SMTP_HOST;
  const port = Number(process.env.BREVO_SMTP_PORT ?? 587);
  const user = process.env.BREVO_SMTP_USER;
  const pass = process.env.BREVO_SMTP_PASSWORD;

  if (!host || !user || !pass) {
    throw new Error(
      "Missing SMTP env vars (BREVO_SMTP_HOST/USER/PASSWORD required)",
    );
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  if (process.env.NODE_ENV !== "production") {
    globalForMailer.mailer = transporter;
  }

  return transporter;
}

type SendMailArgs = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

export async function sendMail({
  to,
  subject,
  html,
  text,
  replyTo,
}: SendMailArgs) {
  const fromEmail = process.env.MAIL_FROM_EMAIL ?? "no-reply@150porciento.com";
  const fromName = process.env.MAIL_FROM_NAME ?? "150%";

  return getMailer().sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to,
    subject,
    html,
    text,
    ...(replyTo ? { replyTo } : {}),
  });
}
