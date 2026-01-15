import type { Metadata } from "next";
import React from "react";
import SalesMerchantsTable from "@/components/sales/SalesMerchantsTable";

export const metadata: Metadata = {
  title: "Sales Merchants - Backoffice cashUP",
  description: "Merchants assigned to sales",
};

export default function SalesMerchantsPage() {
  return (
    <div className="space-y-4 md:space-y-6">
      <SalesMerchantsTable />
    </div>
  );
}
