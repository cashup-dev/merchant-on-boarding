import React from "react";
import BusinessRepresentativeInformationForm from "./BusinessRepresentativeInformationForm";

export const metadata = {
  title: "Data Informasi Pemilik Bisnis atau Pengurus Perusahaan",
  description: "Onboarding - data pemilik bisnis atau pengurus perusahaan.",
};

export default function BusinessRepresentativeInformationPage() {
  return (
    <section className="bg-white">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl space-y-3">
          <h1 className="text-2xl font-semibold text-gray-900">
            Data Informasi Pemilik Bisnis atau Pengurus Perusahaan
          </h1>
          <p className="text-sm text-gray-500">
            Lengkapi data pemilik atau pengurus yang bertanggung jawab atas bisnis.
          </p>
        </div>
      </div>
      <BusinessRepresentativeInformationForm />
      <div className="mt-6 flex items-center justify-end gap-4">
        <button
          type="reset"
          form="business-representative-form"
          className="text-sm font-semibold text-gray-500 transition hover:text-gray-800"
        >
          Clear all
        </button>
        <button
          type="submit"
          form="business-representative-form"
          className="inline-flex items-center justify-center rounded-xl bg-teal-100 px-6 py-2.5 text-sm font-semibold text-green-950 transition hover:bg-teal-200"
        >
          Submit
        </button>
      </div>
    </section>
  );
}
