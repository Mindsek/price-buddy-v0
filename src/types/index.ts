export type Price = {
  id: string;
  price: number;
  productId: string;
  supermarketId: string;
  createdAt: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  userId: string;
  prices: Price[];
  createdAt: string;
  updatedAt: string;
};

export type Supermarket = {
  id: string;
  name: string;
  address: string | null;
  userId: string;
  prices: Price[];
  createdAt: string;
  updatedAt: string;
};
