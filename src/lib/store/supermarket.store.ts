import { create } from 'zustand';

import { Supermarket } from '@/types';

interface SupermarketStore {
  selectedSupermarket: Supermarket | null;
  setSelectedSupermarket: (supermarket: Supermarket | null) => void;

  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;

  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (isAddDialogOpen: boolean) => void;

  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (isEditDialogOpen: boolean) => void;
  setIsEditDialogOpenAndSelectSupermarket: (supermarket: Supermarket) => void;

  isViewDialogOpen: boolean;
  setIsViewDialogOpen: (isViewDialogOpen: boolean) => void;
  setIsViewDialogOpenAndSelectSupermarket: (supermarket: Supermarket) => void;
}

export const useSupermarketStore = create<SupermarketStore>((set) => ({
  searchTerm: '',
  setSearchTerm: (searchTerm) => set({ searchTerm }),

  isAddDialogOpen: false,
  setIsAddDialogOpen: (isAddDialogOpen) => set({ isAddDialogOpen }),

  isEditDialogOpen: false,
  setIsEditDialogOpen: (isEditDialogOpen) => set({ isEditDialogOpen }),

  selectedSupermarket: null,
  setSelectedSupermarket: (supermarket) =>
    set({ selectedSupermarket: supermarket }),

  setIsEditDialogOpenAndSelectSupermarket: (supermarket) =>
    set({ isEditDialogOpen: true, selectedSupermarket: supermarket }),

  isViewDialogOpen: false,
  setIsViewDialogOpen: (isViewDialogOpen) => set({ isViewDialogOpen }),

  setIsViewDialogOpenAndSelectSupermarket: (supermarket) =>
    set({ isViewDialogOpen: true, selectedSupermarket: supermarket }),
}));
