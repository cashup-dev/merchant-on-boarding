import type { Metadata } from "next";
import React from "react";
import MerchantForm from "@/components/merchants/MerchantForm";

export const metadata: Metadata = {
  title: "Edit Merchant - Backoffice cashUP",
  description: "Edit merchant details",
};

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MerchantEditPage({ params }: PageProps) {
  const { id } = await params;
  return <MerchantForm mode="edit" merchantId={id} />;
}
