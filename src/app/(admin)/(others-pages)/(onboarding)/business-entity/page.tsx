import React from "react";

export const metadata = {
  title: "Informasi Merchant/Badan Usaha",
  description: "Onboarding - informasi merchant atau badan usaha.",
};

export default function BusinessEntityPage() {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="max-w-2xl space-y-3">
        <h1 className="text-2xl font-semibold text-gray-900">
          Informasi Merchant/Badan Usaha
        </h1>
        <p className="text-sm text-gray-500">
          Isi data usaha dan dokumen pendukung untuk proses verifikasi.
        </p>
      </div>
      <div className="mt-8 rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-10 text-center text-sm text-gray-400">
        Konten form akan ditampilkan di sini.
      </div>
    </section>
  );
}
