"use client";

import React, { useMemo, useState } from "react";
import { Check, Eye, Pencil, Trash2, Plus, RefreshCw, Users, MoreHorizontal } from "lucide-react";
import DataTable from "@/components/table/DataTable";
import Badge from "@/components/ui/badge/Badge";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";

type UserDefinition = {
  username: string;
  name: string;
  email: string;
  enabled: boolean;
  role: string;
  createdAt: string;
};

type UserRow = UserDefinition & {
  rowNumber: number;
};

type ColumnKey = "username" | "name" | "email" | "enabled" | "role" | "createdAt";

const columnMenuItems: Array<{ key: ColumnKey; label: string }> = [
  { key: "username", label: "Username" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "enabled", label: "Enabled" },
  { key: "role", label: "Role" },
  { key: "createdAt", label: "Created At" },
];

const userDefinitions: UserDefinition[] = [
  {
    username: "admin",
    name: "Eki Prathama Ramdhani",
    email: "eq.petrucci@gmail.com",
    enabled: true,
    role: "Super Administrator",
    createdAt: "2024-09-28 19:35:57",
  },
  {
    username: "admin2",
    name: "Admin",
    email: "admin@mail.com",
    enabled: true,
    role: "Super Administrator",
    createdAt: "2024-09-28 19:35:57",
  },
  {
    username: "czadmin",
    name: "Admin Cashlez",
    email: "czadmin@gmail.com",
    enabled: true,
    role: "Super Administrator",
    createdAt: "2025-05-22 14:48:02",
  },
  {
    username: "bayucahyo",
    name: "Bayu Cahyonoo",
    email: "bayu@gmail.com",
    enabled: true,
    role: "Agent",
    createdAt: "2025-05-26 07:43:32",
  },
  {
    username: "sasongko",
    name: "Sasongko",
    email: "sasongko@cashlez.com",
    enabled: true,
    role: "Super Administrator",
    createdAt: "2025-06-04 04:12:45",
  },
];

export default function UsersTable() {
  const [query, setQuery] = useState("");
  const [isColumnMenuOpen, setIsColumnMenuOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<Record<ColumnKey, boolean>>({
    username: true,
    name: true,
    email: true,
    enabled: true,
    role: true,
    createdAt: true,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const filteredUsers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return userDefinitions;
    return userDefinitions.filter((user) => {
      const haystack = `${user.username} ${user.name} ${user.email} ${user.role}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [query]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const tableData = useMemo(
    () =>
      currentUsers.map((user, index) => ({
        ...user,
        rowNumber: indexOfFirstItem + index + 1,
      })),
    [currentUsers, indexOfFirstItem],
  );

  const columns = useMemo(() => {
    const activeColumns = [
      {
        key: "rowNumber",
        header: "#",
        className: "w-16",
        render: (row: UserRow) => (
          <span className="text-gray-800 dark:text-white/90">
            {row.rowNumber}
          </span>
        ),
      },
    ];

    if (visibleColumns.username) {
      activeColumns.push({
        key: "username",
        header: "Username",
        className: "",
        render: (row: UserRow) => (
          <span className="text-gray-800 dark:text-white/90">
            {row.username}
          </span>
        ),
      });
    }

    if (visibleColumns.name) {
      activeColumns.push({
        key: "name",
        header: "Name",
        className: "w-72 whitespace-nowrap",
        render: (row: UserRow) => (
          <span className="text-gray-900 dark:text-white/90 font-medium">
            {row.name}
          </span>
        ),
      });
    }

    if (visibleColumns.email) {
      activeColumns.push({
        key: "email",
        header: "Email",
        className: "",
        render: (row: UserRow) => (
          <span className="text-gray-700 dark:text-gray-300">
            {row.email}
          </span>
        ),
      });
    }

    if (visibleColumns.enabled) {
      activeColumns.push({
        key: "enabled",
        header: "Enabled",
        className: "text-center",
        render: (row: UserRow) => (
          <div className="flex justify-center">
            <Badge color={row.enabled ? "success" : "dark"} size="sm">
              {row.enabled ? "Yes" : "No"}
            </Badge>
          </div>
        ),
      });
    }

    if (visibleColumns.role) {
      activeColumns.push({
        key: "role",
        header: "Role",
        className: "",
        render: (row: UserRow) => (
          <span className="text-gray-800 dark:text-white/90">{row.role}</span>
        ),
      });
    }

    if (visibleColumns.createdAt) {
      activeColumns.push({
        key: "createdAt",
        header: "Created At",
        className: "w-56 whitespace-nowrap",
        render: (row: UserRow) => (
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
      render: (row: UserRow) => (
        <div className="flex items-center justify-end gap-2 text-gray-500">
          <button
            type="button"
            className="rounded-full p-2 text-blue-600 transition hover:bg-blue-50"
            aria-label={`View ${row.username}`}
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="rounded-full p-2 text-yellow-600 transition hover:bg-yellow-50"
            aria-label={`Edit ${row.username}`}
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="rounded-full p-2 text-red-600 transition hover:bg-red-50"
            aria-label={`Delete ${row.username}`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
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
    <DataTable<UserRow>
      title="Users"
      subtitle="List of registered users"
      icon={<Users className="h-6 w-6 text-gray-600 dark:text-gray-300" />}
      data={tableData}
      rowKey={(row) => row.username}
      maxBodyHeight="348px"
      search={{
        value: query,
        onChange: setQuery,
        placeholder: "Search...",
      }}
      actions={
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center border-gray-200 bg-white text-gray-600 transition hover:border-gray-300 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
            aria-label="Add user"
          >
            <Plus className="h-5 w-5" />
          </button>
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
      emptyMessage="No users found."
      pagination={{
        currentPage,
        itemsPerPage,
        totalItems: filteredUsers.length,
        onPageChange: setCurrentPage,
        onItemsPerPageChange: setItemsPerPage,
      }}
    />
  );
}
