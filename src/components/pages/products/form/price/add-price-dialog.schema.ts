import { z } from 'zod';

export const FormSchema = z.object({
  supermarketId: z.string({
    required_error: 'Veuillez sélectionner un supermarché',
  }),
  price: z.coerce
    .number()
    .min(0, 'Le prix doit être supérieur à 0')
    .max(1000000, 'Le prix semble trop élevé'),
});

export type FormSchemaType = z.infer<typeof FormSchema>;
