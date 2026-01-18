"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Check, MoreHorizontal, Pencil, Plus, RefreshCw, Shield, Trash2, Users } from "lucide-react";
import DataTable from "@/components/table/DataTable";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";

type RoleDefinition = {
  id: string;
  title: string;
  createdAt: string;
  canDelete?: boolean;
};

type RoleRow = RoleDefinition & {
  rowNumber: number;
};

type ColumnKey = "id" | "title" | "createdAt";

const columnMenuItems: Array<{ key: ColumnKey; label: string }> = [
  { key: "id", label: "ID" },
  { key: "title", label: "Title" },
  { key: "createdAt", label: "Created At" },
];

const roleDefinitions: RoleDefinition[] = [
  {
    id: "super-admin",
    title: "Super Administrator",
    createdAt: "2024-09-28 15:30:39",
  },
  {
    id: "admin",
    title: "Administrator",
    createdAt: "2024-09-28 15:30:39",
    canDelete: true,
  },
  {
    id: "risk",
    title: "Risk",
    createdAt: "2025-04-15 20:07:19",
    canDelete: true,
  },
  {
    id: "operation",
    title: "Operation",
    createdAt: "2025-04-15 20:07:46",
    canDelete: true,
  },
  {
    id: "merchant",
    title: "Merchant",
    createdAt: "2025-04-15 20:07:44",
    canDelete: true,
  },
  {
    id: "support",
    title: "Support",
    createdAt: "2025-05-01 09:12:10",
    canDelete: true,
  },
  {
    id: "finance",
    title: "Finance",
    createdAt: "2025-05-02 11:45:32",
    canDelete: true,
  },
  {
    id: "audit",
    title: "Audit",
    createdAt: "2025-05-03 14:22:05",
    canDelete: true,
  },
  {
    id: "compliance",
    title: "Compliance",
    createdAt: "2025-05-04 16:08:49",
    canDelete: true,
  },
  {
    id: "risk-ops",
    title: "Risk Ops",
    createdAt: "2025-05-05 10:30:21",
    canDelete: true,
  },
  {
    id: "partner-admin",
    title: "Partner Admin",
    createdAt: "2025-05-06 13:54:11",
    canDelete: true,
  },
  {
    id: "partner-viewer",
    title: "Partner Viewer",
    createdAt: "2025-05-07 08:19:37",
    canDelete: true,
  },
  {
    id: "ops-lead",
    title: "Operations Lead",
    createdAt: "2025-05-08 17:02:58",
    canDelete: true,
  },
  {
    id: "ops-analyst",
    title: "Operations Analyst",
    createdAt: "2025-05-09 12:47:16",
    canDelete: true,
  },
  {
    id: "sales-lead",
    title: "Sales Lead",
    createdAt: "2025-05-10 09:35:42",
    canDelete: true,
  },
  {
    id: "sales-executive",
    title: "Sales Executive",
    createdAt: "2025-05-11 15:26:03",
    canDelete: true,
  },
  {
    id: "merchant-ops",
    title: "Merchant Ops",
    createdAt: "2025-05-12 11:14:27",
    canDelete: true,
  },
  {
    id: "merchant-support",
    title: "Merchant Support",
    createdAt: "2025-05-13 18:09:55",
    canDelete: true,
  },
  {
    id: "integration",
    title: "Integration",
    createdAt: "2025-05-14 10:58:44",
    canDelete: true,
  },
  {
    id: "read-only",
    title: "Read Only",
    createdAt: "2025-05-15 07:41:12",
    canDelete: true,
  },
];

