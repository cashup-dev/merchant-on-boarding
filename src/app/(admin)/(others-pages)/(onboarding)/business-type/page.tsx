import React from "react";
import BusinessTypeForm from "./BusinessTypeForm";

export const metadata = {
  title: "Tipe Bisnis",
  description: "Onboarding - pilih tipe bisnis.",
};

export default function BusinessTypePage() {
  return (
    <section className="bg-white">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl space-y-3">
          <h1 className="text-2xl font-semibold text-gray-900">
            Tipe Bisnis
          </h1>
          <p className="text-sm text-gray-500">
            Pilih tipe bisnis Anda untuk melanjutkan proses onboarding.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="reset"
            form="business-type-form"
            className="text-sm font-semibold text-gray-500 transition hover:text-gray-800"
          >
            Clear all
          </button>
          <button
            type="submit"
            form="business-type-form"
            className="inline-flex items-center justify-center rounded-xl bg-teal-100 px-6 py-2.5 text-sm font-semibold text-green-950 transition hover:bg-teal-200"
          >
            Submit
          </button>
        </div>
      </div>
      <BusinessTypeForm />
    </section>
  );
}
