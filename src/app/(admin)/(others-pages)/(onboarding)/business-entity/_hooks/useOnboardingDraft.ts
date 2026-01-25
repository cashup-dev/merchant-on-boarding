"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { getOnboardingDraft, saveOnboardingDraft } from "@/lib/api/onboarding";
import { useOnboardingStore } from "@/store/onboardingStore";
import type {
  BusinessEntityDraft,
  BusinessEntityDraftMeta,
  CompletedStepKey,
  OnboardingDraftPayload,
} from "../_schema/types";

type UseOnboardingDraft = {
  loading: boolean;
  draft: BusinessEntityDraft | null;
  meta: BusinessEntityDraftMeta | null;
  completedSteps: CompletedStepKey[];
  refresh: () => Promise<void>;
  saveDraft: (payload: OnboardingDraftPayload, stepKey: CompletedStepKey) => Promise<boolean>;
};

export function useOnboardingDraft(): UseOnboardingDraft {
  const [loading, setLoading] = useState(true);
  const [completedSteps, setCompletedSteps] = useState<CompletedStepKey[]>([]);
  const storedDraft = useOnboardingStore((state) => state.businessEntity);
  const storedMeta = useOnboardingStore((state) => state.businessEntityMeta);
  const setBusinessEntity = useOnboardingStore((state) => state.setBusinessEntity);
  const setBusinessEntityMeta = useOnboardingStore((state) => state.setBusinessEntityMeta);
  const setBusinessEntityCompletedSteps = useOnboardingStore(
    (state) => state.setBusinessEntityCompletedSteps
  );

  const mergeCompletedSteps = useCallback(
    (steps: CompletedStepKey[]) => {
      const nextSteps = Array.from(new Set(steps));
      setCompletedSteps(nextSteps);
      setBusinessEntityCompletedSteps(nextSteps);
    },
    [setBusinessEntityCompletedSteps],
  );

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getOnboardingDraft();
      if (!response.success) {
        setLoading(false);
        return;
      }

      if (response.businessEntity) {
        setBusinessEntity(response.businessEntity);
      }
      if (response.meta) {
        setBusinessEntityMeta(response.meta);
      }
      if (response.completedSteps) {
        mergeCompletedSteps(response.completedSteps);
      }
    } catch {
      // Fallback to local store when API fails
    } finally {
      setLoading(false);
    }
  }, [mergeCompletedSteps, setBusinessEntity, setBusinessEntityMeta]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const draft = useMemo(() => storedDraft ?? null, [storedDraft]);
  const meta = useMemo(() => storedMeta ?? null, [storedMeta]);

  const saveDraft = useCallback(
    async (payload: OnboardingDraftPayload, stepKey: CompletedStepKey) => {
      try {
        const response = await saveOnboardingDraft(payload);
        if (!response.success) {
          toast.error("Gagal menyimpan draft onboarding", { description: response.message });
          return false;
        }

        if (response.businessEntity) {
          setBusinessEntity(response.businessEntity);
        }
        if (response.meta) {
          setBusinessEntityMeta(response.meta);
        }
        if (response.completedSteps) {
          mergeCompletedSteps(response.completedSteps);
        } else {
          mergeCompletedSteps([...completedSteps, stepKey]);
        }
        return true;
      } catch (error) {
        toast.error("Gagal menyimpan draft onboarding", {
          description: error instanceof Error ? error.message : "Silakan coba lagi.",
        });
        return false;
      }
    },
    [
      completedSteps,
      mergeCompletedSteps,
      setBusinessEntity,
      setBusinessEntityMeta,
    ],
  );

  return {
    loading,
    draft,
    meta,
    completedSteps,
    refresh,
    saveDraft,
  };
}
