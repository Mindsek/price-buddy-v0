'use client';

import { Plus, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import { AddSupermarketDialog } from './form/add/add-supermarket-dialog';
import { EditSupermarketDialog } from './form/edit/edit-supermarket-dialog';
import { SupermarketDetail } from './supermarket-detail';
import { SupermarketList } from './supermarket-list';

import { useSupermarketStore } from '@/lib/store/supermarket.store';
import { Supermarket } from '@/types';

export const SupermarketsPage = ({
  supermarkets,
}: {
  supermarkets: Supermarket[];
}) => {
  const { searchTerm, setSearchTerm, setIsAddDialogOpen } =
    useSupermarketStore();

  const filteredSupermarkets = supermarkets.filter((supermarket) => {
    return (
      supermarket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supermarket.address?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className='mx-auto p-10 w-full'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between flex-wrap'>
          <CardTitle>
            <h1 className='text-lg md:text-2xl font-bold'>
              Liste des supermarchés
            </h1>
          </CardTitle>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className='cursor-pointer'
          >
            <Plus className='mr-2 h-4 w-4' />
            Ajouter un supermarché
          </Button>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-4'>
            <div className='relative'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                type='search'
                placeholder='Rechercher un supermarché...'
                className='pl-8'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <SupermarketList supermarkets={filteredSupermarkets} />
          </div>
        </CardContent>
      </Card>

      <AddSupermarketDialog />
      <EditSupermarketDialog />
      <SupermarketDetail />
    </div>
  );
};
