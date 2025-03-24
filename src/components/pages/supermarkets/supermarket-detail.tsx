import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { useSupermarketStore } from '@/lib/store/supermarket.store';

export function SupermarketDetail() {
  const { selectedSupermarket, isViewDialogOpen, setIsViewDialogOpen } =
    useSupermarketStore();

  return (
    <Sheet open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{selectedSupermarket?.name}</SheetTitle>
          <SheetDescription>{selectedSupermarket?.address}</SheetDescription>
        </SheetHeader>
        <div className='grid gap-4 p-4'>
          <div className='flex flex-col gap-2'>
            <Label>Prix par produit</Label>
            <div className='flex flex-col gap-2'>
              {selectedSupermarket?.prices.map((price) => (
                <div key={price.id}>
                  <Badge variant='outline'>
                    {price.product?.name}: {price.price}€
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
