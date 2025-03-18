"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Product, Supermarket } from "@/types";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { AddSupermarketDialog } from "./add-supermarket-dialog";
import { SupermarketList } from "./supermarket-list";

export const SupermarketsPage = ({
  supermarkets,
  products,
}: {
  supermarkets: Supermarket[];
  products: Product[];
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredSupermarkets = supermarkets.filter((supermarket) => {
    return (
      supermarket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supermarket.address?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="mx-auto p-10 w-full">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            <h1 className="text-2xl font-bold">Liste des supermarchés</h1>
          </CardTitle>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="cursor-pointer"
          >
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un supermarché
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher un supermarché..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <SupermarketList
              supermarkets={filteredSupermarkets}
              products={products}
            />
          </div>
        </CardContent>
      </Card>

      <AddSupermarketDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />
    </div>
  );
};
