'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { FormSchema, FormSchemaType } from './add-supermarket-dialog.schema';

type AddSupermarketDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const useAddSupermarketDialog = ({
  isOpen,
  onClose,
}: AddSupermarketDialogProps) => {
  const { data: session } = useSession();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      address: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      console.log(data, session);
      form.reset();
      onClose();
      toast.success(`Supermarché ${data.name} ajouté avec succès`);
    } catch (error) {
      console.error("Erreur lors de l'ajout du supermarché:", error);
      toast.error(`Erreur lors de l'ajout du supermarché ${data.name}`);
    }
  }

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return { form, onSubmit, handleClose };
};
