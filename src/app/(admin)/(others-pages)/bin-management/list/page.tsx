"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import BinTable, { Bin } from "@/components/bin-management/BinTable";
import NoData from "@/components/bin-management/NoData";
import { toast } from "sonner";

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

      // Convert binIds & promoId to number (if necessary)
      const cleanedData = (data.data || []).map((bin: any) => ({
        ...bin,
        binIds: Number(bin.binIds),
        promoId: Number(bin.promoId),
      }));

      setBinList(cleanedData);
    } catch (err: any) {
      console.error("❌ Failed to fetch BIN", err);
      setErrorMsg(err.message || "Gagal ambil data");
      toast.error("Gagal ambil data", {
        description: err.message || "Terjadi kesalahan saat memuat BIN",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBins();
  }, []);

  const handleBinUnBinding = useCallback(async (bin: Bin) => {
    console.log("🧪 BIN UNBIND DEBUG:", bin);

    if (typeof bin.promoId !== "number" || typeof bin.binIds !== "number") {
      toast.error("Data tidak lengkap", {
        description: "BIN ID atau Promo ID tidak ditemukan.",
      });
      return;
    }

    const confirmed = confirm(
      `Yakin ingin unbind BIN "${bin.binNumber}" dari promo "${bin.promoName}"?`
    );
    if (!confirmed) return;

    const toastId = toast.loading("Unbinding BIN...");

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const res = await fetch(`/api/bin/unbind/${bin.promoId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          binIds: [String(bin.binIds)],
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal unbind BIN");

      toast.success("BIN berhasil di-unbind", {
        description: `BIN ${bin.binNumber} telah di-unbind.`,
        id: toastId,
      });

      fetchBins(); // Refresh list
    } catch (err: any) {
      console.error("❌ Unbind gagal:", err);
      toast.error("Unbind gagal", {
        description: err.message || "Terjadi kesalahan saat unbind",
        id: toastId,
      });
    }
  }, []);

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">BIN Management</h1>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : errorMsg ? (
        <p className="text-red-500">{errorMsg}</p>
      ) : binList.length > 0 ? (
        <BinTable data={binList} onBinUnBinding={handleBinUnBinding} />
      ) : (
        <NoData message="No promo data found." />
      )}
    </div>
  );
}
