"use client";

import Link from "next/link";
import React, { useMemo, useState } from "react";
import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  PhoneIcon,
  PencilIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { Store } from "lucide-react";
import DataTable from "@/components/table/DataTable";

type MerchantStatus = "New" | "Contacted" | "Pending Docs" | "Submitted" | "Approved";

type MerchantRow = {
  id: number;
  name: string;
  owner: string;
  city: string;
  status: MerchantStatus;
  submittedDate: string;
};

const dummyMerchants: MerchantRow[] = [
  {
    id: 101,
    name: "Toko Nusantara",
    owner: "Rina Lestari",
    city: "Jakarta",
    status: "New",
    submittedDate: "2026-01-08T09:20:00",
  },
  {
    id: 102,
    name: "Warung Bu Sari",
    owner: "Sari Wulandari",
    city: "Bandung",
    status: "Contacted",
    submittedDate: "2026-01-06T08:40:00",
  },
  {
    id: 103,
    name: "Bengkel Maju Jaya",
    owner: "Tono Saputra",
    city: "Surabaya",
    status: "Pending Docs",
    submittedDate: "2026-01-05T11:15:00",
  },
  {
    id: 104,
    name: "Kedai Kopi Senja",
    owner: "Dina Pratama",
    city: "Jakarta",
    status: "Submitted",
    submittedDate: "2026-01-03T13:05:00",
  },
  {
    id: 105,
    name: "Apotek Sehat",
    owner: "Rudi Hartono",
    city: "Semarang",
    status: "Approved",
    submittedDate: "2025-12-28T10:30:00",
  },
  {
    id: 106,
    name: "Laundry Bersih",
    owner: "Mega Putri",
    city: "Bandung",
    status: "Contacted",
    submittedDate: "2026-01-04T14:25:00",
  },
  {
    id: 107,
    name: "Toko Elektronik Sentral",
    owner: "Yusuf Rahman",
    city: "Jakarta",
    status: "Pending Docs",
    submittedDate: "2026-01-02T09:05:00",
  },
  {
    id: 108,
    name: "Salon Anggun",
    owner: "Putri Amalia",
    city: "Surabaya",
    status: "Approved",
    submittedDate: "2025-12-30T16:10:00",
  },
];

const statusBadge: Record<MerchantStatus, string> = {
  New: "bg-slate-100 text-slate-700",
  Contacted: "bg-blue-100 text-blue-700",
  "Pending Docs": "bg-yellow-100 text-yellow-700",
  Submitted: "bg-indigo-100 text-indigo-700",
  Approved: "bg-emerald-100 text-emerald-700",
};

export default function SalesMerchantsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<MerchantStatus | "All">("All");
  const [cityFilter, setCityFilter] = useState("All");

  const filteredMerchants = useMemo(() => {
    return dummyMerchants.filter((merchant) => {
      const matchesSearch =
        merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        merchant.owner.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All" || merchant.status === statusFilter;
      const matchesCity = cityFilter === "All" || merchant.city === cityFilter;
      return matchesSearch && matchesStatus && matchesCity;
    });
  }, [searchTerm, statusFilter, cityFilter]);

  const handleDownload = () => {
    const header = ["ID", "Merchant", "Owner", "City", "Status", "Submitted At"];
    const rows = filteredMerchants.map((merchant) => [
      merchant.id,
      merchant.name,
      merchant.owner,
      merchant.city,
      merchant.status,
      merchant.submittedDate,
    ]);
    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "sales-merchants.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const cities = ["All", "Jakarta", "Bandung", "Surabaya", "Semarang"];

  return (
    <DataTable
      title="My Merchants"
      subtitle="Assigned merchants for sales follow-up."
      icon={<Store className="h-7 w-7 text-gray-700 dark:text-gray-300" />}
      data={filteredMerchants}
      rowKey={(row) => row.id}
      search={{
        value: searchTerm,
        onChange: setSearchTerm,
        placeholder: "Search merchant or owner...",
      }}
      filters={[
        {
          label: "Status",
          value: statusFilter,
          onChange: (value) => setStatusFilter(value as MerchantStatus | "All"),
          options: [
            { label: "All Status", value: "All" },
            { label: "New", value: "New" },
            { label: "Contacted", value: "Contacted" },
            { label: "Pending Docs", value: "Pending Docs" },
            { label: "Submitted", value: "Submitted" },
            { label: "Approved", value: "Approved" },
          ],
        },
        {
          label: "City",
          value: cityFilter,
          onChange: setCityFilter,
          options: cities.map((city) => ({ label: city, value: city })),
        },
      ]}
      actions={
        <>
          <button
            onClick={handleDownload}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
            title="Download CSV"
            type="button"
          >
            <ArrowDownTrayIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
            title="Refresh"
            type="button"
          >
            <ArrowPathIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
        </>
      }
      columns={[
        {
          key: "merchant",
          header: "Merchant",
          render: (merchant) => (
            <div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                {merchant.name}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Submitted{" "}
                {new Date(merchant.submittedDate).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </div>
          ),
        },
        {
          key: "owner",
          header: "Owner",
          render: (merchant) => (
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {merchant.owner}
            </span>
          ),
        },
        {
          key: "city",
          header: "City",
          render: (merchant) => (
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {merchant.city}
            </span>
          ),
        },
        {
          key: "status",
          header: "Status",
          render: (merchant) => (
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusBadge[merchant.status]}`}>
              {merchant.status}
            </span>
          ),
        },
        {
          key: "submittedAt",
          header: "Submitted At",
          render: (merchant) => (
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {new Date(merchant.submittedDate).toLocaleString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </span>
          ),
        },
        {
          key: "actions",
          header: "Actions",
          render: (merchant) => (
            <div className="flex items-center gap-2">
              <Link
                href={`/sales/merchants/${merchant.id}`}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-blue-950/20 dark:hover:text-blue-400"
                title="View"
              >
                <EyeIcon className="h-5 w-5" />
              </Link>
              <button
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-emerald-50 hover:text-emerald-600 dark:text-gray-400 dark:hover:bg-emerald-950/20 dark:hover:text-emerald-400"
                title="Call"
                type="button"
              >
                <PhoneIcon className="h-5 w-5" />
              </button>
              <button
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-yellow-50 hover:text-yellow-600 dark:text-gray-400 dark:hover:bg-yellow-950/20 dark:hover:text-yellow-400"
                title="Add Note"
                type="button"
              >
                <PencilIcon className="h-5 w-5" />
              </button>
            </div>
          ),
        },
      ]}
      emptyMessage="No merchants found for this filter."
    />
  );
}
