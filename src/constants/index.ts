export const supermarketsData = [
  {
    id: "super1",
    name: "Carrefour",
    address: "123 Rue de la Paix, Paris",
    userId: "user1",
    prices: [
      {
        id: "price1",
        price: 1.99,
        userId: "user1",
        productId: "prod1",
        supermarketId: "super1",
      },
    ],
    createdAt: "2025-03-18T10:00:00Z",
    updatedAt: "2025-03-18T10:00:00Z",
  },
  {
    id: "super2",
    name: "Auchan",
    address: "456 Rue de la Liberté, Lyon",
    userId: "user1",
    prices: [
      {
        id: "price2",
        price: 2.09,
        userId: "user1",
        productId: "prod1",
        supermarketId: "super2",
        createdAt: "2025-03-18T11:00:00Z",
      },
    ],
    createdAt: "2025-03-18T11:00:00Z",
    updatedAt: "2025-03-18T11:00:00Z",
  },
];

export const productsData = [
  {
    id: "prod1",
    name: "Milk",
    category: "Dairy",
    userId: "user1",
    prices: [
      {
        id: "price1",
        price: 1.99,
        supermarketId: "super1",
        createdAt: "2025-03-18T10:00:00Z",
      },
      {
        id: "price2",
        price: 2.09,
        supermarketId: "super2",
        createdAt: "2025-03-18T11:00:00Z",
      },
    ],
    createdAt: "2025-03-18T10:00:00Z",
    updatedAt: "2025-03-18T10:00:00Z",
  },
];
