export type Price = {
  id: string;
  price: number; // e.g. 1.99
  userId: string; // relation id of the user
  productId: string; // relation id of the product
  supermarketId: string; // relation id of the supermarket
};

export type Product = {
  id: string;
  name: string;
  category: string; // e.g. "Fruits" or "Légumes"
  prices: Price[]; // prices for the product in different supermarkets
};

export type Supermarket = {
  id: string;
  name: string; // e.g. "Carrefour" or "Auchan"
  address: string | null; // e.g. "123 Rue de la Paix, Paris"
  userId: string; // relation id of the user
  prices: Price[]; // prices for the supermarket
  createdAt: string;
  updatedAt: string;
};
