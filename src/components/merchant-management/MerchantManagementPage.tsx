"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import MerchantTable from "@/components/merchant-management/MerchantTable";
import NoData from "./NoData";
import Button from "@/components/ui/button/Button";

export type Merchant = {
    id: number;
    merchantId?: number;
    merchantName?: string;
    promoId?: number;
    promoName?: string;
    createdAt?: string;
  };
  
export default function MerchantManagementPage() {
  const [merchantList, setMerchantList] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const fetchMerchants = async () => {
    setLoading(true);
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const res = await fetch("/api/merchant/list", {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const data = await res.json();
      console.log("🎯 Raw Response", data); 
      if (!res.ok) throw new Error(data.message || "Request failed");

      setMerchantList(data.data || []);
    } catch (err: any) {
      console.error("❌ Failed to fetch merchants", err);
      setErrorMsg(err.message || "Gagal ambil data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMerchants();
  }, []);

  const handleMerchantUnBinding = useCallback((merchant: Merchant) => {
    console.log("🔄 Navigating to merchant binding with promo:", merchant.promoId);
    router.push(`/promo-management/merchant-bind?promoId=${merchant.promoId}`);
  }, [router]);

  console.log("🔄 Rendering PromoManagementPage", {
    merchantCount: merchantList.length,
    loading,
    errorMsg
  });

  return (
    <div className="p-6">
      {loading ? (
        <p>Loading...</p>
      ) : errorMsg ? (
        <p className="text-red-500">{errorMsg}</p>
      ) : merchantList.length > 0 ? (
        <MerchantTable
          data={merchantList}
          onMerchantUnBind={handleMerchantUnBinding}
        />
      ) : (
        <NoData message="No promo data found." />
      )}
    </div>
  );
}