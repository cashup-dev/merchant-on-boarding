"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function BusinessTypeForm() {
  const { t } = useTranslation();
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
        <div className="max-w-2xl space-y-3">
          <h1 className="text-2xl font-semibold text-gray-900">
            {t("onboarding.businessType.title")}
          </h1>
          <p className="text-sm text-gray-500">
            {t("onboarding.businessType.subtitle")}
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            {t("onboarding.businessType.introTitle")}
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            {t("onboarding.businessType.introDescription")}
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
              <p className="text-base font-semibold text-gray-900">
                {t("onboarding.businessType.options.individual.title")}
              </p>
              <p className="text-sm text-gray-500">
                {t("onboarding.businessType.options.individual.description")}
              </p>
            </div>
          </label>
          <label className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-brand-300">
            <RadioGroupItem value="company" />
            <div>
              <p className="text-base font-semibold text-gray-900">
                {t("onboarding.businessType.options.company.title")}
              </p>
              <p className="text-sm text-gray-500">
                {t("onboarding.businessType.options.company.description")}
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
          <p className="text-sm font-medium text-gray-900">
            {t("onboarding.businessType.companyTypeTitle")}
          </p>
          <RadioGroup
            value={companyType}
            onValueChange={setCompanyType}
            className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3"
          >
            {[
              { value: "pt", label: t("onboarding.businessType.companyTypes.pt") },
              { value: "cv", label: t("onboarding.businessType.companyTypes.cv") },
              { value: "firma", label: t("onboarding.businessType.companyTypes.firma") },
              { value: "koperasi", label: t("onboarding.businessType.companyTypes.koperasi") },
              { value: "nirlaba", label: t("onboarding.businessType.companyTypes.nirlaba") },
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

        <div className="flex items-center justify-end gap-4">
          <button
            type="reset"
            className="text-sm font-semibold text-gray-500 transition hover:text-gray-800"
          >
            {t("onboarding.businessType.actions.clear")}
          </button>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-xl bg-teal-100 px-6 py-2.5 text-sm font-semibold text-green-950 transition hover:bg-teal-200"
          >
            {t("onboarding.businessType.actions.submit")}
          </button>
        </div>
      </div>
    </form>
  );
}
