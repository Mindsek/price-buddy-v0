'use client';

import { Store } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useAddPriceDialog } from './add-price-dialog.logic';

import { Supermarket } from '@/types';

type AddPriceDialogProps = {
  supermarkets: Supermarket[];
};

export const AddPriceDialog = (props: AddPriceDialogProps) => {
  const logic = useAddPriceDialog(props);

  return (
    <Dialog open={logic.isAddPriceDialogOpen} onOpenChange={logic.handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un prix</DialogTitle>
          <DialogDescription>
            Ajouter un prix pour {logic.selectedProduct?.name}
          </DialogDescription>
        </DialogHeader>
        {props.supermarkets.length === 0 ? (
          <div className='flex flex-col items-center gap-4 py-8'>
            <Store className='h-12 w-12 text-muted-foreground' />
            <div className='text-center'>
              <h3 className='text-lg font-semibold'>Aucun supermarché</h3>
              <p className='text-sm text-muted-foreground'>
                Vous devez d'abord créer un supermarché avant d'ajouter un prix.
              </p>
            </div>
            <Button asChild>
              <Link href='/supermarkets'>Créer un supermarché</Link>
            </Button>
          </div>
        ) : (
          <Form {...logic.form}>
            <form
              onSubmit={logic.form.handleSubmit(logic.handleSubmit)}
              className='grid gap-4 py-4'
            >
              <FormField
                control={logic.form.control}
                name='supermarketId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supermarché</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Sélectionner un supermarché' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {props.supermarkets.map((supermarket) => (
                          <SelectItem
                            key={supermarket.id}
                            value={supermarket.id}
                          >
                            {supermarket.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={logic.form.control}
                name='price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prix (€)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        step='0.01'
                        min='0'
                        placeholder='ex: 1.99'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => logic.handleClose(false)}
                >
                  Annuler
                </Button>
                <Button type='submit'>Ajouter</Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};
