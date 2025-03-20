import { create } from 'zustand';

import { Supermarket } from '@/types';

interface SupermarketStore {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;

  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (isAddDialogOpen: boolean) => void;

  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (isEditDialogOpen: boolean) => void;

  selectedSupermarket: Supermarket | null;
  setSelectedSupermarket: (supermarket: Supermarket | null) => void;

  setIsEditDialogOpenAndSelectSupermarket: (
    isEditDialogOpen: boolean,
    supermarket: Supermarket
  ) => void;
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

  setIsEditDialogOpenAndSelectSupermarket: (isEditDialogOpen, supermarket) =>
    set({ isEditDialogOpen, selectedSupermarket: supermarket }),
}));
