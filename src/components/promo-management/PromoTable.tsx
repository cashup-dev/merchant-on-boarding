"use client";
import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

type Promo = {
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

type Props = {
  data: Promo[];
  onEdit?: (promo: Promo) => void;
  onDelete?: (id: number) => void;
  onMerchantBind?: (promo: Promo) => void;
  onBinBind?: (promo: Promo) => void;
};

function formatDate(dateStr?: string) {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function PromoTable({
  data,
  onEdit,
  onDelete,
  onMerchantBind,
  onBinBind,
}: Props) {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const router = useRouter();

  console.log("🔧 PromoTable props:", {
    hasMerchantBind: !!onMerchantBind,
    hasBinBind: !!onBinBind,
    dataLength: data.length
  });

  const toggleDropdown = (id: number) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  const handleMerchantBind = (promo: Promo) => {
    console.log("🔘 Merchant bind initiated for:", promo.id);
    if (onMerchantBind) {
      onMerchantBind(promo);
    } else {
      console.warn("No merchant bind handler, using fallback");
      router.push(`/promo-management/merchant-bind?promoId=${promo.id}`);
    }
  };

  const handleBinBind = (promo: Promo) => {
    console.log("🔘 Bin bind initiated for:", promo.id);
    if (onBinBind) {
      onBinBind(promo);
    } else {
      console.warn("No bin bind handler, using fallback");
      router.push(`/promo-management/bin-bind?promoId=${promo.id}`);
    }
  };

  return (
    <div className="overflow-auto border rounded-xl shadow-sm">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-100 text-xs uppercase text-gray-600">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Value</th>
            <th className="px-4 py-3">Min Tx</th>
            <th className="px-4 py-3">Max Tx</th>
            <th className="px-4 py-3">Max Subsidy</th>
            <th className="px-4 py-3">Channel</th>
            <th className="px-4 py-3">Valid From</th>
            <th className="px-4 py-3">Valid To</th>
            <th className="px-4 py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((promo) => {
              const {
                id,
                name = "-",
                promoType = "-",
                promoValue = 0,
                minTransaction = 0,
                maxTransaction = 0,
                maxSubsidy = 0,
                channelType = "-",
                validFrom,
                validTo,
              } = promo;

              const formattedValue =
                promoType === "PERCENTAGE"
                  ? `${promoValue}%`
                  : `Rp${promoValue.toLocaleString("id-ID")}`;

              const isOpen = openDropdownId === id;

              return (
                <tr key={id} className="border-t">
                  <td className="px-4 py-3">{name}</td>
                  <td className="px-4 py-3">{promoType}</td>
                  <td className="px-4 py-3">{formattedValue}</td>
                  <td className="px-4 py-3">
                    Rp{minTransaction.toLocaleString("id-ID")}
                  </td>
                  <td className="px-4 py-3">
                    Rp{maxTransaction.toLocaleString("id-ID")}
                  </td>
                  <td className="px-4 py-3">
                    Rp{maxSubsidy.toLocaleString("id-ID")}
                  </td>
                  <td className="px-4 py-3">{channelType}</td>
                  <td className="px-4 py-3">{formatDate(validFrom)}</td>
                  <td className="px-4 py-3">{formatDate(validTo)}</td>
                  <td className="px-4 py-3 text-center relative">
                    <div className="inline-block text-left">
                      <button
                        className="text-sm font-medium text-gray-600 hover:text-black flex items-center gap-1"
                        onClick={() => toggleDropdown(id)}
                      >
                        Settings
                        <ChevronDownIcon className="w-4 h-4" />
                      </button>

                      {isOpen && (
                        <div className="absolute right-0 mt-2 z-10 bg-white shadow-md border rounded-md text-sm w-48">
                          <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleMerchantBind(promo);
                              setOpenDropdownId(null);
                            }}
                          >
                            Merchant Binding
                          </button>
                          
                          <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleBinBind(promo);
                              setOpenDropdownId(null);
                            }}
                          >
                            BIN Binding
                          </button>

                          <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              onEdit?.(promo);
                              setOpenDropdownId(null);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              onDelete?.(id);
                              setOpenDropdownId(null);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={10} className="text-center text-gray-400 py-4">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}