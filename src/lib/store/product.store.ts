import { create } from 'zustand';

import { Product } from '@/types';

interface ProductStore {
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;

  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;

  isAddPriceDialogOpen: boolean;
  setIsAddPriceDialogOpen: (isAddPriceDialogOpen: boolean) => void;

  isAddProductDialogOpen: boolean;
  setIsAddProductDialogOpen: (isAddProductDialogOpen: boolean) => void;

  setIsAddPriceDialogOpenAndSelectProduct: (product: Product) => void;

  isViewDialogOpen: boolean;
  setIsViewDialogOpen: (isViewDialogOpen: boolean) => void;
  setIsViewDialogOpenAndSelectProduct: (product: Product) => void;

  isDeletePriceDialogOpen: boolean;
  setIsDeletePriceDialogOpen: (isDeletePriceDialogOpen: boolean) => void;
  setIsDeletePriceDialogOpenAndSelectProduct: (product: Product) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  selectedProduct: null,
  setSelectedProduct: (product) => set({ selectedProduct: product }),

  searchTerm: '',
  setSearchTerm: (searchTerm) => set({ searchTerm }),

  isAddPriceDialogOpen: false,
  setIsAddPriceDialogOpen: (isAddPriceDialogOpen) =>
    set({ isAddPriceDialogOpen }),

  isAddProductDialogOpen: false,
  setIsAddProductDialogOpen: (isAddProductDialogOpen) =>
    set({ isAddProductDialogOpen }),

  setIsAddPriceDialogOpenAndSelectProduct: (product) =>
    set({ isAddPriceDialogOpen: true, selectedProduct: product }),

  isViewDialogOpen: false,
  setIsViewDialogOpen: (isViewDialogOpen) => set({ isViewDialogOpen }),

  setIsViewDialogOpenAndSelectProduct: (product) =>
    set({ isViewDialogOpen: true, selectedProduct: product }),

  isDeletePriceDialogOpen: false,
  setIsDeletePriceDialogOpen: (isDeletePriceDialogOpen) =>
    set({ isDeletePriceDialogOpen }),

  setIsDeletePriceDialogOpenAndSelectProduct: (product) =>
    set({ isDeletePriceDialogOpen: true, selectedProduct: product }),
}));
