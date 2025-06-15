"use client";
import React, { useEffect, useState } from "react";
import BinTable from "@/components/bin-management/BinTable";
import Button from "@/components/ui/button/Button";
import { useRouter } from "next/navigation";

export default function BinManagementPage() {
  const [binList, setBinList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    try {
      const res = await fetch("/api/bin/list", {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const data = await res.json();
      console.log("🔥 Full response:", data);

      if (!res.ok) throw new Error(data.message || "Request failed");

      setBinList(data.data);
          // <- sesuai struktur json API kamu
    } catch (err: any) {
      setErrorMsg(err.message || "Gagal ambil data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const handleEdit = (bin: any) => {
    const encoded = encodeURIComponent(JSON.stringify(bin));
    router.push(`/bin-management/edit?data=${encoded}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">BIN Management</h1>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : errorMsg ? (
        <p className="text-red-500">{errorMsg}</p>
      ) : (
        <BinTable data={binList}/>
      )}
    </div>
  );
}
