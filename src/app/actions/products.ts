'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';
import { Price, Product } from '@/types';


export async function getProducts(userId: string): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      where: { userId },
      include: {
        prices: {
          include: {
            supermarket: {
              select: {
                name: true,
                address: true,
                id: true,
              },
            },
          },
        },
      },
    });

    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductById(
  id: string,
  userId: string
): Promise<Product | null> {
  try {
    const product = await prisma.product.findFirst({
      where: { id, userId },
      include: {
        prices: {
          include: {
            supermarket: {
              select: {
                name: true,
                address: true,
                id: true,
              },
            },
          },
        },
      },
    });

    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function createProduct({
  name,
  category,
  userId,
}: Pick<Product, 'name' | 'category' | 'userId'>) {
  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        category,
        userId,
      },
    });

    revalidatePath('/products');
    return newProduct;
  } catch (error) {
    console.error('Error creating product:', error);
    return null;
  }
}

export async function updateProduct({
  id,
  name,
  category,
  userId,
}: Pick<Product, 'id' | 'name' | 'category' | 'userId'>) {
  try {
    const updatedProduct = await prisma.product.update({
      where: { id, userId },
      data: { name, category },
    });

    revalidatePath('/products');
    return updatedProduct;
  } catch (error) {
    console.error('Error updating product:', error);
    return null;
  }
}

export async function deleteProduct(id: string, userId: string) {
  try {
    await prisma.price.deleteMany({
      where: { productId: id },
    });

    await prisma.product.delete({
      where: { id, userId },
    });

    revalidatePath('/products');
    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    return false;
  }
}

export async function addPriceToProduct({
  productId,
  price,
  supermarketId,
  userId,
}: Pick<Price, 'price' | 'productId' | 'supermarketId'> & { userId: string }) {
  try {
    const product = await prisma.product.findFirst({
      where: { id: productId, userId },
    });

    if (!product) {
      throw new Error('Product not found or not owned by user');
    }

    const newPrice = await prisma.price.create({
      data: {
        price,
        productId,
        supermarketId,
      },
    });

    revalidatePath('/products');
    return newPrice;
  } catch (error) {
    console.error('Error adding price to product:', error);
    return null;
  }
}

export async function deletePrice(priceId: string, userId: string) {
  try {
    const price = await prisma.price.findFirst({
      where: { id: priceId },
      include: { product: true },
    });

    if (!price || price.product.userId !== userId) {
      throw new Error('Price not found or not owned by user');
    }

    await prisma.price.delete({
      where: { id: priceId },
    });

    revalidatePath('/products');
  } catch (error) {
    console.error('Error deleting price:', error);
    throw new Error('Failed to delete price');
  }
}
