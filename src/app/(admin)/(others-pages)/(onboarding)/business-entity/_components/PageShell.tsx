"use client";

import React from "react";
import { useTranslation } from "react-i18next";

type PageShellProps = {
  children: React.ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  const { t } = useTranslation();

  return (
    <section className="bg-white">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl space-y-3">
          <h1 className="text-2xl font-semibold text-gray-900">{t("onboarding.businessEntity.title")}</h1>
          <p className="text-sm text-gray-500">{t("onboarding.businessEntity.subtitle")}</p>
        </div>
      </div>
      {children}
    </section>
  );
}
