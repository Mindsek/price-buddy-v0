'use client';

import { MapPin, MoreHorizontal, Store } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { deleteSupermarket } from '@/app/actions/supermarkets';
import { useMounted } from '@/hooks/use-mounted';
import { useSupermarketStore } from '@/lib/store/supermarket.store';
import { Supermarket } from '@/types';

type SupermarketListProps = {
  supermarkets: Supermarket[];
};

export const SupermarketList = ({ supermarkets }: SupermarketListProps) => {
  const isMounted = useMounted();
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const {
    setIsEditDialogOpenAndSelectSupermarket,
    setIsViewDialogOpenAndSelectSupermarket,
  } = useSupermarketStore();

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

  const handleDeleteSupermarket = async (supermarket: Supermarket) => {
    try {
      await deleteSupermarket(supermarket.id);
      toast.success(`Supermarché ${supermarket.name} supprimé avec succès`);
    } catch (error) {
      console.error('Erreur lors de la suppression du supermarché:', error);
      toast.error('Erreur lors de la suppression du supermarché');
    }
  };

  const handleEditSupermarket = (supermarket: Supermarket) => {
    setIsEditDialogOpenAndSelectSupermarket(supermarket);
  };

  const handleViewSupermarket = (supermarket: Supermarket) => {
    setIsViewDialogOpenAndSelectSupermarket(supermarket);
  };

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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='ghost' size='sm'>
                          <MoreHorizontal className='h-4 w-4' />
                          <span className='sr-only'>Menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuItem
                          onClick={() => handleViewSupermarket(supermarket)}
                        >
                          Voir les details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleEditSupermarket(supermarket)}
                        >
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className='text-red-600'
                          onClick={() => handleDeleteSupermarket(supermarket)}
                        >
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
