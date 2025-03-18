import { z } from 'zod';

export const FormSchema = z.object({
  name: z.string().min(2, {
    message: 'Nom du supermarché doit contenir au moins 2 caractères.',
  }),
  address: z.string().min(2, {
    message: 'Adresse doit contenir au moins 2 caractères.',
  }),
});

export type FormSchemaType = z.infer<typeof FormSchema>;
