"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import BinTable from "@/components/bin-management/BinTable";
import NoData from "./NoData";
import Button from "@/components/ui/button/Button";

export type Bin = {
    id: number;
    binIds?: number;
    binNumber?: number;
    promoId?: number;
    promoName?: string;
    createdAt?: string;
  };
  
export default function BinManagementPage() {
  const [binList, setBinList] = useState<Bin[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const fetchBins = async () => {
    setLoading(true);
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const res = await fetch("/api/bin/list", {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const data = await res.json();
      console.log("🎯 Raw Response", data); 
      if (!res.ok) throw new Error(data.message || "Request failed");

      setBinList(data.data || []);
    } catch (err: any) {
      console.error("❌ Failed to fetch merchants", err);
      setErrorMsg(err.message || "Gagal ambil data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBins();
  }, []);

  const handleBinUnBinding = useCallback((bin: Bin) => {
    console.log("🔄 Navigating to merchant binding with promo:", bin.promoId);
    router.push(`/promo-management/bin-bind?promoId=${bin.promoId}`);
  }, [router]);
binList
  console.log("🔄 Rendering PromoManagementPage", {
    merchantCount: binList.length,
    loading,
    errorMsg
  });

  return (
    <div className="p-6">
      {loading ? (
        <p>Loading...</p>
      ) : errorMsg ? (
        <p className="text-red-500">{errorMsg}</p>
      ) : binList.length > 0 ? (
        <BinTable
          data={binList}
          onBinUnBinding={handleBinUnBinding}
        />
      ) : (
        <NoData message="No promo data found." />
      )}
    </div>
  );
}