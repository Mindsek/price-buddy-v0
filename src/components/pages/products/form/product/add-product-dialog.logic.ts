'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  ProductSchema,
  ProductSchemaType,
  categories,
} from './add-product-dialog.schema';

import { createProduct } from '@/app/actions/products';

type AddProductDialogProps = {
  onClose: () => void;
};

export const useAddProductDialog = ({ onClose }: AddProductDialogProps) => {
  const { data: session } = useSession();
  const form = useForm<ProductSchemaType>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: '',
      category: categories[0],
    },
  });

  const onSubmit = async (data: ProductSchemaType) => {
    try {
      if (!session?.user) {
        throw new Error('User not found');
      }

      await createProduct({
        name: data.name,
        category: data.category,
        userId: session.user.id as string,
      });
      toast.success(`Produit ${data.name} ajouté avec succès`);
      form.reset();
      onClose();
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error(`Erreur lors de la création du produit ${data.name}`);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return { form, onSubmit, handleClose };
};
