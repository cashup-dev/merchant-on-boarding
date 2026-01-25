"use client";

import React from "react";

import { PageShell } from "../_components/PageShell";
import { PicAdminStepForm } from "../_components/PicAdminStepForm";
import { Stepper } from "../_components/Stepper";
import { useOnboardingDraft } from "../_hooks/useOnboardingDraft";

export default function PicAdminPage() {
  const { completedSteps } = useOnboardingDraft();

  return (
    <PageShell>
      <div className="mt-8 space-y-6">
        <Stepper activeStep="pic-admin" completedSteps={completedSteps} />
        <PicAdminStepForm />
      </div>
    </PageShell>
  );
}
