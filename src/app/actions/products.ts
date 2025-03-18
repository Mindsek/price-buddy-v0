'use server';

import { productsData } from '@/constants';
import { Product } from '@/types';

export async function getProducts(): Promise<Product[]> {
  try {
    return productsData;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error("Can't fetch products");
  }
}
