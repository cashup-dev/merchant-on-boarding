export type ProductStatus = "active" | "inactive";

export type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  status: ProductStatus;
  description?: string;
  createdAt: string;
  updatedAt: string;
};

// Simple in-memory store for demo purposes.
export const products: Product[] = [
  {
    id: 1,
    name: "Card Reader",
    price: 1500000,
    stock: 25,
    status: "active",
    description: "Portable card reader for SME merchants.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "POS License",
    price: 300000,
    stock: 120,
    status: "active",
    description: "Annual subscription for POS application.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Receipt Paper Roll",
    price: 35000,
    stock: 60,
    status: "inactive",
    description: "Thermal paper roll for POS printers.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
