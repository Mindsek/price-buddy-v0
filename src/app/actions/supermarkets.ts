'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';
import { Supermarket } from '@/types';

export async function getSupermarkets(): Promise<Supermarket[]> {
  try {
    const supermarkets = await prisma.supermarket.findMany({
      include: {
        prices: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                category: true,
              },
            },
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    return supermarkets;
  } catch (error) {
    console.error('Error fetching supermarkets:', error);
    return [];
  }
}

export async function getSupermarketById(
  id: string
): Promise<Supermarket | null> {
  try {
    const supermarket = await prisma.supermarket.findUnique({
      where: { id },
      include: {
        prices: {
          include: {
            product: true,
          },
        },
      },
    });

    return supermarket;
  } catch (error) {
    console.error('Error fetching supermarket:', error);
    return null;
  }
}

export async function createSupermarket({
  name,
  address,
  userId,
}: Pick<Supermarket, 'name' | 'address' | 'userId'>) {
  try {
    const newSupermarket = await prisma.supermarket.create({
      data: {
        name,
        address,
        userId,
      },
    });

    revalidatePath('/supermarkets');
    return newSupermarket;
  } catch (error) {
    console.error('Error creating supermarket:', error);
    return null;
  }
}

export async function updateSupermarket({
  id,
  name,
  address,
}: Pick<Supermarket, 'id' | 'name' | 'address'>) {
  try {
    const updatedSupermarket = await prisma.supermarket.update({
      where: { id },
      data: {
        name,
        address,
      },
    });

    revalidatePath('/supermarkets');
    return updatedSupermarket;
  } catch (error) {
    console.error('Error updating supermarket:', error);
    return null;
  }
}

export async function deleteSupermarket(id: string) {
  try {
    await prisma.supermarket.delete({
      where: { id },
    });

    revalidatePath('/supermarkets');
    return true;
  } catch (error) {
    console.error('Error deleting supermarket:', error);
    return false;
  }
}
