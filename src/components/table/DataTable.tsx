"use client";

import React from "react";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type TableColumn<T> = {
  key: string;
  header: string;
  className?: string;
  render?: (row: T) => React.ReactNode;
};

type TableSearch = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

type TableFilter = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ label: string; value: string }>;
};

type DataTableProps<T> = {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  columns: Array<TableColumn<T>>;
  data: Array<T>;
  rowKey: (row: T, index: number) => string | number;
  search?: TableSearch;
  filters?: Array<TableFilter>;
  actions?: React.ReactNode;
  emptyMessage?: string;
};

export default function DataTable<T>({
  title,
  subtitle,
  icon,
  columns,
  data,
  rowKey,
  search,
  filters,
  actions,
  emptyMessage = "No data found.",
}: DataTableProps<T>) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="border-b border-gray-200 p-6 dark:border-gray-800">
        <div className="flex items-center gap-4">
          {icon ? (
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
              {icon}
            </div>
          ) : null}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
            {subtitle ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
            ) : null}
          </div>
        </div>
      </div>

      {(search || (filters && filters.length) || actions) && (
        <div className="border-b border-gray-200 p-6 dark:border-gray-800">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {search ? (
              <div className="relative w-full lg:w-96">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder={search.placeholder ?? "Search..."}
                  value={search.value}
                  onChange={(event) => search.onChange(event.target.value)}
                  className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
                />
              </div>
            ) : (
              <div />
            )}

            <div className="flex flex-wrap items-center gap-2">
              {filters?.map((filter) => (
                <div
                  key={filter.label}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 dark:border-gray-800"
                >
                  <FunnelIcon className="h-4 w-4 text-gray-500" />
                  <select
                    value={filter.value}
                    onChange={(event) => filter.onChange(event.target.value)}
                    className="bg-transparent text-sm text-gray-700 focus:outline-none dark:text-gray-200"
                  >
                    {filter.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
              {actions}
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 ${column.className ?? ""}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {data.map((row, index) => (
              <tr
                key={rowKey(row, index)}
                className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-900/30"
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4">
                    {column.render ? column.render(row) : (row as Record<string, React.ReactNode>)[column.key]}
                  </td>
                ))}
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td className="px-6 py-10 text-center text-sm text-gray-500" colSpan={columns.length}>
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
