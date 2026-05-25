import { z } from "zod";

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

const contactsQueryValidation = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(30),
  search: z
    .string()
    .trim()
    .max(120)
    .optional()
    .transform((v) => (v ? v : undefined)),
  from: z
    .string()
    .regex(DATE_REGEX, "Invalid date format")
    .optional()
    .transform((v) => (v ? v : undefined)),
  to: z
    .string()
    .regex(DATE_REGEX, "Invalid date format")
    .optional()
    .transform((v) => (v ? v : undefined)),
});

type ContactsQueryInput = z.input<typeof contactsQueryValidation>;
type ContactsQueryParsed = z.output<typeof contactsQueryValidation>;

type ContactRecord = {
  id: number;
  name: string;
  company: string;
  email: string;
  phone_number: string;
  createdAt: string;
};

type ContactsResponse = {
  items: ContactRecord[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export { contactsQueryValidation };
export type {
  ContactsQueryInput,
  ContactsQueryParsed,
  ContactRecord,
  ContactsResponse,
};
