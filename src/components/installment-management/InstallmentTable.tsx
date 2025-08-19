"use client";
import React, { useState } from "react";
import { ChevronDownIcon, ArrowPathIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

// Tipe data disesuaikan dengan response API installment
type Installment = {
  id: number;
  name?: string;
  minTransaction?: number;
  tenorIdDurations?: number[];
  isActive?: boolean;
};

type Props = {
  data: Installment[];
  onEdit?: (installment: Installment) => void;
  // onMerchantBind & onBinBind dihapus karena tidak relevan
  onStatusChange?: (installmentId: number, isActive: boolean) => Promise<void>;
};

export default function InstallmentTable({
  data,
  onEdit,
  onStatusChange,
}: Props) {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [loadingStatus, setLoadingStatus] = useState<number | null>(null);
  const [loadingAction, setLoadingAction] = useState<{
    id: number | null;
    action: string | null;
  }>({ id: null, action: null });
  const router = useRouter();
  const { isAdmin } = useAuth();

  const toggleDropdown = (id: number) => {
    if (!loadingAction.id) {
      setOpenDropdownId((prev) => (prev === id ? null : id));
    }
  };

  const simulateLoading = () => {
    return new Promise((resolve) => setTimeout(resolve, 800));
  };

  const handleEdit = async (installment: Installment) => {
    setLoadingAction({ id: installment.id, action: "edit" });
    try {
      await simulateLoading();
      if (onEdit) {
        onEdit(installment);
      }
    } finally {
      setLoadingAction({ id: null, action: null });
    }
  };

  const handleStatusChange = async (installmentId: number, isActive: boolean) => {
    setLoadingStatus(installmentId);
    try {
      // Endpoint API diubah ke endpoint untuk installment
      const res = await fetch(`/api/installment/activate/${installmentId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Gagal update status");
      }

      if (onStatusChange) {
        await onStatusChange(installmentId, isActive);
      }
      
      // Pesan notifikasi disesuaikan
      toast.success(`Status installment berhasil diubah ke ${isActive ? "active" : "inactive"}`);
    } catch (err: any) {
      console.error("🔥 Full error:", err);
      toast.error(`Gagal update status: ${err.message}`);
    } finally {
      setLoadingStatus(null);
    }
  };

  return (
    <div className="overflow-auto border rounded-xl shadow-sm">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-100 text-xs uppercase text-gray-600">
          {/* Kolom tabel disesuaikan dengan data installment */}
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Min Transaction</th>
            <th className="px-4 py-3">Tenor Durations</th>
            <th className="px-4 py-3">Status</th>
            {isAdmin && <th className="px-4 py-3 text-center">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((installment) => {
              const {
                id,
                name = "-",
                minTransaction = 0,
                tenorIdDurations = [],
                isActive = false,
              } = installment;

              const isOpen = openDropdownId === id;
              const isLoadingStatus = loadingStatus === id;
              const isLoadingAction = loadingAction.id === id;
              const currentAction = loadingAction.action;

              return (
                <tr key={id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{name}</td>
                  <td className="px-4 py-3">
                    Rp{minTransaction.toLocaleString("id-ID")}
                  </td>
                  <td className="px-4 py-3">{tenorIdDurations.join(", ")}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  {isAdmin && (
                    <td className="px-4 py-3 text-center relative">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleEdit(installment)}
                          className="text-blue-600 hover:underline flex items-center gap-1 min-w-[60px] justify-center"
                          disabled={isLoadingAction}
                        >
                          {isLoadingAction && currentAction === "edit" ? (
                            <ArrowPathIcon className="w-4 h-4 animate-spin" />
                          ) : (
                            "Edit"
                          )}
                        </button>

                        <div className="relative">
                          <button
                            onClick={() => toggleDropdown(id)}
                            className="flex items-center gap-1 text-gray-600 hover:text-black"
                            disabled={isLoadingAction}
                          >
                            More <ChevronDownIcon className="w-4 h-4" />
                          </button>
                          {isOpen && (
                            <div className="absolute right-0 mt-2 z-10 bg-white shadow-md border rounded-md text-sm w-48">
                              {/* Tombol Merchant Bind dan BIN Bind dihapus */}
                              <button
                                className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 disabled:opacity-50 ${
                                  isActive
                                    ? "text-red-500"
                                    : "text-green-500"
                                }`}
                                onClick={async (e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  await handleStatusChange(id, !isActive);
                                  setOpenDropdownId(null);
                                }}
                                disabled={isLoadingStatus}
                              >
                                {isLoadingStatus ? (
                                  <ArrowPathIcon className="w-4 h-4 animate-spin" />
                                ) : null}
                                {isActive ? "Deactivate" : "Activate"}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  )}
                </tr>
              );
            })
          ) : (
            <tr>
              {/* ColSpan disesuaikan dengan jumlah kolom */}
              <td colSpan={isAdmin ? 6 : 5} className="text-center text-gray-400 py-4">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}