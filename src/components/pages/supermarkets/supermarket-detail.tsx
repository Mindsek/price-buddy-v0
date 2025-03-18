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

export function SupermarketDetail({
  supermarket,
}: {
  supermarket: Supermarket;
}) {
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
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label>Prix</Label>
            <div className="flex flex-wrap gap-1">
              {supermarket.prices.map((price) => (
                <Badge key={price.id}>{price.price}</Badge>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
