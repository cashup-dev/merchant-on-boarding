"use client";

import type { OnboardingDraftPayload, OnboardingDraftResponse } from "@/app/(admin)/(others-pages)/(onboarding)/business-entity/_schema/types";

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

export async function getOnboardingDraft(): Promise<OnboardingDraftResponse> {
  const response = await fetch("/api/onboarding", {
    method: "GET",
    headers: DEFAULT_HEADERS,
    cache: "no-store",
  });

  if (!response.ok) {
    return {
      success: false,
      message: "Gagal mengambil draft onboarding.",
    };
  }

  return response.json();
}

export async function saveOnboardingDraft(payload: OnboardingDraftPayload): Promise<OnboardingDraftResponse> {
  const response = await fetch("/api/onboarding", {
    method: "PATCH",
    headers: DEFAULT_HEADERS,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return {
      success: false,
      message: "Gagal menyimpan draft onboarding.",
    };
  }

  return response.json();
}
