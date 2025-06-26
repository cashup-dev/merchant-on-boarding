"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Settings } from "lucide-react";

export default function PromoActionDropdown({ promo }: { promo: any }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="p-1 rounded hover:bg-gray-200"
      >
        <Settings className="w-5 h-5" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded shadow z-10">
          <button
            onClick={() => {
              router.push(
                `/promo-management/edit?data=${encodeURIComponent(JSON.stringify(promo))}`
              );
              setOpen(false);
            }}
            className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
          >
            ✏️ Edit Promo
          </button>

          <button
            onClick={() => {
              // console.log("➡️ Navigate to merchant-bind page");
              router.push(`/promo-management/merchant-bind?promoId=${promo.id}`);
              setOpen(false);
            }}
            className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
          >
            🧾 Merchant Binding
          </button>

          <button
            onClick={() => {
              // console.log("💳 BIN binding clicked");
              // router.push(`/promo-management/bin-bind?promoId=${promo.id}`); // if available
              setOpen(false);
            }}
            className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
          >
            💳 BIN Binding
          </button>

          <button
            onClick={() => {
              // Implement delete logic here or show modal
              // console.log("🗑️ Delete clicked for ID:", promo.id);
              setOpen(false);
            }}
            className="block w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50"
          >
            🗑️ Delete Promo
          </button>
        </div>
      )}
    </div>
  );
}
