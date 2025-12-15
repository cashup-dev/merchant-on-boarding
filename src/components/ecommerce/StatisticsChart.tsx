"use client";
import React, { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { toast } from "sonner";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type ProductChartData = {
  name: string;
  stock: number;
};

export default function StatisticsChart() {
  const [data, setData] = useState<ProductChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStock = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/products");
        const json = await res.json();
        if (!res.ok) throw new Error(json.message || "Failed to fetch products");

        const products = (json.data || []) as any[];
        const chartData = products.map((p) => ({
          name: p.name,
          stock: Number(p.stock) || 0,
        }));

        setData(chartData);
      } catch (err: any) {
        toast.error("Gagal ambil data stok produk", { description: err.message });
      } finally {
        setLoading(false);
      }
    };

    fetchStock();
  }, []);

  const options: ApexOptions = {
    legend: { show: false },
    colors: ["#465FFF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        borderRadius: 6,
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: data.map((item) => item.name),
      labels: { rotate: -30, style: { fontSize: "12px" } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { fontSize: "12px", colors: ["#6B7280"] },
        formatter: (val) => Math.floor(val).toString(),
      },
      title: { text: "Stock", style: { fontSize: "12px" } },
    },
    tooltip: {
      y: { formatter: (val) => `${val} pcs` },
    },
    grid: {
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Product Stock Overview
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Quick look at current stock per product
          </p>
        </div>
      </div>

      {loading ? (
        <div className="h-[310px] flex items-center justify-center">
          <p>Memuat data...</p>
        </div>
      ) : (
        <div className="max-w-full overflow-x-auto custom-scrollbar">
          <div className="min-w-[600px] xl:min-w-full">
            <ReactApexChart
              options={options}
              series={[
                {
                  name: "Stock",
                  data: data.map((item) => item.stock),
                },
              ]}
              type="bar"
              height={310}
            />
          </div>
        </div>
      )}
    </div>
  );
}
