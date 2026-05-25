import { z } from "zod";

const contactFormValidation = z.object({
  name: z
    .string()
    .min(2, "Ingrese mínimo 2 caracteres")
    .max(100, "Ingrese máximo 100 caracteres"),
  company: z
    .string()
    .min(2, "Ingrese mínimo 2 caracteres")
    .max(100, "Ingrese máximo 100 caracteres"),
  email: z
    .string()
    .min(2, "Ingrese mínimo 2 caracteres")
    .email("Ingrese un email válido")
    .max(100, "Ingrese máximo 100 caracteres"),
  phone_number: z
    .string()
    .min(10, "Ingrese mínimo 10 caracteres")
    .max(10, "Ingrese máximo 10 caracteres")
    .regex(/^[+\d\s\-().]+$/, "Ingrese un número válido"),
  phone_extension: z
    .string()
    .max(3, "Error")
    .regex(/^\d*$/, "Invalido")
    .optional(),
});

export type ContactFormInterface = z.infer<typeof contactFormValidation>;
export { contactFormValidation };
