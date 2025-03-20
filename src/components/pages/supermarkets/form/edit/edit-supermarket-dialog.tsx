'use client';

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
import { Textarea } from '@/components/ui/textarea';

import { useEditSupermarketDialog } from './edit-supermarket-dialog.logic';

export const EditSupermarketDialog = () => {
  const logic = useEditSupermarketDialog();

  return (
    <Dialog open={logic.isEditDialogOpen} onOpenChange={logic.handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier le supermarché</DialogTitle>
          <DialogDescription>
            Modifier les informations du supermarché.
          </DialogDescription>
        </DialogHeader>
        <Form {...logic.form}>
          <form
            onSubmit={logic.form.handleSubmit(logic.onSubmit)}
            className='grid gap-4 py-4'
          >
            <FormField
              control={logic.form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom du supermarché</FormLabel>
                  <FormControl>
                    <Input placeholder='ex: Carrefour' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={logic.form.control}
              name='address'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='ex: 123 Avenue de la République, 75011 Paris'
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className='mt-4'>
              <Button
                className='cursor-pointer'
                type='button'
                variant='outline'
                onClick={logic.handleClose}
              >
                Annuler
              </Button>
              <Button
                className='cursor-pointer'
                type='submit'
                disabled={logic.form.formState.isSubmitting}
              >
                {logic.form.formState.isSubmitting
                  ? 'Modification en cours...'
                  : 'Modifier'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
