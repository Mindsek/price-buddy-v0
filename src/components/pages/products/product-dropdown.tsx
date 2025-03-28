'use client';

import { MoreHorizontal } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { deleteProduct, getProductById } from '@/app/actions/products';
import { useProductStore } from '@/lib/store/product.store';
import { Product } from '@/types';

type ProductDropdownProps = {
  product: Product;
};

export const ProductDropdown = ({ product }: ProductDropdownProps) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const {
    setIsViewDialogOpenAndSelectProduct,
    setIsAddPriceDialogOpenAndSelectProduct,
    setIsDeletePriceDialogOpenAndSelectProduct,
  } = useProductStore();

  const handleViewProduct = (product: Product) => {
    setIsViewDialogOpenAndSelectProduct(product);
  };

  const handleDeleteProduct = async (product: Product) => {
    try {
      if (!userId) {
        toast.error('Utilisateur non connecté');
        return;
      }

      const isExist = await getProductById(product.id, userId);
      if (!isExist) {
        toast.error('Produit non trouvé');
        return;
      }
      await deleteProduct(product.id, userId);
      toast.success(`Produit ${product.name} supprimé avec succès`);
    } catch (error) {
      console.error('Erreur lors de la suppression du produit:', error);
      toast.error('Erreur lors de la suppression du produit');
    }
  };

  const handleAddPrice = (product: Product) => {
    setIsAddPriceDialogOpenAndSelectProduct(product);
  };

  const handleDeletePrice = (product: Product) => {
    setIsDeletePriceDialogOpenAndSelectProduct(product);
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
        <DropdownMenuItem onClick={() => handleViewProduct(product)}>
          Voir les details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleAddPrice(product)}>
          Ajouter un prix
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='text-red-600'
          onClick={() => handleDeletePrice(product)}
        >
          Supprimer un prix
        </DropdownMenuItem>
        <DropdownMenuItem
          className='text-red-600'
          onClick={() => handleDeleteProduct(product)}
        >
          Supprimer le produit
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
