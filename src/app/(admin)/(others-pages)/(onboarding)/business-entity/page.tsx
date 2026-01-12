import React from "react";
import BusinessEntityForm from "./BusinessEntityForm";

export const metadata = {
  title: "Informasi Merchant/Badan Usaha",
  description: "Onboarding - informasi merchant atau badan usaha.",
};

export default function BusinessEntityPage() {
  return (
    <section className="bg-white">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl space-y-3">
          <h1 className="text-2xl font-semibold text-gray-900">
            Informasi Merchant/Badan Usaha
          </h1>
          <p className="text-sm text-gray-500">
            Isi data usaha dan dokumen pendukung untuk proses verifikasi.
          </p>
        </div>
      </div>
      <BusinessEntityForm />
    </section>
  );
}
