import { NextResponse } from "next/server";
import type { Product, ProductStatus } from "./data";
import { products } from "./data";

export async function GET() {
  return NextResponse.json({ data: products });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, price, stock, status, description } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 }
      );
    }

    const parsedPrice = Number(price);
    const parsedStock = Number(stock);
    const normalizedStatus: ProductStatus =
      status === "inactive" ? "inactive" : "active";

    if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
      return NextResponse.json(
        { message: "Price must be a positive number" },
        { status: 400 }
      );
    }

    if (Number.isNaN(parsedStock) || parsedStock < 0) {
      return NextResponse.json(
        { message: "Stock must be a positive number" },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    const newProduct: Product = {
      id: products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1,
      name: name.trim(),
      price: parsedPrice,
      stock: parsedStock,
      status: normalizedStatus,
      description: description?.toString() ?? "",
      createdAt: now,
      updatedAt: now,
    };

    products.push(newProduct);

    return NextResponse.json({ data: newProduct }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to create product" },
      { status: 500 }
    );
  }
}
