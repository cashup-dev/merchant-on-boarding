import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import PaymentFeatureForm from "./PaymentFeatureForm";

export const metadata = {
  title: "Fitur Pembayaran",
  description: "Onboarding - pilih fitur pembayaran cashUP.",
};

export default function PaymentFeaturePage() {
  return (
    <section className="bg-white">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl space-y-3">
          <h1 className="text-2xl font-semibold text-gray-900">Fitur Pembayaran</h1>
          <p className="text-sm text-gray-500">
            Pilih produk atau fitur pembayaran cashUP yang ingin digunakan.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild variant="outline">
            <Link href="/business-type">Previous</Link>
          </Button>
          <Button type="submit" form="payment-feature-form" className="bg-teal-500 text-white hover:bg-teal-600">
            Submit
          </Button>
        </div>
      </div>
      <PaymentFeatureForm />
    </section>
  );
}
