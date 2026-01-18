"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  Shield,
  KeyRound,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

type PermissionAction = "access" | "view" | "create" | "update" | "delete";

type PermissionModule = {
  key: string;
  rows: string[];
};

const permissionActions: Array<{ key: PermissionAction; label: string }> = [
  { key: "access", label: "Access" },
  { key: "view", label: "View" },
  { key: "create", label: "Create" },
  { key: "update", label: "Update" },
  { key: "delete", label: "Delete" },
];

const permissionModules: PermissionModule[] = [
  {
    key: "general",
    rows: ["Cz Event", "Agent", "Aggregator", "Dealer"],
  },
  {
    key: "simulator",
    rows: ["Terminal", "Load Test", "Scenario"],
  },
  {
    key: "inventory",
    rows: ["Devices", "Spare Parts", "Warehouses"],
  },
  {
    key: "administration",
    rows: ["Users", "Roles", "Teams"],
  },
  {
    key: "fraud",
    rows: ["Alerts", "Rules", "Investigations"],
  },
  {
    key: "transaction",
    rows: ["Payments", "Refunds", "Disputes"],
  },
];

const buildInitialPermissions = () => {
  const initial: Record<string, Record<string, Record<PermissionAction, boolean>>> = {};
  permissionModules.forEach((module) => {
    initial[module.key] = {};
    module.rows.forEach((row) => {
      initial[module.key][row] = {
        access: false,
        view: false,
        create: false,
        update: false,
        delete: false,
      };
    });
  });
  return initial;
};

export default function CreateRolePage() {
  const [permissions, setPermissions] = useState(buildInitialPermissions);

  const allRows = useMemo(
    () => permissionModules.flatMap((module) => module.rows),
    [],
  );

  const togglePermission = (row: string, action: PermissionAction, value: boolean) => {
    setPermissions((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((moduleKey) => {
        if (row in updated[moduleKey]) {
          updated[moduleKey] = {
            ...updated[moduleKey],
            [row]: {
              ...updated[moduleKey][row],
              [action]: value,
            },
          };
        }
      });
      return updated;
    });
  };

  const handleSelectAll = () => {
    setPermissions((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((moduleKey) => {
        const moduleRows = { ...updated[moduleKey] };
        Object.keys(moduleRows).forEach((rowKey) => {
          moduleRows[rowKey] = {
            access: true,
            view: true,
            create: true,
            update: true,
            delete: true,
          };
        });
        updated[moduleKey] = moduleRows;
      });
      return updated;
    });
  };

  const handleReverseSelection = () => {
    setPermissions((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((moduleKey) => {
        const moduleRows = { ...updated[moduleKey] };
        Object.keys(moduleRows).forEach((rowKey) => {
          const current = moduleRows[rowKey];
          moduleRows[rowKey] = {
            access: !current.access,
            view: !current.view,
            create: !current.create,
            update: !current.update,
            delete: !current.delete,
          };
        });
        updated[moduleKey] = moduleRows;
      });
      return updated;
    });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex flex-col gap-4 border-b border-gray-200 px-6 py-5 dark:border-gray-800 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white/90">
                Role Management
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Configure role permissions as per your requirement
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/access-control/roles"
              className="text-sm font-semibold text-gray-500 hover:text-gray-700 dark:text-gray-400"
            >
              Cancel
            </Link>
            <button
              type="button"
              className="rounded-lg bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700"
            >
              Save
            </button>
          </div>
        </div>

        <div className="grid gap-6 px-6 py-6 lg:grid-cols-[320px_1fr]">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                ID
              </label>
              <input
                type="text"
                placeholder="superman"
                className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-900 shadow-xs focus:border-gray-300 focus:outline-none dark:border-gray-800 dark:bg-gray-900 dark:text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Title
              </label>
              <input
                type="text"
                placeholder="Super Human"
                className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-900 shadow-xs focus:border-gray-300 focus:outline-none dark:border-gray-800 dark:bg-gray-900 dark:text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Guard
              </label>
              <input
                type="text"
                placeholder="web"
                className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-900 shadow-xs focus:border-gray-300 focus:outline-none dark:border-gray-800 dark:bg-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 bg-gray-50/40 p-5 dark:border-gray-800 dark:bg-gray-900/30">
            <div className="flex flex-col gap-4 border-b border-gray-200 pb-4 dark:border-gray-800 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-sm dark:bg-gray-900 dark:text-gray-200">
                  <KeyRound className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-gray-900 dark:text-white/90">
                    Permissions
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Adjust the permissions for current role.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200"
                >
                  Select All
                </button>
                <button
                  type="button"
                  onClick={handleReverseSelection}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200"
                >
                  Reverse Selection
                </button>
              </div>
            </div>

            <div className="mt-5 overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
              <div className="max-h-[360px] overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-600 dark:bg-gray-900/60 dark:text-gray-300">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Module</th>
                    {permissionActions.map((action) => (
                      <th key={action.key} className="px-4 py-3 text-center font-semibold">
                        {action.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700 dark:divide-gray-800 dark:text-gray-200">
                  {allRows.map((row) => (
                    <tr key={row}>
                      <td className="px-4 py-3 font-medium">{row}</td>
                      {permissionActions.map((action) => {
                        const moduleKey =
                          permissionModules.find((module) => module.rows.includes(row))?.key ?? "general";
                        return (
                          <td key={action.key} className="px-4 py-3 text-center">
                            <Checkbox
                              checked={permissions[moduleKey][row][action.key]}
                              onCheckedChange={(value) =>
                                togglePermission(row, action.key, value === true)
                              }
                            />
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
