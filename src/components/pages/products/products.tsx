'use client';

import { Plus, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import { AddPriceDialog } from './form/price/add-price-dialog';
import { AddProductDialog } from './form/product/add-product-dialog';
import { ProductDeletePrice } from './product-delete-price';
import { ProductDetail } from './product-detail';
import { ProductList } from './product-list';

import { useProductStore } from '@/lib/store/product.store';
import { Product, Supermarket } from '@/types';

export const ProductsPage = ({
  supermarkets,
  products,
}: {
  supermarkets: Supermarket[];
  products: Product[];
}) => {
  const { searchTerm, setSearchTerm, setIsAddProductDialogOpen } =
    useProductStore();

  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className='mx-auto p-10 w-full'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between flex-wrap'>
          <CardTitle>
            <h1 className='text-lg md:text-2xl font-bold'>
              Liste des produits
            </h1>
          </CardTitle>
          <Button
            onClick={() => setIsAddProductDialogOpen(true)}
            className='cursor-pointer'
          >
            <Plus className='mr-2 h-4 w-4' />
            Ajouter un produit
          </Button>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-4'>
            <div className='relative'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                type='search'
                placeholder='Rechercher un produit...'
                className='pl-8'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <ProductList products={filteredProducts} />
          </div>
        </CardContent>
      </Card>

      <AddProductDialog />
      <AddPriceDialog supermarkets={supermarkets} />
      <ProductDetail />
      <ProductDeletePrice />
    </div>
  );
};
