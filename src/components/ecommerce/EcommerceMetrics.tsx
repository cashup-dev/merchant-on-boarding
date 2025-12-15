"use client";
import React, { useEffect, useState } from "react";
import { CheckCircleIcon } from "@/icons";
import { Activity, Package, ShieldX } from "lucide-react";

type ProductStats = {
  totalProducts: number;
  activeProducts: number;
  inactiveProducts: number;
  lowStock: number;
};

export const EcommerceMetrics = () => {
  const [stats, setStats] = useState<ProductStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/products");
        const json = await res.json();
        
        if (!res.ok) throw new Error(json.message || "Failed to fetch products");
        
        const products = json.data || [];
        const totalProducts = products.length;
        const activeProducts = products.filter((p: any) => p.status === "active").length;
        const inactiveProducts = products.filter((p: any) => p.status === "inactive").length;
        const lowStock = products.filter((p: any) => Number(p.stock) < 20).length;

        setStats({
          totalProducts,
          activeProducts,
          inactiveProducts,
          lowStock,
        });
      } catch (err: any) {
        setError(err.message);
        console.error("Failed to fetch product stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div className="animate-pulse">
              <div className="w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800"></div>
              <div className="mt-5 space-y-3">
                <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                <div className="h-6 bg-gray-100 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <p>No data available</p>
      </div>
    );
  }

  // TODO: we may need to calculate changes for each metric
  // const activePromosChange = 5.2; // Example percentage
  // const successChange = Math.round((stats.successRate - 85) * 10) / 10; // Example calculation
  // const failureChange = -2.4; // Example percentage
  // const totalChange = 8.7; // Example percentage

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* Active Promos Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <Package className="text-amber-400 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Total Products
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {stats.totalProducts.toLocaleString()}
            </h4>
          </div>
        </div>
      </div>

      {/* Active Products Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <CheckCircleIcon className="text-green-600 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Active Products
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {stats.activeProducts.toLocaleString()}
            </h4>
          </div>
        </div>
      </div>

      {/* Inactive Products Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <ShieldX className="text-red-400 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Inactive Products
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {stats.inactiveProducts.toLocaleString()}
            </h4>
          </div>
        </div>
      </div>

      {/* Low Stock Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <Activity className="text-blue-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Low Stock (&lt; 20)
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {stats.lowStock.toLocaleString()}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};
