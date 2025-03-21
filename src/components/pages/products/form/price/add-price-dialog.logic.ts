'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { FormSchema, FormSchemaType } from './add-price-dialog.schema';

import { addPriceToProduct } from '@/app/actions/products';
import { useProductStore } from '@/lib/store/product.store';
import { Supermarket } from '@/types';

type AddPriceDialogProps = {
  supermarkets: Supermarket[];
};

export const useAddPriceDialog = ({ supermarkets }: AddPriceDialogProps) => {
  const { data: session } = useSession();
  const {
    selectedProduct,
    isAddPriceDialogOpen,
    setIsAddPriceDialogOpen,
    setSelectedProduct,
  } = useProductStore();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      supermarketId: '',
      price: 0,
    },
  });

  useEffect(() => {
    if (supermarkets.length > 0) {
      form.reset({
        supermarketId: supermarkets[0].id,
      });
    }
  }, [supermarkets, form]);

  const handleSubmit = async (data: FormSchemaType) => {
    try {
      if (!session?.user) {
        throw new Error('User not found');
      }

      if (!selectedProduct) {
        throw new Error('Product not found');
      }

      await addPriceToProduct({
        productId: selectedProduct.id,
        price: data.price,
        supermarketId: data.supermarketId,
        userId: session.user.id as string,
      });
      toast.success('Prix ajouté avec succès');
      handleClose(false);
    } catch (error) {
      console.error("Erreur lors de l'ajout du prix:", error);
      toast.error("Erreur lors de l'ajout du prix");
    }
  };

  const handleClose = (open: boolean) => {
    form.reset();
    setIsAddPriceDialogOpen(open);
    setSelectedProduct(null);
  };

  return {
    form,
    handleSubmit,
    handleClose,
    isAddPriceDialogOpen,
    selectedProduct,
  };
};
