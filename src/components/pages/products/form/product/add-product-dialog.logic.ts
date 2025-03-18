'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  ProductSchema,
  ProductSchemaType,
  categories,
} from './add-product-dialog.schema';

type AddProductDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const useAddProductDialog = ({
  isOpen,
  onClose,
}: AddProductDialogProps) => {
  const form = useForm<ProductSchemaType>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: '',
      category: categories[0],
    },
  });

  const onSubmit = (data: ProductSchemaType) => {
    console.log(data);
    toast.success(`Produit ${data.name} ajouté avec succès`);
    onClose();
    form.reset();
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return { form, onSubmit, handleClose };
};
