'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  EditSupermarketSchemaType,
  useEditSupermarketSchema,
} from './edit-supermarket-dialog.schema';

import { updateSupermarket } from '@/app/actions/supermarkets';
import { useSupermarketStore } from '@/lib/store/supermarket.store';
import { Supermarket } from '@/types';

export const useEditSupermarketDialog = () => {
  const { data: session } = useSession();
  const {
    selectedSupermarket,
    isEditDialogOpen,
    setIsEditDialogOpen,
    setSelectedSupermarket,
  } = useSupermarketStore();

  const form = useForm<EditSupermarketSchemaType>({
    resolver: zodResolver(
      useEditSupermarketSchema(selectedSupermarket as Supermarket)
    ),
    defaultValues: {
      name: '',
      address: '',
    },
  });

  useEffect(() => {
    if (selectedSupermarket?.name && selectedSupermarket?.address) {
      form.reset({
        name: selectedSupermarket.name,
        address: selectedSupermarket.address,
      });
    }
  }, [selectedSupermarket, form]);

  async function onSubmit(data: EditSupermarketSchemaType) {
    try {
      if (!session?.user || !selectedSupermarket) {
        toast.error('Utilisateur ou supermarché non trouvé');
        return;
      }

      await updateSupermarket({
        name: data.name,
        address: data.address,
        id: selectedSupermarket.id,
        userId: session.user.id as string,
      });
      toast.success(`Supermarché ${data.name} modifié avec succès`);
      form.reset();
      handleClose();
    } catch (error) {
      console.error('Erreur lors de la modification du supermarché:', error);
      toast.error(`Erreur lors de la modification du supermarché ${data.name}`);
    }
  }

  const handleClose = () => {
    form.reset();
    setIsEditDialogOpen(false);
    setSelectedSupermarket(null);
  };

  return { form, onSubmit, handleClose, isEditDialogOpen };
};
