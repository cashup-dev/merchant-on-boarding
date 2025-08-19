"use client";
import React, { useEffect, useState } from "react";
import InstallmentTable from "@/components/installment-management/InstallmentTable"; // DIUBAH
import Button from "@/components/ui/button/Button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function InstallmentManagementPage() { // DIUBAH
  const [installmentList, setInstallmentList] = useState([]); // DIUBAH
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const { isAdmin } = useAuth();

  const fetchData = async () => {
    setLoading(true);
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    try {
      // Endpoint API diubah untuk mengambil data installment
      const res = await fetch("/api/installment/list", { // DIUBAH
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Request failed");

      // Sesuaikan dengan struktur data dari API installment Anda
      setInstallmentList(data.data.data); // DIUBAH
    } catch (err: any) {
      setErrorMsg(err.message || "Gagal ambil data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = () => {
    // Navigasi ke halaman pembuatan installment
    router.push("/installment-management/create"); // DIUBAH
  };

  const handleEdit = (installment: any) => { // DIUBAH
    const encoded = encodeURIComponent(JSON.stringify(installment));
    // Navigasi ke halaman edit installment
    router.push(`/installment-management/edit?data=${encoded}`); // DIUBAH
  };

  return (
    <div className="space-y-6">
      {isAdmin && (
        <div className="flex justify-between items-center">
          {/* Judul halaman diubah */}
          <h1 className="text-xl font-semibold">Installment Management</h1> 
          {/* Teks tombol diubah */}
          <Button onClick={handleCreate}>+ Create Installment</Button>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : errorMsg ? (
        <p className="text-red-500">{errorMsg}</p>
      ) : (
        // Menggunakan komponen tabel untuk installment
        <InstallmentTable data={installmentList} onEdit={handleEdit} /> // DIUBAH
      )}
    </div>
  );
}