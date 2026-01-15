import React from "react";
import SalesMerchantDetail from "@/components/sales/SalesMerchantDetail";

type PageProps = {
  params: {
    id: string;
  };
};

export default function SalesMerchantDetailPage({ params }: PageProps) {
  return (
    <div className="space-y-6">
      <SalesMerchantDetail merchantId={params.id} />
    </div>
  );
}
