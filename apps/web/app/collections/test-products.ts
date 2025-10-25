// Test data for products
export const testProducts = [
  {
    id: 1,
    name: "Classic Leather Watch",
    price: 199.99,
    prevprice: 249.99,
    brand: {
      id: 1,
      name: "Luxury Time",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Sporty Sneakers",
    price: 89.99,
    brand: {
      id: 2,
      name: "Urban Steps",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    images: [
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Designer Handbag",
    price: 299.99,
    prevprice: 399.99,
    brand: {
      id: 3,
      name: "Fashion Elite",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    images: [
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];