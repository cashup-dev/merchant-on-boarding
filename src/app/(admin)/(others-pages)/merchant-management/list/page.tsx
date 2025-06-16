"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import MerchantTable, { Merchant } from "@/components/merchant-management/MerchantTable";
import NoData from "@/components/merchant-management/NoData";
import { toast } from "sonner"; // ✅ ganti ke sonner

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
      if (!res.ok) throw new Error(data.message || "Request failed");

      setMerchantList(data.data || []);
    } catch (err: any) {
      console.error("❌ Failed to fetch merchants", err);
      setErrorMsg(err.message || "Gagal ambil data");
      toast.error("Gagal ambil data", {
        description: err.message || "Terjadi kesalahan saat memuat merchant",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMerchants();
  }, []);

  const handleMerchantUnBinding = useCallback(async (merchant: Merchant) => {
    if (!merchant?.promoId || !merchant?.merchantId) {
      toast.error("Data tidak lengkap", {
        description: "Merchant ID atau Promo ID tidak ditemukan.",
      });
      return;
    }

    const confirmed = confirm(
      `Yakin ingin unbind merchant "${merchant.merchantName}" dari promo "${merchant.promoName}"?`
    );
    if (!confirmed) return;

    const toastId = toast.loading("Unbinding merchant...");

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const res = await fetch(`/api/merchant/unbind/${merchant.promoId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          merchantIds: [merchant.merchantId.toString()],
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal unbind merchant");

      toast.success("Merchant berhasil di-unbind", {
        description: `Merchant ${merchant.merchantName} telah di-unbind.`,
        id: toastId,
      });

      fetchMerchants(); // Refresh list
    } catch (err: any) {
      console.error("❌ Unbind gagal:", err);
      toast.error("Unbind gagal", {
        description: err.message || "Terjadi kesalahan saat unbind",
        id: toastId,
      });
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Merchant Management</h1>
      </div>

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
