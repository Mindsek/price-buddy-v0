'use client';

import { MapPin, Store } from 'lucide-react';
import { useSession } from 'next-auth/react';

import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { SupermarketDropdown } from './supermarket-dropdown';

import { useMounted } from '@/hooks/use-mounted';
import { Supermarket } from '@/types';

type SupermarketListProps = {
  supermarkets: Supermarket[];
};

export const SupermarketList = ({ supermarkets }: SupermarketListProps) => {
  const isMounted = useMounted();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  if (!isMounted || !userId) {
    return (
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Adresse</TableHead>
              <TableHead>Produits suivis</TableHead>
              <TableHead>Meilleures offres</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, index) => (
              <TableRow key={index}>
                {Array.from({ length: 5 }).map((_, index) => (
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

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Adresse</TableHead>
            <TableHead>Produits suivis</TableHead>
            <TableHead>Meilleures offres</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {supermarkets.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className='text-center'>
                Aucun supermarché trouvé
              </TableCell>
            </TableRow>
          ) : (
            supermarkets.map((supermarket) => {
              const bestOffer =
                supermarket.prices.length > 0
                  ? Math.min(...supermarket.prices.map((p) => p.price))
                  : null;

              return (
                <TableRow key={supermarket.id}>
                  <TableCell className='font-medium'>
                    <div className='flex items-center gap-2'>
                      <Store className='h-4 w-4 text-muted-foreground' />
                      {supermarket.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      <MapPin className='h-4 w-4 text-muted-foreground' />
                      {supermarket.address}
                    </div>
                  </TableCell>
                  <TableCell>{supermarket.prices.length}</TableCell>
                  <TableCell>
                    <div className='flex flex-wrap gap-1'>
                      {bestOffer ? (
                        <Badge variant='outline'>{bestOffer}€</Badge>
                      ) : (
                        <span className='text-muted-foreground text-sm'>
                          Aucune offre
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className='text-right'>
                    <SupermarketDropdown supermarket={supermarket} />
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};
