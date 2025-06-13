"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import PromoTable from "@/components/promo-management/PromoTable";
import NoData from "./NoData";
import Button from "@/components/ui/button/Button";

export type Promo = {
  id: number;
  name?: string;
  promoType?: string;
  promoValue?: number;
  minTransaction?: number;
  maxTransaction?: number;
  maxSubsidy?: number;
  channelType?: string;
  validFrom?: string;
  validTo?: string;
  isActive?: boolean;
};

export default function PromoManagementPage() {
  const [promoList, setPromoList] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const fetchPromos = async () => {
    setLoading(true);
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const res = await fetch("/api/promo/list", {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Request failed");

      setPromoList(data.data?.data || []);
    } catch (err: any) {
      console.error("❌ Failed to fetch promos", err);
      setErrorMsg(err.message || "Gagal ambil data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromos();
  }, []);

  const handleCreate = () => {
    router.push("/promo-management/create");
  };

  const handleEdit = (promo: Promo) => {
    const encoded = encodeURIComponent(JSON.stringify(promo));
    router.push(`/promo-management/edit?data=${encoded}`);
  };

  const handleDelete = (id: number) => {
    console.log("🗑️ Delete promo ID:", id);
  };

  const handleMerchantBinding = useCallback((promo: Promo) => {
    console.log("🔄 Navigating to merchant binding with promo:", promo.id);
    router.push(`/promo-management/merchant-bind?promoId=${promo.id}`);
  }, [router]);

  const handleBinBinding = useCallback((promo: Promo) => {
    console.log("🔄 Navigating to bin binding with promo:", promo.id);
    router.push(`/promo-management/bin-bind?promoId=${promo.id}`);
  }, [router]);

  console.log("🔄 Rendering PromoManagementPage", {
    promoCount: promoList.length,
    loading,
    errorMsg
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Promo Management</h1>
        <Button onClick={handleCreate}>➕ Add Promo</Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : errorMsg ? (
        <p className="text-red-500">{errorMsg}</p>
      ) : promoList.length > 0 ? (
        <PromoTable
          data={promoList}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onMerchantBind={handleMerchantBinding}
          onBinBind={handleBinBinding}
        />
      ) : (
        <NoData message="No promo data found." />
      )}
    </div>
  );
}