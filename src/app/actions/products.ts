'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';
import { Price, Product } from '@/types';

/**
 here same we want to have all products with their prices and supermarkets

 so at beginning we have something like this:

 {
  "id": "1",
  "name": "Product 1",
  "category": "Category 1",
  "prices": [
    {
      "id": "1",
      "price": 10,
      "supermarketId": "1"
    }
  ]

  we have a product with id 1 and a price of 10 at the supermarket with id 1 but we don't know the supermarket name and address

  so we need to fetch the supermarket name and address from the supermarket table and join it to the product table

  we can do this by using the following query:

  const products = await prisma.product.findMany({
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

  so now we have the product name, category, id and the supermarket name, address, id
 */
export async function getProducts(): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
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

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
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
}: Pick<Product, 'id' | 'name' | 'category'>) {
  try {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { name, category },
    });

    revalidatePath('/products');
    return updatedProduct;
  } catch (error) {
    console.error('Error updating product:', error);
    return null;
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.price.deleteMany({
      where: { productId: id },
    });

    await prisma.product.delete({
      where: { id },
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
}: Pick<Price, 'price' | 'productId' | 'supermarketId'>) {
  try {
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

export async function deletePrice(priceId: string) {
  try {
    await prisma.price.delete({
      where: { id: priceId },
    });

    revalidatePath('/products');
  } catch (error) {
    console.error('Error deleting price:', error);
    throw new Error('Failed to delete price');
  }
}
