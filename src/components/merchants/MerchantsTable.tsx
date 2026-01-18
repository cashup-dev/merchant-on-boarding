"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  Download,
  Filter,
  Plus,
  RefreshCw,
  Settings,
  Upload,
  Eye,
  Pencil,
  Trash2,
  Lock,
  Store,
} from "lucide-react";
import DataTable from "@/components/table/DataTable";
import Badge from "@/components/ui/badge/Badge";

interface Merchant {
  id: number;
  name: string;
  sales: string;
  category: string;
  classification: string;
  approvalStatus: "Approved" | "Pending" | "Rejected";
  createdDate: string;
  isTesting: boolean;
}

type MerchantRow = Merchant & {
  rowNumber: number;
};

const dummyMerchants: Merchant[] = [
  {
    id: 1,
    name: "Decoupling Demo",
    sales: "-",
    category: "Miscellaneous and Specialty Retail Stores",
    classification: "Retail",
    approvalStatus: "Approved",
    createdDate: "2025-01-01",
    isTesting: false,
  },
  {
    id: 2,
    name: "Decoupling Simulator",
    sales: "-",
    category: "Miscellaneous and Specialty Retail Stores",
    classification: "Retail",
    approvalStatus: "Approved",
    createdDate: "2025-01-02",
    isTesting: false,
  },
  {
    id: 3,
    name: "Toko Elektronik Jaya",
    sales: "Sales A",
    category: "Electronics Stores",
    classification: "Retail",
    approvalStatus: "Approved",
    createdDate: "2025-01-03",
    isTesting: false,
  },
  {
    id: 4,
    name: "Warung Makan Sederhana",
    sales: "Sales B",
    category: "Restaurants and Food Services",
    classification: "F&B",
    approvalStatus: "Pending",
    createdDate: "2025-01-04",
    isTesting: false,
  },
  {
    id: 5,
    name: "Apotek Sehat Sentosa",
    sales: "-",
    category: "Drug Stores and Pharmacies",
    classification: "Healthcare",
    approvalStatus: "Approved",
    createdDate: "2025-01-05",
    isTesting: false,
  },
  {
    id: 6,
    name: "Minimarket 24 Jam",
    sales: "Sales C",
    category: "Grocery Stores and Supermarkets",
    classification: "Retail",
    approvalStatus: "Approved",
    createdDate: "2025-01-06",
    isTesting: false,
  },
  {
    id: 7,
    name: "Bengkel Motor Jaya",
    sales: "-",
    category: "Automotive Services",
    classification: "Services",
    approvalStatus: "Rejected",
    createdDate: "2025-01-07",
    isTesting: true,
  },
  {
    id: 8,
    name: "Salon Kecantikan Anggun",
    sales: "Sales D",
    category: "Beauty and Personal Care Services",
    classification: "Services",
    approvalStatus: "Approved",
    createdDate: "2025-01-08",
    isTesting: false,
  },
  {
    id: 9,
    name: "Toko Buku Cerdas",
    sales: "-",
    category: "Book Stores",
    classification: "Retail",
    approvalStatus: "Pending",
    createdDate: "2025-01-09",
    isTesting: true,
  },
  {
    id: 10,
    name: "Gym Fitness Center",
    sales: "Sales E",
    category: "Health and Fitness Services",
    classification: "Services",
    approvalStatus: "Approved",
    createdDate: "2025-01-10",
    isTesting: false,
  },
];

