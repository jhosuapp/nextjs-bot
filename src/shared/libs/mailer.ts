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

  // Brevo's southamerica-east regional nodes present certs whose altnames only
  // include *.sendinblue.com (legacy, pre-rebrand). Forcing servername to the
  // legacy hostname makes TLS validation pass on every regional node Brevo
  // routes you to, regardless of whether the env has the .brevo.com or
  // .sendinblue.com hostname.
  const isBrevo =
    host.endsWith("brevo.com") || host.endsWith("sendinblue.com");

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    ...(isBrevo && {
      tls: { servername: "smtp-relay.sendinblue.com" },
    }),
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
  const fromEmail = process.env.MAIL_FROM_EMAIL ?? "no-reply@150porciento.ai";
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
