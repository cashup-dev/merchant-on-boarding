// "use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

type FeatureCard = {
  id: string;
  titleKey: string;
  descriptionKey: string;
  detailKey: string;
  badges?: string[];
};

const featureOptions: FeatureCard[] = [
  {
    id: "cashlez",
    titleKey: "onboarding.paymentFeature.options.cashlez.title",
    descriptionKey: "onboarding.paymentFeature.options.cashlez.description",
    detailKey: "onboarding.paymentFeature.options.cashlez.detail",
    badges: ["VA", "BNI", "BRI", "+9"],
  },
  {
    id: "czlink",
    titleKey: "onboarding.paymentFeature.options.czlink.title",
    descriptionKey: "onboarding.paymentFeature.options.czlink.description",
    detailKey: "onboarding.paymentFeature.options.czlink.detail",
    badges: ["VA", "QRIS"],
  },
  {
    id: "Softpos",
    titleKey: "onboarding.paymentFeature.options.softpos.title",
    descriptionKey: "onboarding.paymentFeature.options.softpos.description",
    detailKey: "onboarding.paymentFeature.options.softpos.detail",
    badges: ["VA", "QRIS"],
  },
];

export default function PaymentFeatureForm() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<string>("payment");

  return (
    <form id="payment-feature-form" className="mt-8 space-y-6">
      <div className="grid gap-4 lg:grid-cols-2">
        {featureOptions.map((feature) => {
          const isActive = selected === feature.id;
          return (
            <button
              key={feature.id}
              type="button"
              onClick={() => setSelected(feature.id)}
              className={`group flex flex-col gap-4 rounded-2xl border p-5 text-left transition ${
                isActive
                  ? "border-teal-400 bg-teal-50 shadow-sm"
                  : "border-gray-200 bg-white hover:border-teal-200"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-base font-semibold text-gray-900">{t(feature.titleKey)}</p>
                  <p className="mt-1 text-sm text-gray-500">{t(feature.descriptionKey)}</p>
                </div>
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                    isActive ? "border-teal-400 bg-teal-400 text-white" : "border-gray-300"
                  }`}
                >
                  {isActive ? "v" : ""}
                </span>
              </div>
              <div className="text-sm text-gray-500">{t(feature.detailKey)}</div>
              {feature.badges && (
                <div className="flex flex-wrap items-center gap-2">
                  {feature.badges.map((badge) => (
                    <span
                      key={badge}
                      className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-600"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>

      <p className="text-sm text-gray-500">
        {t("onboarding.paymentFeature.note")}
      </p>

    </form>
  );
}
