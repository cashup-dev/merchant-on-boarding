"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useOnboardingDraft } from "../_hooks/useOnboardingDraft";
import { picAdminSchema } from "../_schema/pic.schema";
import type { PicAdminStepData } from "../_schema/types";
import { buildPicAdminDraftSection, mapZodErrors } from "../_utils/normalize";

export function PicAdminStepForm() {
  const router = useRouter();
  const { draft, saveDraft } = useOnboardingDraft();
  const [initialized, setInitialized] = useState(false);

  const [picName, setPicName] = useState("");
  const [picEmail, setPicEmail] = useState("");
  const [picPhone, setPicPhone] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!draft || initialized) {
      return;
    }
    setPicName(draft.picAdmin?.name ?? "");
    setPicEmail(draft.picAdmin?.email ?? "");
    setPicPhone(draft.picAdmin?.phoneNumber ?? "");
    setInitialized(true);
  }, [draft, initialized]);

  const handleNumericChange = (setter: (value: string) => void) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setter(event.target.value.replace(/\D/g, ""));
  };

  const payload: PicAdminStepData = {
    picName,
    picEmail,
    picPhone,
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFieldErrors({});
    const result = picAdminSchema.safeParse(payload);
    if (!result.success) {
      setFieldErrors(mapZodErrors(result.error));
      return;
    }

    const businessEntity = buildPicAdminDraftSection(payload);
    const success = await saveDraft(
      {
        picAdmin: {
          businessEntity,
        },
      },
      "pic-admin",
    );

    if (!success) {
      return;
    }
    router.push("/business-entity/settlement");
  };

  return (
    <form className="mt-8 space-y-10" onSubmit={handleSubmit}>
      <section className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Data PIC Admin</h3>
          <p className="text-sm text-gray-500">PIC Admin dapat berbeda dengan pemilik usaha.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="picName">
              Nama PIC Admin
            </label>
            <input
              id="picName"
              name="picName"
              type="text"
              value={picName}
              onChange={(event) => setPicName(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              placeholder="Masukkan nama PIC"
              required
            />
            {fieldErrors.picName && <p className="mt-2 text-xs text-red-500">{fieldErrors.picName}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="picEmail">
              Email
            </label>
            <input
              id="picEmail"
              name="picEmail"
              type="email"
              value={picEmail}
              onChange={(event) => setPicEmail(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              placeholder="Masukkan alamat email"
              required
            />
            {fieldErrors.picEmail && <p className="mt-2 text-xs text-red-500">{fieldErrors.picEmail}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="picPhone">
              Nomor Handphone
            </label>
            <input
              id="picPhone"
              name="picPhone"
              type="tel"
              inputMode="numeric"
              value={picPhone}
              onChange={handleNumericChange(setPicPhone)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              placeholder="Masukkan nomor handphone"
              required
            />
            {fieldErrors.picPhone && <p className="mt-2 text-xs text-red-500">{fieldErrors.picPhone}</p>}
          </div>
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => router.push("/business-entity/owner")}
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
