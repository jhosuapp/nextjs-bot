import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/src/shared/libs/prisma";
import { withRateLimit } from "@/src/shared/libs/rate-limit";
import { SITE_URL } from "@/src/config/site";

type ContactResponse = { success: true } | { error: string };

const ALLOWED_ORIGINS =
  process.env.NODE_ENV === "production"
    ? [SITE_URL]
    : ["http://localhost:3000", SITE_URL];

function setCorsHeaders(req: NextApiRequest, res: NextApiResponse) {
  const origin = req.headers.origin ?? "";
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Vary", "Origin");
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContactResponse>,
) {
  setCorsHeaders(req, res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(405).json({ error: "method_not_allowed" });
  }

  const { name, company, email, phone_number } = req.body ?? {};

  if (
    typeof name !== "string" ||
    typeof company !== "string" ||
    typeof email !== "string" ||
    typeof phone_number !== "string"
  ) {
    return res.status(400).json({ error: "invalid_field_types" });
  }

  const trimmed = {
    name: name.trim(),
    company: company.trim(),
    email: email.trim(),
    phone_number: phone_number.trim(),
  };

  if (!trimmed.name || !trimmed.company || !trimmed.email || !trimmed.phone_number) {
    return res.status(400).json({ error: "missing_required_fields" });
  }

  try {
    await prisma.contactForm.create({ data: trimmed });
    return res.status(201).json({ success: true });
  } catch {
    return res.status(500).json({ error: "internal_server_error" });
  }
}

export default withRateLimit(handler);
