'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { FormSchema, FormSchemaType } from './add-supermarket-dialog.schema';

import { createSupermarket } from '@/app/actions/supermarkets';
import { useSupermarketStore } from '@/lib/store/supermarket.store';

export const useAddSupermarketDialog = () => {
  const { data: session } = useSession();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      address: '',
    },
  });

  const { isAddDialogOpen, setIsAddDialogOpen } = useSupermarketStore();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      if (!session?.user) {
        throw new Error('User not found');
      }

      await createSupermarket({
        name: data.name,
        address: data.address,
        userId: session.user.id as string,
      });
      toast.success(`Supermarché ${data.name} ajouté avec succès`);
      form.reset();
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error("Erreur lors de l'ajout du supermarché:", error);
      toast.error(`Erreur lors de l'ajout du supermarché ${data.name}`);
    }
  }

  const handleClose = () => {
    form.reset();
    setIsAddDialogOpen(false);
  };

  return { form, onSubmit, handleClose, isAddDialogOpen };
};
