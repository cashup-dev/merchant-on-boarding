"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React, { useState } from "react";

export default function BusinessTypeForm() {
  const [businessType, setBusinessType] = useState<string>("individual");
  const [companyType, setCompanyType] = useState<string>("pt");

  return (
    <form
      id="business-type-form"
      className="mt-8"
      onReset={() => {
        setBusinessType("individual");
        setCompanyType("pt");
      }}
    >
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Mari kita mulai
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Kami ingin tahu lebih banyak tentang Anda dan jenis bisnis Anda.
          </p>
        </div>

        <RadioGroup
          value={businessType}
          onValueChange={setBusinessType}
          className="grid gap-4 sm:grid-cols-2"
        >
          <label className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-brand-300">
            <RadioGroupItem value="individual" />
            <div>
              <p className="text-base font-semibold text-gray-900">Individu</p>
              <p className="text-sm text-gray-500">
                Bisnis yang dimiliki dan dikelola oleh satu individu.
              </p>
            </div>
          </label>
          <label className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-brand-300">
            <RadioGroupItem value="company" />
            <div>
              <p className="text-base font-semibold text-gray-900">Perusahaan</p>
              <p className="text-sm text-gray-500">
                Bisnis yang dimiliki oleh suatu entitas dan memiliki hak dan kewajiban hukum sendiri.
              </p>
            </div>
          </label>
        </RadioGroup>

        <div
          className={`overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 p-4 transition-all duration-300 ease-out ${
            businessType === "company"
              ? "mt-2 max-h-[400px] translate-y-0 opacity-100"
              : "mt-0 max-h-0 -translate-y-2 opacity-0 pointer-events-none"
          }`}
        >
          <p className="text-sm font-medium text-gray-900">Tipe perusahaan Anda:</p>
          <RadioGroup
            value={companyType}
            onValueChange={setCompanyType}
            className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3"
          >
            {[
              { value: "pt", label: "PT" },
              { value: "cv", label: "CV" },
              { value: "firma", label: "Firma" },
              { value: "koperasi", label: "Koperasi" },
              { value: "nirlaba", label: "Nirlaba" },
            ].map((item) => (
              <label
                key={item.value}
                className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 text-sm font-medium text-gray-900 shadow-sm transition hover:border-brand-300"
              >
                <RadioGroupItem value={item.value} />
                {item.label}
              </label>
            ))}
          </RadioGroup>
        </div>
      </div>
    </form>
  );
}
