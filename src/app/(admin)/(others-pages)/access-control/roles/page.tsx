import type { Metadata } from "next";
import React from "react";
import RolesTable from "@/components/access-control/RolesTable";

export const metadata: Metadata = {
  title: "Roles - Backoffice cashUP",
  description: "Role definitions and permission matrix",
};

export default function RolesPage() {
  return (
    <div className="space-y-6">
      <RolesTable />
    </div>
  );
}
