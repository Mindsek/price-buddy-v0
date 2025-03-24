'use client';

import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { ProductDropdown } from './product-dropdown';

import { useMounted } from '@/hooks/use-mounted';
import { useProductStore } from '@/lib/store/product.store';
import { Product } from '@/types';

type ProductListProps = {
  products: Product[];
};

export const ProductList = ({ products }: ProductListProps) => {
  const isMounted = useMounted();
  const { setIsViewDialogOpenAndSelectProduct } = useProductStore();

  if (!isMounted) {
    return (
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Prix le plus bas</TableHead>
              <TableHead>Prix le plus haut</TableHead>
              <TableHead>Différence (%)</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, index) => (
              <TableRow key={index}>
                {Array.from({ length: 6 }).map((_, index) => (
                  <TableCell key={index} className='text-center'>
                    <Skeleton className='h-10 w-full' />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  const getLowestPrice = (prices: Product['prices']) => {
    if (prices.length === 0) return null;
    return Math.min(...prices.map((p) => p.price));
  };

  const getHighestPrice = (prices: Product['prices']) => {
    if (prices.length === 0) return null;
    return Math.max(...prices.map((p) => p.price));
  };

  const getPriceDifference = (prices: Product['prices']) => {
    const lowest = getLowestPrice(prices);
    const highest = getHighestPrice(prices);
    if (!lowest || !highest) return null;
    return (((highest - lowest) / highest) * 100).toFixed(1);
  };

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Prix le plus bas</TableHead>
            <TableHead>Prix le plus haut</TableHead>
            <TableHead>Différence (%)</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              onDoubleClick={() => setIsViewDialogOpenAndSelectProduct(product)}
            >
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>
                {getLowestPrice(product.prices)?.toFixed(2) ?? 'N/A'} €
              </TableCell>
              <TableCell>
                {getHighestPrice(product.prices)?.toFixed(2) ?? 'N/A'} €
              </TableCell>
              <TableCell>
                {getPriceDifference(product.prices) ?? 'N/A'} %
              </TableCell>
              <TableCell className='text-right'>
                <ProductDropdown product={product} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
