"use client";

import React from "react";

import { OwnerStepForm } from "../_components/OwnerStepForm";
import { PageShell } from "../_components/PageShell";
import { Stepper } from "../_components/Stepper";
import { useOnboardingDraft } from "../_hooks/useOnboardingDraft";

export default function OwnerPage() {
  const { completedSteps } = useOnboardingDraft();

  return (
    <PageShell>
      <div className="mt-8 space-y-6">
        <Stepper activeStep="owner" completedSteps={completedSteps} />
        <OwnerStepForm />
      </div>
    </PageShell>
  );
}
