'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { FormSchema, FormSchemaType } from './add-price-dialog.schema';

import { addPriceToProduct } from '@/app/actions/products';
import { Product } from '@/types';

type AddPriceDialogProps = {
  onClose: () => void;
  product: Product;
};

export const useAddPriceDialog = ({
  onClose,
  product,
}: AddPriceDialogProps) => {
  const { data: session } = useSession();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      supermarketId: '',
      price: 0,
    },
  });

  const handleSubmit = async (data: FormSchemaType) => {
    try {
      if (!session?.user) {
        throw new Error('User not found');
      }

      await addPriceToProduct({
        productId: product.id,
        price: data.price,
        supermarketId: data.supermarketId,
      });
      toast.success('Prix ajouté avec succès');
      form.reset();
      onClose();
    } catch (error) {
      console.error("Erreur lors de l'ajout du prix:", error);
      toast.error("Erreur lors de l'ajout du prix");
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return { form, handleSubmit, handleClose };
};
