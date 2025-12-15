'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { useEffect, useState } from "react";

interface ProductRow {
  id: number;
  name: string;
  price: number;
  stock: number;
  status: string;
  updatedAt?: string;
}

export default function RecentProducts() {
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/products");
        const json = await res.json();
        
        if (!res.ok) throw new Error(json.message || "Failed to fetch product data");
        
        const fetched = (json.data || []) as ProductRow[];

        const sorted = [...fetched]
          .sort((a, b) => {
            const timeA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
            const timeB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
            return timeB - timeA;
          })
          .slice(0, 5);

        setProducts(sorted);
      } catch (err: any) {
        setError(err.message);
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentProducts();
  }, []);

  if (loading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
        <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Latest Products
          </h2>
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-3 border-b border-gray-100 dark:border-gray-800">
              <div className="w-1/3 h-4 bg-gray-100 rounded animate-pulse"></div>
              <div className="w-1/4 h-4 bg-gray-100 rounded animate-pulse"></div>
              <div className="w-1/4 h-4 bg-gray-100 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
        <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Latest Products
          </h2>
        </div>
        <div className="text-red-500 p-4">{error}</div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
        <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Latest Products
          </h2>
        </div>
        <div className="text-gray-500 p-4">No product data available</div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Latest Products
        </h2>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 pl-5 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                #
              </TableCell>
              <TableCell
                isHeader
                className="py-3 pl-10 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Product
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400 pr-10"
              >
                Price
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400 pr-10"
              >
                Stock
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {products.map((product, index) => (
              <TableRow key={product.id}>
                <TableCell className="py-[1.11rem] pl-5">
                  <Badge size="sm">#{index + 1}</Badge>
                </TableCell>
                <TableCell className="py-[1.11rem] pl-10 font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  {product.name}
                </TableCell>
                <TableCell className="py-[1.11rem] text-gray-500 text-theme-sm dark:text-gray-400 text-end pr-12">
                  Rp{product.price.toLocaleString("id-ID")}
                </TableCell>
                <TableCell className="py-[1.11rem] text-gray-500 text-theme-sm dark:text-gray-400 text-end pr-12">
                  {product.stock.toLocaleString("id-ID")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
