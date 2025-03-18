'use client';

import { z } from 'zod';

export const categories = [
  'Produits laitiers',
  'Boulangerie',
  'Fruits et légumes',
  'Viandes',
  'Poissons',
  'Épicerie',
  'Boissons',
  'Hygiène',
  'Entretien',
  'Autre',
] as const;

export type Category = (typeof categories)[number];

export const ProductSchema = z.object({
  name: z.string().min(2, {
    message: 'Le nom doit contenir au moins 2 caractères.',
  }),
  category: z.enum(categories, {
    required_error: 'Veuillez sélectionner une catégorie',
  }),
});

export type ProductSchemaType = z.infer<typeof ProductSchema>;
