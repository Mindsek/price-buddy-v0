'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  EditSupermarketSchemaType,
  useEditSupermarketSchema,
} from './edit-supermarket-dialog.schema';

import { updateSupermarket } from '@/app/actions/supermarkets';
import { Supermarket } from '@/types';

type EditSupermarketDialogProps = {
  onClose: () => void;
  supermarket: Supermarket;
};

export const useEditSupermarketDialog = ({
  onClose,
  supermarket,
}: EditSupermarketDialogProps) => {
  const { data: session } = useSession();
  const form = useForm<EditSupermarketSchemaType>({
    resolver: zodResolver(useEditSupermarketSchema(supermarket)),
    defaultValues: {
      name: '',
      address: '',
    },
  });

  async function onSubmit(data: EditSupermarketSchemaType) {
    try {
      if (!session?.user) {
        throw new Error('User not found');
      }

      await updateSupermarket({
        name: data.name,
        address: data.address,
        id: supermarket.id,
      });
      toast.success(`Supermarché ${data.name} modifié avec succès`);
      form.reset();
      onClose();
    } catch (error) {
      console.error('Erreur lors de la modification du supermarché:', error);
      toast.error(`Erreur lors de la modification du supermarché ${data.name}`);
    }
  }

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return { form, onSubmit, handleClose };
};
