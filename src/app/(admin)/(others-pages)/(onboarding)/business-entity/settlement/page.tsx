"use client";

import React from "react";

import { PageShell } from "../_components/PageShell";
import { SettlementStepForm } from "../_components/SettlementStepForm";
import { Stepper } from "../_components/Stepper";
import { useOnboardingDraft } from "../_hooks/useOnboardingDraft";

export default function SettlementPage() {
  const { completedSteps } = useOnboardingDraft();

  return (
    <PageShell>
      <div className="mt-8 space-y-6">
        <Stepper activeStep="settlement" completedSteps={completedSteps} />
        <SettlementStepForm />
      </div>
    </PageShell>
  );
}
