import { z } from 'zod';

import { Supermarket } from '@/types';

export const EditSupermarketSchema = (supermarket: Supermarket) =>
  z
    .object({
      name: z.string().min(2, {
        message: 'Nom du supermarché doit contenir au moins 2 caractères.',
      }),
      address: z.string().min(2, {
        message: 'Adresse doit contenir au moins 2 caractères.',
      }),
    })
    .refine(
      (data) => {
        return (
          data.name !== supermarket.name || data.address !== supermarket.address
        );
      },
      {
        message: 'Au moins un champ doit être modifié.',
        path: ['name'],
      }
    );

export const useEditSupermarketSchema = (supermarket: Supermarket) => {
  return EditSupermarketSchema(supermarket);
};

export type EditSupermarketSchemaType = z.infer<
  ReturnType<typeof useEditSupermarketSchema>
>;
