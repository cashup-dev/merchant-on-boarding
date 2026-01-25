"use client";

import React from "react";

import { MerchantStepForm } from "../_components/MerchantStepForm";
import { PageShell } from "../_components/PageShell";
import { Stepper } from "../_components/Stepper";
import { useOnboardingDraft } from "../_hooks/useOnboardingDraft";

export default function MerchantPage() {
  const { completedSteps } = useOnboardingDraft();

  return (
    <PageShell>
      <div className="mt-8 space-y-6">
        <Stepper activeStep="merchant" completedSteps={completedSteps} />
        <MerchantStepForm />
      </div>
    </PageShell>
  );
}
