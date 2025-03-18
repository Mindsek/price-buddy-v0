'use server';

import { supermarketsData } from '@/constants';
import { Supermarket } from '@/types';

export async function getSupermarkets(): Promise<Supermarket[]> {
  try {
    return supermarketsData;
  } catch (error) {
    console.error('Error fetching supermarkets:', error);
    throw new Error("Can't fetch supermarkets");
  }
}
