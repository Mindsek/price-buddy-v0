import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Supermarket } from "@/types";

interface SupermarketDetailProps {
  supermarket: Supermarket;
  getProductName: (productId: string) => string;
}

export function SupermarketDetail({
  supermarket,
  getProductName,
}: SupermarketDetailProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Voir les détails</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{supermarket.name}</SheetTitle>
          <SheetDescription>{supermarket.address}</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 p-4">
          <div className="flex flex-col gap-2">
            <Label>Prix par produit</Label>
            <div className="flex flex-col gap-2">
              {supermarket.prices.map((price) => (
                <div key={price.id}>
                  <Badge variant="outline">
                    {getProductName(price.productId)}: {price.price}€
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
