// Renders preview HTMLs from the email templates with sample data.
// Run with: node scripts/render-email-previews.mjs
// Outputs to: email-previews/

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

// We can't directly import TS modules from Node, so we re-create the calls
// via a tiny in-memory transpile using TS compiler API. Simpler: just shell
// out to the typescript compiler to emit JS for the two template files into
// a temp dir, then dynamic-import them.

const outDir = resolve(root, ".tmp-email-templates");
mkdirSync(outDir, { recursive: true });

execSync(
  `npx tsc --module nodenext --moduleResolution nodenext --target es2022 --outDir ${outDir} --skipLibCheck src/shared/emails/contact-user-confirmation.template.ts src/shared/emails/contact-admin-notification.template.ts`,
  { cwd: root, stdio: "inherit" },
);

const userMod = await import(
  resolve(outDir, "contact-user-confirmation.template.js")
);
const adminMod = await import(
  resolve(outDir, "contact-admin-notification.template.js")
);

const userOut = userMod.buildUserConfirmationEmail({ name: "Juan Pérez" });

const adminOut = adminMod.buildAdminNotificationEmail({
  name: "Juan Pérez",
  company: "Acme Corp",
  email: "juan@acme.com",
  phone_number: "+57 300 1234567",
  submittedAt: new Date("2026-05-22T14:30:00-05:00"),
});

const previewsDir = resolve(root, "email-previews");
mkdirSync(previewsDir, { recursive: true });

writeFileSync(
  resolve(previewsDir, "user-confirmation.html"),
  userOut.html,
  "utf-8",
);
writeFileSync(
  resolve(previewsDir, "admin-notification.html"),
  adminOut.html,
  "utf-8",
);

console.log("✓ Wrote email-previews/user-confirmation.html");
console.log("✓ Wrote email-previews/admin-notification.html");
console.log("\nSubjects:");
console.log("  user:  ", userOut.subject);
console.log("  admin: ", adminOut.subject);
