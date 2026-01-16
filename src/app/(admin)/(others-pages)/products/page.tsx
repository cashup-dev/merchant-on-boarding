"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Badge from "@/components/ui/badge/Badge";

type ProductForm = {
  name: string;
  price: string;
  stock: string;
  status: "active" | "inactive";
  description: string;
};

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  status: "active" | "inactive";
  description?: string;
  createdAt?: string;
  updatedAt?: string;
};

const emptyForm: ProductForm = {
  name: "",
  price: "",
  stock: "",
  status: "active",
  description: "",
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Failed to load products");
      setProducts(json.data || []);
    } catch (err: any) {
      toast.error("Gagal mengambil data produk", { description: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      };

      const res = await fetch(
        editingId ? `/api/products/${editingId}` : "/api/products",
        {
          method: editingId ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Gagal menyimpan produk");

      toast.success(editingId ? "Produk diperbarui" : "Produk ditambahkan");
      resetForm();
      await loadProducts();
    } catch (err: any) {
      toast.error("Gagal menyimpan produk", { description: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      price: product.price.toString(),
      stock: product.stock.toString(),
      status: product.status,
      description: product.description || "",
    });
  };

  const handleDelete = async (product: Product) => {
    if (!confirm(`Hapus produk "${product.name}"?`)) return;
    try {
      const res = await fetch(`/api/products/${product.id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Gagal menghapus produk");
      toast.success("Produk dihapus");
      await loadProducts();
    } catch (err: any) {
      toast.error("Gagal menghapus produk", { description: err.message });
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white/90">
              Products
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Contoh CRUD (GET, POST, PATCH, DELETE) untuk backoffice.
            </p>
          </div>
          {editingId && (
            <button
              className="text-sm text-blue-600 hover:underline"
              onClick={resetForm}
              type="button"
            >
              Batalkan edit
            </button>
          )}
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600 dark:text-gray-300">Nama Produk</label>
            <input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="rounded-lg border border-gray-200 px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
              placeholder="e.g. Card Reader"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600 dark:text-gray-300">Harga</label>
            <input
              type="number"
              min={0}
              value={form.price}
              onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
              className="rounded-lg border border-gray-200 px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
              placeholder="1500000"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600 dark:text-gray-300">Stok</label>
            <input
              type="number"
              min={0}
              value={form.stock}
              onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
              className="rounded-lg border border-gray-200 px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
              placeholder="25"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600 dark:text-gray-300">Status</label>
            <select
              value={form.status}
              onChange={(e) =>
                setForm((f) => ({ ...f, status: e.target.value as "active" | "inactive" }))
              }
              className="rounded-lg border border-gray-200 px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-sm text-gray-600 dark:text-gray-300">Deskripsi</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className="rounded-lg border border-gray-200 px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
              placeholder="Catatan produk"
              rows={2}
            />
          </div>

          <div className="md:col-span-2 flex gap-3 justify-end">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-white"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {saving ? "Menyimpan..." : editingId ? "Update Produk" : "Tambah Produk"}
            </button>
          </div>
        </form>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white/90">Daftar Produk</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              GET dari <code>/api/products</code>; aksi edit pakai PATCH; hapus pakai DELETE.
            </p>
          </div>
        </div>

        {loading ? (
          <p>Memuat data...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">Belum ada produk.</p>
        ) : (
          <div className="max-w-full overflow-x-auto">
            <Table>
              <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
                <TableRow>
                  <TableHead className="py-3 pl-5 text-left text-gray-500 text-theme-xs">
                    Produk
                  </TableHead>
                  <TableHead className="py-3 text-left text-gray-500 text-theme-xs">
                    Harga
                  </TableHead>
                  <TableHead className="py-3 text-left text-gray-500 text-theme-xs">
                    Stok
                  </TableHead>
                  <TableHead className="py-3 text-left text-gray-500 text-theme-xs">
                    Status
                  </TableHead>
                  <TableHead className="py-3 text-left text-gray-500 text-theme-xs">
                    Aksi
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="py-3 pl-5 text-gray-800 dark:text-white/90 font-medium">
                      {product.name}
                      <div className="text-gray-500 text-sm dark:text-gray-400">
                        {product.description || "-"}
                      </div>
                    </TableCell>
                    <TableCell className="py-3 text-gray-800 dark:text-white/90">
                      Rp{product.price.toLocaleString("id-ID")}
                    </TableCell>
                    <TableCell className="py-3 text-gray-800 dark:text-white/90">
                      {product.stock.toLocaleString("id-ID")}
                    </TableCell>
                    <TableCell className="py-3">
                      <Badge size="sm" color={product.status === "active" ? "success" : "dark"}>
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3 space-x-2">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => handleEdit(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => handleDelete(product)}
                      >
                        Hapus
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
