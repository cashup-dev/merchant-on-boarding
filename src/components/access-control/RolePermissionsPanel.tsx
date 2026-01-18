"use client";

import React, { useMemo, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

type PermissionItem = {
  id: string;
  label: string;
};

type PermissionGroup = {
  title: string;
  description: string;
  items: PermissionItem[];
};

const permissionGroups: PermissionGroup[] = [
  {
    title: "Access Control",
    description: "Manage roles, users, and access policies.",
    items: [
      { id: "roles:read", label: "View roles" },
      { id: "roles:write", label: "Create or edit roles" },
      { id: "users:read", label: "View users" },
      { id: "users:write", label: "Create or edit users" },
    ],
  },
  {
    title: "Merchants",
    description: "Access merchant data and operational actions.",
    items: [
      { id: "merchants:read", label: "View merchant list" },
      { id: "merchants:write", label: "Update merchant data" },
      { id: "merchants:verify", label: "Verify merchant documents" },
      { id: "merchants:archive", label: "Archive merchants" },
    ],
  },
  {
    title: "Onboarding",
    description: "Review and approve onboarding submissions.",
    items: [
      { id: "onboarding:read", label: "View onboarding progress" },
      { id: "onboarding:approve", label: "Approve onboarding" },
      { id: "onboarding:reject", label: "Reject onboarding" },
    ],
  },
  {
    title: "Reporting",
    description: "Read analytics and export data.",
    items: [
      { id: "reports:read", label: "View reports" },
      { id: "reports:export", label: "Export reports" },
    ],
  },
];

const initialPermissions = permissionGroups.flatMap((group) => group.items).reduce(
  (acc, item) => ({
    ...acc,
    [item.id]:
      item.id === "roles:read" ||
      item.id === "users:read" ||
      item.id === "merchants:read" ||
      item.id === "onboarding:read" ||
      item.id === "reports:read",
  }),
  {} as Record<string, boolean>,
);

export default function RolePermissionsPanel() {
  const [permissions, setPermissions] = useState<Record<string, boolean>>(
    () => initialPermissions,
  );

  const selectedCount = useMemo(
    () => Object.values(permissions).filter(Boolean).length,
    [permissions],
  );

  const handleToggle = (id: string, value: boolean) => {
    setPermissions((prev) => ({ ...prev, [id]: value }));
  };

  const handleReset = () => {
    setPermissions(initialPermissions);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex flex-col gap-3 border-b border-gray-200 px-6 py-5 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white/90">
            Role Permissions
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Assign permissions for the selected role.
          </p>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Active role: <span className="font-semibold text-gray-900 dark:text-white/90">Administrator</span>
          <span className="ml-2">({selectedCount} enabled)</span>
        </div>
      </div>

      <div className="p-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {permissionGroups.map((group) => (
            <div
              key={group.title}
              className="rounded-xl border border-gray-100 bg-gray-50/40 p-4 dark:border-gray-800 dark:bg-gray-900/30"
            >
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white/90">
                  {group.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {group.description}
                </p>
              </div>
              <div className="mt-4 space-y-3">
                {group.items.map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <Checkbox
                      checked={permissions[item.id]}
                      onCheckedChange={(value) => handleToggle(item.id, value === true)}
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-end gap-3 border-t border-gray-100 pt-4 dark:border-gray-800">
          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-900/50"
          >
            Reset
          </button>
          <button
            type="button"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
