import React from "react";
import SalesMerchantDetail from "@/components/sales/SalesMerchantDetail";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SalesMerchantDetailPage({ params }: PageProps) {
  const { id } = await params;
  return (
    <div className="space-y-6">
      <SalesMerchantDetail merchantId={id} />
    </div>
  );
}
