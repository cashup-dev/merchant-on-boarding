"use client";

import React from "react";

import type { CompletedStepKey } from "../_schema/types";

type StepperProps = {
  activeStep: CompletedStepKey;
  completedSteps: CompletedStepKey[];
};

const steps: Array<{ id: number; label: string; key: CompletedStepKey }> = [
  { id: 1, label: "Informasi Merchant / Badan Usaha", key: "merchant" },
  { id: 2, label: "Data Pemilik Usaha / Direktur", key: "owner" },
  { id: 3, label: "Data PIC Admin", key: "pic-admin" },
  { id: 4, label: "Data Rekening Settlement", key: "settlement" },
];

export function Stepper({ activeStep, completedSteps }: StepperProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        {steps.map((step, index) => {
          const isActive = activeStep === step.key;
          const isComplete = completedSteps.includes(step.key);
          return (
            <div key={step.key} className="flex items-center gap-3">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${
                  isActive
                    ? "bg-teal-500 text-white"
                    : isComplete
                    ? "bg-teal-100 text-teal-700"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {step.id}
              </div>
              <span
                className={`text-sm font-semibold ${
                  isActive ? "text-gray-900" : isComplete ? "text-gray-700" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
              {index < steps.length - 1 && <span className="text-gray-300">›</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
