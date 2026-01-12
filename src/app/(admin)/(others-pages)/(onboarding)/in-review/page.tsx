import { ClockFading } from "lucide-react";
import React from "react";

export const metadata = {
  title: "In Review",
  description: "Onboarding - proses verifikasi.",
};

export default function InReviewPage() {
  return (
    <section className="min-h-[70vh] items-center flex">
      <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-4 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-100 text-teal-600">
          <ClockFading className="h-7 w-7" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-gray-900">Pengajuan Dalam Review</h1>
          <p className="text-sm text-gray-500">
            Tim cashUP sedang meninjau data Anda. Proses ini maksimal 3 hari kerja.
          </p>
        </div>
      </div>
    </section>
  );
}
