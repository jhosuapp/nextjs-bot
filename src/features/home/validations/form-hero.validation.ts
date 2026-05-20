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
    .min(1, "El campo es requerido")
    .email("Ingrese un email válido"),
  message: z
    .string()
    .min(5, "Ingrese mínimo 5 caracteres")
    .max(500, "Ingrese máximo 500 caracteres"),
});

export type FormHeroInterface = z.infer<typeof formHeroValidation>;
export { formHeroValidation };
