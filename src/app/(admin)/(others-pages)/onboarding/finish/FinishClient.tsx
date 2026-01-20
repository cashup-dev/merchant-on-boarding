"use client";

import { Sparkles } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

export default function FinishClient() {
  const { t } = useTranslation();

  return (
    <section className="min-h-[70vh] flex items-center">
      <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-4 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-100 text-teal-600">
          <Sparkles className="h-7 w-7" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-gray-900">
            {t("onboarding.finish.title")}
          </h1>
          <p className="text-sm text-gray-500">
            {t("onboarding.finish.subtitle")}
          </p>
        </div>
        <a
          href="https://dashboard.cashup.id"
          className="inline-flex items-center justify-center rounded-xl bg-teal-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-600"
          rel="noreferrer"
          target="_blank"
        >
          {t("onboarding.finish.cta")}
        </a>
      </div>
    </section>
  );
}
