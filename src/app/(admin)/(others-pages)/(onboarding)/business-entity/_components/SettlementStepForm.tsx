"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useOnboardingDraft } from "../_hooks/useOnboardingDraft";
import { settlementSchema } from "../_schema/settlement.schema";
import type { SettlementStepData } from "../_schema/types";
import { buildSettlementDraftSection, mapZodErrors } from "../_utils/normalize";

export function SettlementStepForm() {
  const router = useRouter();
  const { draft, saveDraft } = useOnboardingDraft();
  const [initialized, setInitialized] = useState(false);

  const [bankName, setBankName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [settlementEmail, setSettlementEmail] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!draft || initialized) {
      return;
    }
    setBankName(draft.settlement?.bankName ?? "");
    setBankAccountNumber(draft.settlement?.accountNumber ?? "");
    setBankAccountName(draft.settlement?.accountName ?? "");
    setSettlementEmail(draft.settlement?.email ?? "");
    setInitialized(true);
  }, [draft, initialized]);

  const handleNumericChange = (setter: (value: string) => void) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setter(event.target.value.replace(/\D/g, ""));
  };

  const payload: SettlementStepData = {
    bankName,
    bankAccountNumber,
    bankAccountName,
    settlementEmail,
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFieldErrors({});
    const result = settlementSchema.safeParse(payload);
    if (!result.success) {
      setFieldErrors(mapZodErrors(result.error));
      return;
    }

    const businessEntity = buildSettlementDraftSection(payload);
    const success = await saveDraft(
      {
        settlement: {
          businessEntity,
        },
      },
      "settlement",
    );

    if (!success) {
      return;
    }
    router.push("/payment-feature");
  };

  return (
    <form className="mt-8 space-y-10" onSubmit={handleSubmit}>
      <section className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Data Rekening Settlement</h3>
          <p className="text-sm text-gray-500">Rekening tujuan pencairan dana settlement merchant.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="bankName">
              Nama Bank
            </label>
            <Select value={bankName} onValueChange={setBankName}>
              <SelectTrigger id="bankName" className="mt-2 h-11 rounded-xl border-gray-200 px-4 text-sm">
                <SelectValue placeholder="Pilih bank" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bca">BCA</SelectItem>
                <SelectItem value="bni">BNI</SelectItem>
                <SelectItem value="bri">BRI</SelectItem>
                <SelectItem value="mandiri">Mandiri</SelectItem>
              </SelectContent>
            </Select>
            <input type="hidden" name="bankName" value={bankName} />
            {fieldErrors.bankName && <p className="mt-2 text-xs text-red-500">{fieldErrors.bankName}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="bankAccountNumber">
              Nomor Akun Bank
            </label>
            <input
              id="bankAccountNumber"
              name="bankAccountNumber"
              type="text"
              inputMode="numeric"
              value={bankAccountNumber}
              onChange={handleNumericChange(setBankAccountNumber)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              placeholder="Masukkan nomor rekening"
              required
            />
            {fieldErrors.bankAccountNumber && (
              <p className="mt-2 text-xs text-red-500">{fieldErrors.bankAccountNumber}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="bankAccountName">
              Nama Pemilik Akun
            </label>
            <input
              id="bankAccountName"
              name="bankAccountName"
              type="text"
              value={bankAccountName}
              onChange={(event) => setBankAccountName(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              placeholder="Masukkan nama pemilik akun"
              required
            />
            {fieldErrors.bankAccountName && (
              <p className="mt-2 text-xs text-red-500">{fieldErrors.bankAccountName}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="settlementEmail">
              Email Settlement
            </label>
            <input
              id="settlementEmail"
              name="settlementEmail"
              type="email"
              value={settlementEmail}
              onChange={(event) => setSettlementEmail(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              placeholder="Masukkan email settlement"
              required
            />
            {fieldErrors.settlementEmail && (
              <p className="mt-2 text-xs text-red-500">{fieldErrors.settlementEmail}</p>
            )}
          </div>
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => router.push("/business-entity/pic-admin")}
          className="rounded-xl border border-gray-200 px-5 py-2 text-sm font-semibold text-gray-700"
        >
          Kembali
        </button>
        <div className="ml-auto">
          <button
            type="submit"
            className="rounded-xl bg-teal-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-600"
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </form>
  );
}
