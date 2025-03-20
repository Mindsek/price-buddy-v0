import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { useProductStore } from '@/lib/store/product.store';

export function ProductDetail() {
  const {
    selectedProduct,
    isViewDialogOpen,
    setIsViewDialogOpen,
    setSelectedProduct,
  } = useProductStore();

  const handleClose = (open: boolean) => {
    setIsViewDialogOpen(open);
    setSelectedProduct(null);
  };

  if (selectedProduct) {
    console.log(selectedProduct);
  }

  return (
    <Sheet open={isViewDialogOpen} onOpenChange={handleClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{selectedProduct?.name}</SheetTitle>
          <SheetDescription>{selectedProduct?.category}</SheetDescription>
        </SheetHeader>
        <div className='grid gap-4 p-4'>
          <div className='flex flex-col gap-2'>
            <Label>Prix par produit</Label>
            <div className='flex flex-col gap-2'>
              {selectedProduct?.prices.map((price) => (
                <div key={price.id}>
                  <Badge variant='outline'>
                    {price.supermarket?.name}: {price.price}€
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
