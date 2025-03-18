"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Product, Supermarket } from "@/types";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { AddPriceDialog } from "./form/price/add-price-dialog";
import { AddProductDialog } from "./form/product/add-product-dialog";
import { ProductList } from "./product-list";

export const ProductsPage = ({
  supermarkets,
  products,
}: {
  supermarkets: Supermarket[];
  products: Product[];
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="mx-auto p-10 w-full">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            <h1 className="text-2xl font-bold">Liste des produits</h1>
          </CardTitle>
          <Button
            onClick={() => setIsAddProductOpen(true)}
            className="cursor-pointer"
          >
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un produit
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher un produit..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <ProductList
              products={filteredProducts}
              onAddPrice={(product) => setSelectedProduct(product)}
            />
          </div>
        </CardContent>
      </Card>

      <AddProductDialog
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
      />

      {selectedProduct && (
        <AddPriceDialog
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          product={selectedProduct}
          supermarkets={supermarkets}
        />
      )}
    </div>
  );
};
