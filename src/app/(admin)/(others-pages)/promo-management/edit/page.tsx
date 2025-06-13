"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import EditPromoForm from "@/components/promo-management/EditPromoForm";

export default function EditPromoPage() {
  const searchParams = useSearchParams();
  const [promoData, setPromoData] = useState<any>(null);

  useEffect(() => {
    const encoded = searchParams.get("data");
    if (!encoded) return;

    try {
      const decoded = decodeURIComponent(encoded);
      const parsed = JSON.parse(decoded);
      setPromoData(parsed);
    } catch (err) {
      console.error("❌ Failed to parse data:", err);
    }
  }, [searchParams]);

  if (!promoData) return <p className="text-gray-500">Loading data...</p>;

  return (
    <EditPromoForm
      promoData={promoData}
      onSuccess={() => {
        window.location.href = "/promo-management";
      }}
    />
  );
}
