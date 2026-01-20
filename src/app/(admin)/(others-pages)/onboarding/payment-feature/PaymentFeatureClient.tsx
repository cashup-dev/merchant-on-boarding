"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import PaymentFeatureForm from "./PaymentFeatureForm";

export default function PaymentFeatureClient() {
  const { t } = useTranslation();

  return (
    <section className="bg-white">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl space-y-3">
          <h1 className="text-2xl font-semibold text-gray-900">{t("onboarding.paymentFeature.title")}</h1>
          <p className="text-sm text-gray-500">
            {t("onboarding.paymentFeature.subtitle")}
          </p>
        </div>
      </div>
      <PaymentFeatureForm />
      <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
        <Button asChild variant="outline">
          <Link href="/onboarding/business-type">{t("onboarding.paymentFeature.actions.previous")}</Link>
        </Button>
        <Button type="submit" form="payment-feature-form" className="bg-teal-500 text-white hover:bg-teal-600">
          {t("onboarding.paymentFeature.actions.submit")}
        </Button>
      </div>
    </section>
  );
}



