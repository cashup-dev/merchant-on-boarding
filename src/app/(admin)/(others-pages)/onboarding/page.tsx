"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useOnboardingStore } from "@/store/onboardingStore";

type Step = {
  id: string;
  titleKey: string;
  descriptionKey: string;
  href: string;
  isComplete: boolean;
};

export default function OnboardingLandingPage() {
  const { t } = useTranslation();
  const businessType = useOnboardingStore((state) => state.businessType);
  const paymentFeature = useOnboardingStore((state) => state.paymentFeature);
  const edcInformation = useOnboardingStore((state) => state.edcInformation);
  const businessEntity = useOnboardingStore((state) => state.businessEntity);

  const steps: Step[] = [
    {
      id: "business-type",
      titleKey: "sidebar.onboarding.steps.businessType.title",
      descriptionKey: "sidebar.onboarding.steps.businessType.description",
      href: "/onboarding/business-type",
      isComplete: Boolean(businessType),
    },
    {
      id: "payment-feature",
      titleKey: "sidebar.onboarding.steps.paymentFeature.title",
      descriptionKey: "sidebar.onboarding.steps.paymentFeature.description",
      href: "/onboarding/payment-feature",
      isComplete: Boolean(paymentFeature),
    },
    {
      id: "edc-information",
      titleKey: "sidebar.onboarding.steps.edcInformation.title",
      descriptionKey: "sidebar.onboarding.steps.edcInformation.description",
      href: "/onboarding/edc-information",
      isComplete: Boolean(edcInformation.edcType && edcInformation.edcCount),
    },
    {
      id: "business-entity",
      titleKey: "sidebar.onboarding.steps.businessEntity.title",
      descriptionKey: "sidebar.onboarding.steps.businessEntity.description",
      href: "/onboarding/business-entity",
      isComplete: Boolean(businessEntity),
    },
    {
      id: "terms",
      titleKey: "sidebar.onboarding.steps.terms.title",
      descriptionKey: "sidebar.onboarding.steps.terms.description",
      href: "/onboarding/terms",
      isComplete: false,
    },
    {
      id: "in-review",
      titleKey: "sidebar.onboarding.steps.inReview.title",
      descriptionKey: "sidebar.onboarding.steps.inReview.description",
      href: "/onboarding/in-review",
      isComplete: false,
    },
    {
      id: "finish",
      titleKey: "sidebar.onboarding.steps.finish.title",
      descriptionKey: "sidebar.onboarding.steps.finish.description",
      href: "/onboarding/finish",
      isComplete: false,
    },
  ];
  const completedCount = steps.filter((step) => step.isComplete).length;

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 via-blue-50 to-slate-50 px-6 py-5">
        <p className="text-sm font-semibold text-blue-700">
          {t("onboarding.landing.note")}
        </p>
        <p className="mt-2 text-xs text-blue-600">
          {completedCount} / {steps.length} langkah selesai
        </p>
      </div>

      <div className="space-y-3">
        {steps.map((step, index) => (
          <Link
            key={step.id}
            href={step.href}
            className="group flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm transition hover:border-blue-200 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-2xl border text-sm font-semibold ${
                  step.isComplete
                    ? "border-blue-200 bg-blue-500 text-white"
                    : "border-gray-200 bg-gray-50 text-gray-500"
                }`}
              >
                {step.isComplete ? <Check className="h-5 w-5" /> : index + 1}
              </span>
              <div>
                <p className="text-base font-semibold text-gray-900">
                  {t(step.titleKey)}
                </p>
                <p className="text-sm text-gray-500">
                  {t(step.descriptionKey)}
                </p>
              </div>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                step.isComplete
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {step.isComplete ? "Selesai" : "Belum"}
            </span>
          </Link>
        ))}
      </div>

      <div className="flex justify-end">
        <Link
          href="/onboarding/business-type"
          className="rounded-xl bg-slate-700 px-8 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          {t("onboarding.landing.cta")}
        </Link>
      </div>
    </section>
  );
}
