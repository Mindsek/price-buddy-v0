"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Supermarket } from "@/types";
import { MapPin, MoreHorizontal, Store } from "lucide-react";
import { SupermarketDetail } from "./supermarket-detail";

type SupermarketListProps = {
  supermarkets: Supermarket[];
  onDelete: (supermarket: Supermarket) => void;
};

export function SupermarketList({
  supermarkets,
  onDelete,
}: SupermarketListProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Adresse</TableHead>
            <TableHead>Produits suivis</TableHead>
            <TableHead>Meilleures offres</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {supermarkets.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Aucun supermarché trouvé
              </TableCell>
            </TableRow>
          ) : (
            supermarkets.map((supermarket) => (
              <TableRow key={supermarket.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Store className="h-4 w-4 text-muted-foreground" />
                    {supermarket.name}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    {supermarket.address}
                  </div>
                </TableCell>
                <TableCell>{supermarket.prices.length}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {supermarket.prices.length &&
                    supermarket.prices.length > 0 ? (
                      supermarket.prices.map((price, index) => (
                        <Badge key={index} variant="outline">
                          {price.price}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground text-sm">
                        Aucune offre
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <SupermarketDetail supermarket={supermarket} />
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => onDelete(supermarket)}
                      >
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
