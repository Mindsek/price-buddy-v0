'use client';

import { MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { deleteSupermarket } from '@/app/actions/supermarkets';
import { useSupermarketStore } from '@/lib/store/supermarket.store';
import { Supermarket } from '@/types';

type SupermarketDropdownProps = {
  supermarket: Supermarket;
};

export const SupermarketDropdown = ({
  supermarket,
}: SupermarketDropdownProps) => {
  const {
    setIsEditDialogOpenAndSelectSupermarket,
    setIsViewDialogOpenAndSelectSupermarket,
  } = useSupermarketStore();

  const handleEditSupermarket = (supermarket: Supermarket) => {
    setIsEditDialogOpenAndSelectSupermarket(supermarket);
  };

  const handleViewSupermarket = (supermarket: Supermarket) => {
    setIsViewDialogOpenAndSelectSupermarket(supermarket);
  };

  const handleDeleteSupermarket = async (supermarket: Supermarket) => {
    try {
      await deleteSupermarket(supermarket.id);
      toast.success(`Supermarché ${supermarket.name} supprimé avec succès`);
    } catch (error) {
      console.error('Erreur lors de la suppression du supermarché:', error);
      toast.error('Erreur lors de la suppression du supermarché');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='sm'>
          <MoreHorizontal className='h-4 w-4' />
          <span className='sr-only'>Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => handleViewSupermarket(supermarket)}>
          Voir les details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleEditSupermarket(supermarket)}>
          Modifier
        </DropdownMenuItem>
        <DropdownMenuItem
          className='text-red-600'
          onClick={() => handleDeleteSupermarket(supermarket)}
        >
          Supprimer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
