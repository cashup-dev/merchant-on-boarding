"use client";

import { ClockFading } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

export default function InReviewClient() {
  const { t } = useTranslation();

  return (
    <section className="min-h-[70vh] items-center flex">
      <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-4 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-100 text-teal-600">
          <ClockFading className="h-7 w-7" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-gray-900">
            {t("onboarding.inReview.title")}
          </h1>
          <p className="text-sm text-gray-500">
            {t("onboarding.inReview.subtitle")}
          </p>
        </div>
      </div>
    </section>
  );
}