export default function RolesTable() {
  const [query, setQuery] = useState("");
  const [isColumnMenuOpen, setIsColumnMenuOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<Record<ColumnKey, boolean>>({
    id: true,
    title: true,
    createdAt: true,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const filteredRoles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return roleDefinitions;
    return roleDefinitions.filter((role) => {
      const haystack = `${role.id} ${role.title}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [query]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRoles = filteredRoles.slice(indexOfFirstItem, indexOfLastItem);

  const tableData = useMemo(
    () =>
      currentRoles.map((role, index) => ({
        ...role,
        rowNumber: indexOfFirstItem + index + 1,
      })),
    [currentRoles, indexOfFirstItem],
  );

  const columns = useMemo(() => {
    const activeColumns = [
      {
        key: "rowNumber",
        header: "#",
        className: "w-16",
        render: (row: RoleRow) => (
          <span className="text-gray-800 dark:text-white/90">
            {row.rowNumber}
          </span>
        ),
      },
    ];

    if (visibleColumns.id) {
      activeColumns.push({
        key: "id",
        header: "ID",
        className: "",
        render: (row: RoleRow) => (
          <span className="text-gray-800 dark:text-white/90">{row.id}</span>
        ),
      });
    }

    if (visibleColumns.title) {
      activeColumns.push({
        key: "title",
        header: "Title",
        className: "",
        render: (row: RoleRow) => (
          <span className="font-medium text-gray-900 dark:text-white/90">
            {row.title}
          </span>
        ),
      });
    }

    if (visibleColumns.createdAt) {
      activeColumns.push({
        key: "createdAt",
        header: "Created At",
        className: "",
        render: (row: RoleRow) => (
          <span className="text-gray-600 dark:text-gray-300">
            {row.createdAt}
          </span>
        ),
      });
    }

    activeColumns.push({
      key: "actions",
      header: "Actions",
      className: "text-right",
      render: (row: RoleRow) => (
        <div className="flex items-center justify-end gap-3 text-gray-500">
          <button
            type="button"
            className="rounded-full p-2 text-yellow-600 transition hover:bg-yellow-50"
            aria-label={`Edit ${row.title}`}
          >
            <Pencil className="h-4 w-4" />
          </button>
          {row.canDelete && (
            <button
              type="button"
              className="rounded-full p-2 text-red-600 transition hover:bg-red-50"
              aria-label={`Delete ${row.title}`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      ),
    });

    return activeColumns;
  }, [visibleColumns]);

  const toggleColumn = (key: ColumnKey) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <DataTable<RoleRow>
      title="Role Management"
      subtitle="List of available roles"
      icon={<Shield className="h-6 w-6 text-gray-600 dark:text-gray-300" />}
      data={tableData}
      rowKey={(row) => row.id}
      maxBodyHeight="348px"
      search={{
        value: query,
        onChange: setQuery,
        placeholder: "Search...",
      }}
      actions={
        <div className="flex items-center gap-3">
          <Link
            href="/access-control/roles/create"
            className="flex h-10 w-10 items-center justify-center border-gray-200 bg-white text-gray-600 transition hover:border-gray-300 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
            aria-label="Add role"
          >
            <Plus className="h-5 w-5" />
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center border-gray-200 bg-white text-gray-600 transition hover:border-gray-300 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
            aria-label="Refresh"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
          <div className="relative">
            <button
              type="button"
              className="dropdown-toggle flex h-10 w-10 items-center justify-center border-gray-200 bg-white text-gray-600 transition hover:border-gray-300 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
              aria-label="Show columns"
              onClick={() => setIsColumnMenuOpen((prev) => !prev)}
            >
              <MoreHorizontal className="h-5 w-5" />
            </button>
            <Dropdown
              isOpen={isColumnMenuOpen}
              onClose={() => setIsColumnMenuOpen(false)}
              className="w-56 py-2"
            >
              {columnMenuItems.map((item) => {
                const isActive = visibleColumns[item.key];
                return (
                  <DropdownItem
                    key={item.key}
                    onClick={() => toggleColumn(item.key)}
                    baseClassName="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-md border ${
                        isActive
                          ? "border-transparent text-indigo-600"
                          : "border-gray-200 text-transparent"
                      }`}
                    >
                      <Check className="h-4 w-4" />
                    </span>
                    <span>{item.label}</span>
                  </DropdownItem>
                );
              })}
            </Dropdown>
          </div>
        </div>
      }
      columns={columns}
      emptyMessage="No roles found."
      pagination={{
        currentPage,
        itemsPerPage,
        totalItems: filteredRoles.length,
        onPageChange: setCurrentPage,
        onItemsPerPageChange: setItemsPerPage,
      }}
    />
  );
}
