"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product, Supermarket } from "@/types";
import { useAddPriceDialog } from "./add-price-dialog.logic";

type AddPriceDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  supermarkets: Supermarket[];
};

export const AddPriceDialog = (props: AddPriceDialogProps) => {
  const logic = useAddPriceDialog(props);

  return (
    <Dialog open={props.isOpen} onOpenChange={props.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un prix</DialogTitle>
          <DialogDescription>
            Ajouter un prix pour {props.product.name}
          </DialogDescription>
        </DialogHeader>
        <Form {...logic.form}>
          <form
            onSubmit={logic.form.handleSubmit(logic.handleSubmit)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={logic.form.control}
              name="supermarketId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Supermarché</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un supermarché" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {props.supermarkets.map((supermarket) => (
                        <SelectItem key={supermarket.id} value={supermarket.id}>
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prix (€)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="ex: 1.99"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={logic.handleClose}
              >
                Annuler
              </Button>
              <Button type="submit">Ajouter</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
