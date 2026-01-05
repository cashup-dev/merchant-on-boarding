import { NextResponse } from "next/server";
import type { Product } from "../data";
import { products } from "../data";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  return updateProduct(request, params, "put");
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  return updateProduct(request, params, "patch");
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const productId = Number(id);
  if (Number.isNaN(productId)) {
    return NextResponse.json({ message: "Invalid product id" }, { status: 400 });
  }

  const index = products.findIndex((p) => p.id === productId);
  if (index === -1) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  const [deleted] = products.splice(index, 1);
  return NextResponse.json({ data: deleted });
}

async function updateProduct(
  request: Request,
  params: { id: string },
  method: "put" | "patch"
) {
  try {
    const productId = Number(params.id);
    if (Number.isNaN(productId)) {
      return NextResponse.json(
        { message: "Invalid product id" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const targetIndex = products.findIndex((p) => p.id === productId);
    if (targetIndex === -1) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    const existing = products[targetIndex];

    const resolveNumber = (incoming: any, fallback: number) => {
      const parsed = Number(incoming);
      return Number.isNaN(parsed) ? fallback : parsed;
    };

    const updated: Product = {
      ...existing,
      ...(method === "put"
        ? {
            name: body.name?.toString() ?? "",
            price: resolveNumber(body.price, 0),
            stock: resolveNumber(body.stock, 0),
            status: body.status === "inactive" ? "inactive" : "active",
            description: body.description?.toString() ?? "",
          }
        : {
            name: body.name !== undefined ? body.name.toString() : existing.name,
            price:
              body.price !== undefined
                ? resolveNumber(body.price, existing.price)
                : existing.price,
            stock:
              body.stock !== undefined
                ? resolveNumber(body.stock, existing.stock)
                : existing.stock,
            status:
              body.status !== undefined
                ? body.status === "inactive"
                  ? "inactive"
                  : "active"
                : existing.status,
            description:
              body.description !== undefined
                ? body.description.toString()
                : existing.description,
          }),
      updatedAt: new Date().toISOString(),
    };

    products[targetIndex] = updated;

    return NextResponse.json({ data: updated });
  } catch {
    return NextResponse.json(
      { message: "Failed to update product" },
      { status: 500 }
    );
  }
}
