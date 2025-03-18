export type Price = {
  id: string;
  price: number;
  productId: string;
  supermarketId: string;
  createdAt: Date;
  product?: {
    id: string;
    name: string;
    category: string;
  };
  supermarket?: {
    id: string;
    name: string;
    address: string | null;
  };
};

export type Product = {
  id: string;
  name: string;
  category: string;
  userId: string;
  prices: Price[];
  createdAt: Date;
  updatedAt: Date;
};

export type Supermarket = {
  id: string;
  name: string;
  address: string | null;
  userId: string;
  prices: Price[];
  createdAt: Date;
  updatedAt: Date;
};
