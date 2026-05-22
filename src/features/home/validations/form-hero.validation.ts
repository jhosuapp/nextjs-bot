import { z } from "zod";

const formHeroValidation = z.object({
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
    .min(9, "Ingrese mínimo 9 caracteres")
    .max(9, "Ingrese máximo 9 caracteres")
    .regex(/^[+\d\s\-().]+$/, "Ingrese un número válido"),
  phone_extension: z
    .string()
    .max(3, "Ingrese máximo 10 caracteres")
    .regex(/^\d*$/, "Solo se permiten dígitos")
    .optional(),
});

export type FormHeroInterface = z.infer<typeof formHeroValidation>;
export { formHeroValidation };