const statusToBadge = (
  status: Merchant["approvalStatus"],
): { color: "success" | "warning" | "error" | "dark"; label: string } => {
  switch (status) {
    case "Approved":
      return { color: "success", label: "Approved" };
    case "Pending":
      return { color: "warning", label: "Pending" };
    case "Rejected":
      return { color: "error", label: "Rejected" };
    default:
      return { color: "dark", label: status };
  }
};

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const MerchantsTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const filteredMerchants = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    if (!normalized) return dummyMerchants;
    return dummyMerchants.filter((merchant) =>
      `${merchant.name} ${merchant.sales} ${merchant.category}`
        .toLowerCase()
        .includes(normalized),
    );
  }, [searchTerm]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMerchants = filteredMerchants.slice(indexOfFirstItem, indexOfLastItem);

  const tableData = useMemo(
    () =>
      currentMerchants.map((merchant, index) => ({
        ...merchant,
        rowNumber: indexOfFirstItem + index + 1,
      })),
    [currentMerchants, indexOfFirstItem],
  );

  return (
    <DataTable<MerchantRow>
      title="Merchants"
      subtitle="List of registered merchants"
      icon={<Store className="text-gray-700 dark:text-gray-300"/>}
      data={tableData}
      rowKey={(row) => row.id}
      maxBodyHeight="348px"
      search={{
        value: searchTerm,
        onChange: setSearchTerm,
        placeholder: "Search...",
      }}
      actions={
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/merchants/create"
            className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 transition hover:border-gray-300 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
            aria-label="Add merchant"
          >
            <Plus className="h-5 w-5" />
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 transition hover:border-gray-300 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
            aria-label="Upload"
          >
            <Upload className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 transition hover:border-gray-300 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
            aria-label="Download"
          >
            <Download className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 transition hover:border-gray-300 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
            aria-label="Filter"
          >
            <Filter className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 transition hover:border-gray-300 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
            aria-label="Refresh"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 transition hover:border-gray-300 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
            aria-label="Settings"
          >
            <Settings className="h-5 w-5" />
          </button>
        </div>
      }
      columns={[
        {
          key: "rowNumber",
          header: "#",
          className: "w-16",
          render: (row) => (
            <span className="text-gray-800 dark:text-white/90">
              {row.rowNumber}
            </span>
          ),
        },
        {
          key: "name",
          header: "Name",
          className: "w-72 whitespace-nowrap",
          render: (row) => (
            <span className="text-gray-900 dark:text-white/90 font-medium">
              {row.name}
            </span>
          ),
        },
        {
          key: "sales",
          header: "Sales",
          className: "whitespace-nowrap",
          render: (row) => (
            <span className="text-gray-700 dark:text-gray-300">
              {row.sales}
            </span>
          ),
        },
        {
          key: "category",
          header: "Category",
          className: "min-w-[220px]",
          render: (row) => (
            <span className="text-gray-700 dark:text-gray-300">
              {row.category}
            </span>
          ),
        },
        {
          key: "classification",
          header: "Classification",
          className: "whitespace-nowrap",
          render: (row) => (
            <span className="text-gray-700 dark:text-gray-300">
              {row.classification}
            </span>
          ),
        },
        {
          key: "approvalStatus",
          header: "Approval Status",
          className: "whitespace-nowrap",
          render: (row) => {
            const badge = statusToBadge(row.approvalStatus);
            return (
              <Badge color={badge.color} size="sm">
                {badge.label}
              </Badge>
            );
          },
        },
        {
          key: "createdDate",
          header: "Created",
          className: "whitespace-nowrap",
          render: (row) => (
            <span className="text-gray-600 dark:text-gray-300">
              {formatDate(row.createdDate)}
            </span>
          ),
        },
        {
          key: "isTesting",
          header: "Is Merchant Testing",
          className: "whitespace-nowrap",
          render: (row) => (
            <Badge color={row.isTesting ? "warning" : "light"} size="sm">
              {row.isTesting ? "Yes" : "No"}
            </Badge>
          ),
        },
        {
          key: "actions",
          header: "Actions",
          className: "text-right",
          render: (row) => (
            <div className="flex items-center justify-end gap-2 text-gray-500">
              <Link
                href={`/merchants/${row.id}`}
                className="rounded-full p-2 text-blue-600 transition hover:bg-blue-50"
                aria-label={`View ${row.name}`}
              >
                <Eye className="h-4 w-4" />
              </Link>
              <Link
                href={`/merchants/${row.id}/edit`}
                className="rounded-full p-2 text-yellow-600 transition hover:bg-yellow-50"
                aria-label={`Edit ${row.name}`}
              >
                <Pencil className="h-4 w-4" />
              </Link>
              <button
                type="button"
                className="rounded-full p-2 text-red-600 transition hover:bg-red-50"
                aria-label={`Delete ${row.name}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="rounded-full p-2 text-gray-600 transition hover:bg-gray-100"
                aria-label={`Lock ${row.name}`}
              >
                <Lock className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="rounded-full p-2 text-gray-600 transition hover:bg-gray-100"
                aria-label={`Download ${row.name}`}
              >
                <Download className="h-4 w-4" />
              </button>
            </div>
          ),
        },
      ]}
      emptyMessage="No merchants found."
      pagination={{
        currentPage,
        itemsPerPage,
        totalItems: filteredMerchants.length,
        onPageChange: setCurrentPage,
        onItemsPerPageChange: setItemsPerPage,
      }}
    />
  );
};

export default MerchantsTable;
