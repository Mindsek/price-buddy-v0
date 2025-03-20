'use client';

import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

import { deletePrice } from '@/app/actions/products';
import { useProductStore } from '@/lib/store/product.store';

export function ProductDeletePrice() {
  const {
    selectedProduct,
    isDeletePriceDialogOpen,
    setIsDeletePriceDialogOpen,
    setSelectedProduct,
  } = useProductStore();

  const handleClose = (open: boolean) => {
    setIsDeletePriceDialogOpen(open);
    setSelectedProduct(null);
  };

  const handleDeletePrice = async (priceId: string) => {
    try {
      await deletePrice(priceId);
      toast.success('Prix supprimé avec succès');
      handleClose(false);
    } catch (error) {
      console.error('Erreur lors de la suppression du prix:', error);
      toast.error('Erreur lors de la suppression du prix');
    }
  };

  return (
    <Dialog open={isDeletePriceDialogOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer un prix</DialogTitle>
          <DialogDescription>
            Sélectionnez le prix à supprimer pour {selectedProduct?.name}
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='flex flex-col gap-2'>
            <Label>Prix disponibles</Label>
            <div className='flex flex-col gap-2'>
              {selectedProduct?.prices.map((price) => (
                <div
                  key={price.id}
                  className='flex items-center justify-between rounded-md border p-2 hover:bg-accent'
                >
                  <Badge variant='outline'>
                    {price.supermarket?.name}: {price.price}€
                  </Badge>
                  <Button
                    variant='destructive'
                    size='sm'
                    onClick={() => handleDeletePrice(price.id)}
                  >
                    Supprimer
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant='outline' onClick={() => handleClose(false)}>
            Annuler
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
