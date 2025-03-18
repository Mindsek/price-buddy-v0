'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { FormSchema, FormSchemaType } from './add-price-dialog.schema';

import { Product, Supermarket } from '@/types';

type AddPriceDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  supermarkets: Supermarket[];
};

export const useAddPriceDialog = ({
  isOpen,
  onClose,
  product,
  supermarkets,
}: AddPriceDialogProps) => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      supermarketId: '',
      price: 0,
    },
  });

  const handleSubmit = async (data: FormSchemaType) => {
    try {
      console.log(data);
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
