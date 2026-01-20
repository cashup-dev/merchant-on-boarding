"use client";

import Link from "next/link";
import { useOnboardingStore } from "@/store/onboardingStore";

type Step = {
  id: string;
  isComplete: boolean;
};

export default function OnboardingProgressCard() {
  const businessType = useOnboardingStore((state) => state.businessType);
  const paymentFeature = useOnboardingStore((state) => state.paymentFeature);
  const edcInformation = useOnboardingStore((state) => state.edcInformation);
  const businessEntity = useOnboardingStore((state) => state.businessEntity);

  const steps: Step[] = [
    { id: "business-type", isComplete: Boolean(businessType) },
    { id: "payment-feature", isComplete: Boolean(paymentFeature) },
    { id: "edc-information", isComplete: Boolean(edcInformation.edcType && edcInformation.edcCount) },
    { id: "business-entity", isComplete: Boolean(businessEntity) },
    { id: "terms", isComplete: false },
    { id: "in-review", isComplete: false },
    { id: "finish", isComplete: false },
  ];

  const completedCount = steps.filter((step) => step.isComplete).length;
  const totalCount = steps.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5 shadow-sm">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-sm font-semibold uppercase text-emerald-700">
            Onboarding progress
          </p>
          <p className="mt-1 text-sm text-emerald-700">
            Data onboarding tersimpan otomatis. Lanjutkan kapan saja untuk
            menyelesaikan proses registrasi.
          </p>
        </div>
        <div>
          <div className="flex items-center justify-between text-sm text-emerald-700">
            <span>
              {completedCount} / {totalCount} langkah selesai
            </span>
            <span className="font-semibold">{progressPercent}%</span>
          </div>
          <div className="mt-3 h-2 rounded-full bg-emerald-100">
            <div
              className="h-2 rounded-full bg-emerald-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
        <div>
          <Link
            href="/onboarding"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Lanjutkan onboarding
          </Link>
        </div>
      </div>
    </div>
  );
}
