"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useOnboardingDraft } from "../_hooks/useOnboardingDraft";
import { useAddressCascade } from "../_hooks/useAddressCascade";
import { ownerSchema } from "../_schema/owner.schema";
import type { OwnerStepData } from "../_schema/types";
import { buildOwnerDraftSection, buildOwnerMeta, mapZodErrors } from "../_utils/normalize";
import {
  cityOptionsByProvince,
  districtOptionsByCity,
  provinceOptions,
  subdistrictOptionsByDistrict,
} from "../_utils/locations";
import { AddressFields } from "./AddressFields";
import { ImageUploadField } from "./ImageUploadField";

const imageAccept = "image/jpeg,image/png";

export function OwnerStepForm() {
  const router = useRouter();
  const { draft, meta, saveDraft } = useOnboardingDraft();
  const [initialized, setInitialized] = useState(false);

  const [ownerName, setOwnerName] = useState("");
  const [ownerBirthDate, setOwnerBirthDate] = useState("");
  const [ownerBirthPlace, setOwnerBirthPlace] = useState("");
  const [ownerCitizenship, setOwnerCitizenship] = useState("");
  const [ownerNik, setOwnerNik] = useState("");
  const [ownerPassportNumber, setOwnerPassportNumber] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerDomicileSame, setOwnerDomicileSame] = useState(false);

  const {
    address: ownerKtpAddress,
    setStreetName: setOwnerKtpStreetName,
    setRt: setOwnerKtpRt,
    setRw: setOwnerKtpRw,
    setProvinceId: setOwnerKtpProvinceId,
    setCityId: setOwnerKtpCityId,
    setDistrictId: setOwnerKtpDistrictId,
    setSubdistrictId: setOwnerKtpSubdistrictId,
    setPostalCode: setOwnerKtpPostalCode,
    setAddress: setOwnerKtpAddress,
  } = useAddressCascade();

  const {
    address: ownerDomicileAddress,
    setStreetName: setOwnerDomicileStreetName,
    setRt: setOwnerDomicileRt,
    setRw: setOwnerDomicileRw,
    setProvinceId: setOwnerDomicileProvinceId,
    setCityId: setOwnerDomicileCityId,
    setDistrictId: setOwnerDomicileDistrictId,
    setSubdistrictId: setOwnerDomicileSubdistrictId,
    setPostalCode: setOwnerDomicilePostalCode,
    setAddress: setOwnerDomicileAddress,
  } = useAddressCascade();

  const [ownerKtpFile, setOwnerKtpFile] = useState<File | null>(null);
  const [ownerPassportFile, setOwnerPassportFile] = useState<File | null>(null);
  const [ownerNpwpFile, setOwnerNpwpFile] = useState<File | null>(null);
  const [photoErrors, setPhotoErrors] = useState<Record<string, string>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [existingFiles, setExistingFiles] = useState<OwnerStepData["existingFiles"]>({
    ownerKtpFileName: "",
    ownerPassportFileName: "",
    ownerNpwpFileName: "",
  });

  useEffect(() => {
    if (!draft || initialized) {
      return;
    }
    setOwnerName(draft.owner?.name ?? "");
    setOwnerBirthDate(draft.owner?.birthDate ?? "");
    setOwnerBirthPlace(draft.owner?.birthPlace ?? "");
    setOwnerCitizenship(draft.owner?.citizenship ?? "");
    setOwnerNik(draft.owner?.nik ?? "");
    setOwnerPhone(draft.owner?.phoneNumber ?? "");
    setOwnerEmail(draft.owner?.email ?? "");
    setOwnerPassportNumber(meta?.owner?.passportNumber ?? "");
    setOwnerKtpAddress({
      streetName: draft.ownerKtpAddress?.streetName ?? "",
      rt: draft.ownerKtpAddress?.rt ?? "",
      rw: draft.ownerKtpAddress?.rw ?? "",
      provinceId: draft.ownerKtpAddress?.provinceId ?? "",
      cityId: draft.ownerKtpAddress?.cityId ?? "",
      districtId: draft.ownerKtpAddress?.districtId ?? "",
      subdistrictId: draft.ownerKtpAddress?.subdistrictId ?? "",
      postalCode: draft.ownerKtpAddress?.postalCode ?? "",
    });
    setOwnerDomicileSame(draft.ownerDomicileAddress?.isSameAsKtp ?? false);
    setOwnerDomicileAddress({
      streetName: draft.ownerDomicileAddress?.streetName ?? "",
      rt: draft.ownerDomicileAddress?.rt ?? "",
      rw: draft.ownerDomicileAddress?.rw ?? "",
      provinceId: draft.ownerDomicileAddress?.provinceId ?? "",
      cityId: draft.ownerDomicileAddress?.cityId ?? "",
      districtId: draft.ownerDomicileAddress?.districtId ?? "",
      subdistrictId: draft.ownerDomicileAddress?.subdistrictId ?? "",
      postalCode: draft.ownerDomicileAddress?.postalCode ?? "",
    });
    setExistingFiles({
      ownerKtpFileName: draft.owner?.ktpFileName ?? "",
      ownerNpwpFileName: draft.owner?.npwpFileName ?? "",
      ownerPassportFileName: "",
    });
    setInitialized(true);
  }, [draft, initialized, meta, setOwnerDomicileAddress, setOwnerKtpAddress]);

  useEffect(() => {
    if (!ownerDomicileSame) {
      return;
    }
    setOwnerDomicileAddress({
      ...ownerKtpAddress,
    });
  }, [ownerDomicileSame, ownerKtpAddress, setOwnerDomicileAddress]);

  const handleNumericChange = (setter: (value: string) => void) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setter(event.target.value.replace(/\D/g, ""));
  };

  const handleImageChange =
    (key: string, setter: (file: File | null) => void, nameKey: keyof OwnerStepData["existingFiles"]) =>
    (file: File | null) => {
      if (!file) {
        setter(null);
        setPhotoErrors((prev) => ({ ...prev, [key]: "" }));
        return;
      }
      if (!file.type.includes("jpeg") && !file.type.includes("png")) {
        setPhotoErrors((prev) => ({ ...prev, [key]: "Format harus JPG, JPEG, atau PNG." }));
        return;
      }
      setPhotoErrors((prev) => ({ ...prev, [key]: "" }));
      setter(file);
      setExistingFiles((prev) => ({ ...prev, [nameKey]: file.name }));
    };

  const payload: OwnerStepData = {
    ownerName,
    ownerBirthPlace,
    ownerBirthDate,
    ownerCitizenship,
    ownerNik,
    ownerPhone,
    ownerEmail,
    ownerPassportNumber,
    ownerKtpFile,
    ownerPassportFile,
    ownerNpwpFile,
    ownerKtpAddress,
    ownerDomicileAddress,
    ownerDomicileSame,
    existingFiles,
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFieldErrors({});
    const result = ownerSchema.safeParse(payload);
    if (!result.success) {
      setFieldErrors(mapZodErrors(result.error));
      return;
    }

    const businessEntity = buildOwnerDraftSection(payload);
    const metaPayload = buildOwnerMeta(payload);

    const success = await saveDraft(
      {
        owner: {
          businessEntity,
          meta: metaPayload,
        },
      },
      "owner",
    );

    if (!success) {
      return;
    }
    router.push("/business-entity/pic-admin");
  };

  const ownerLabel = draft?.business?.businessType === "company" ? "Direktur" : "Pemilik Usaha";
  const isForeignOwner = ownerCitizenship === "wna";

  return (
    <form className="mt-8 space-y-10" onSubmit={handleSubmit}>
      <section className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Data Pemilik Usaha / Direktur</h3>
          <p className="text-sm text-gray-500">Data {ownerLabel.toLowerCase()} utama untuk verifikasi.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="ownerName">
              Nama Pemilik Usaha / Direktur
            </label>
            <input
              id="ownerName"
              name="ownerName"
              type="text"
              value={ownerName}
              onChange={(event) => setOwnerName(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              placeholder="Masukkan nama pemilik usaha / direktur"
              required
            />
            {fieldErrors.ownerName && <p className="mt-2 text-xs text-red-500">{fieldErrors.ownerName}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="ownerBirthDate">
              Tanggal Lahir
            </label>
            <input
              id="ownerBirthDate"
              name="ownerBirthDate"
              type="date"
              value={ownerBirthDate}
              onChange={(event) => setOwnerBirthDate(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              placeholder="DD/MM/YYYY"
              required
            />
            {fieldErrors.ownerBirthDate && <p className="mt-2 text-xs text-red-500">{fieldErrors.ownerBirthDate}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="ownerCitizenship">
              Kewarganegaraan
            </label>
            <Select value={ownerCitizenship} onValueChange={setOwnerCitizenship}>
              <SelectTrigger id="ownerCitizenship" className="mt-2 h-11 rounded-xl border-gray-200 px-4 text-sm">
                <SelectValue placeholder="Pilih kewarganegaraan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wni">WNI</SelectItem>
                <SelectItem value="wna">WNA</SelectItem>
              </SelectContent>
            </Select>
            <input type="hidden" name="ownerCitizenship" value={ownerCitizenship} />
            {fieldErrors.ownerCitizenship && (
              <p className="mt-2 text-xs text-red-500">{fieldErrors.ownerCitizenship}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="ownerNik">
              {isForeignOwner ? "Nomor KITAS" : "NIK"}
            </label>
            <input
              id="ownerNik"
              name="ownerNik"
              type="text"
              inputMode="numeric"
              value={ownerNik}
              onChange={handleNumericChange(setOwnerNik)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              placeholder={isForeignOwner ? "Masukkan nomor KITAS" : "Masukkan NIK"}
              required
            />
            {fieldErrors.ownerNik && <p className="mt-2 text-xs text-red-500">{fieldErrors.ownerNik}</p>}
          </div>

          {isForeignOwner && (
            <div>
              <label className="text-sm font-medium text-gray-700" htmlFor="ownerPassportNumber">
                Nomor Paspor
              </label>
              <input
                id="ownerPassportNumber"
                name="ownerPassportNumber"
                type="text"
                value={ownerPassportNumber}
                onChange={(event) => setOwnerPassportNumber(event.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
                placeholder="Masukkan nomor paspor"
                required
              />
              {fieldErrors.ownerPassportNumber && (
                <p className="mt-2 text-xs text-red-500">{fieldErrors.ownerPassportNumber}</p>
              )}
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="ownerPhone">
              Nomor Handphone
            </label>
            <input
              id="ownerPhone"
              name="ownerPhone"
              type="tel"
              inputMode="numeric"
              value={ownerPhone}
              onChange={handleNumericChange(setOwnerPhone)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              placeholder="Masukkan nomor handphone"
              required
            />
            {fieldErrors.ownerPhone && <p className="mt-2 text-xs text-red-500">{fieldErrors.ownerPhone}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="ownerEmail">
              Email
            </label>
            <input
              id="ownerEmail"
              name="ownerEmail"
              type="email"
              value={ownerEmail}
              onChange={(event) => setOwnerEmail(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              placeholder="Masukkan alamat email"
              required
            />
            {fieldErrors.ownerEmail && <p className="mt-2 text-xs text-red-500">{fieldErrors.ownerEmail}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="ownerBirthPlace">
              Tempat Lahir
            </label>
            <input
              id="ownerBirthPlace"
              name="ownerBirthPlace"
              type="text"
              value={ownerBirthPlace}
              onChange={(event) => setOwnerBirthPlace(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              placeholder="Masukkan tempat lahir"
              required
            />
            {fieldErrors.ownerBirthPlace && (
              <p className="mt-2 text-xs text-red-500">{fieldErrors.ownerBirthPlace}</p>
            )}
          </div>

          <div className="md:col-span-2 grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-900">Alamat Pemilik (Sesuai KTP)</h4>
                <p className="text-xs text-gray-500">Lengkapi alamat sesuai KTP.</p>
              </div>
              <AddressFields
                idPrefix="ownerKtp"
                streetName={ownerKtpAddress.streetName}
                rt={ownerKtpAddress.rt}
                rw={ownerKtpAddress.rw}
                provinceId={ownerKtpAddress.provinceId}
                cityId={ownerKtpAddress.cityId}
                districtId={ownerKtpAddress.districtId}
                subdistrictId={ownerKtpAddress.subdistrictId}
                postalCode={ownerKtpAddress.postalCode}
                onStreetNameChange={setOwnerKtpStreetName}
                onRtChange={(value) => setOwnerKtpRt(value.replace(/\D/g, ""))}
                onRwChange={(value) => setOwnerKtpRw(value.replace(/\D/g, ""))}
                onProvinceChange={setOwnerKtpProvinceId}
                onCityChange={setOwnerKtpCityId}
                onDistrictChange={setOwnerKtpDistrictId}
                onSubdistrictChange={setOwnerKtpSubdistrictId}
                onPostalCodeChange={(value) => setOwnerKtpPostalCode(value.replace(/\D/g, ""))}
                provinceOptions={provinceOptions}
                cityOptions={cityOptionsByProvince[ownerKtpAddress.provinceId] ?? []}
                districtOptions={districtOptionsByCity[ownerKtpAddress.cityId] ?? []}
                subdistrictOptions={subdistrictOptionsByDistrict[ownerKtpAddress.districtId] ?? []}
                streetPlaceholder="Masukkan alamat lengkap sesuai KTP"
              />
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">Alamat Pemilik (Domisili)</h4>
                    <p className="text-xs text-gray-500">Lengkapi alamat domisili saat ini.</p>
                  </div>
                  <label className="inline-flex items-center gap-2 text-xs text-gray-600">
                    <input
                      type="checkbox"
                      checked={ownerDomicileSame}
                      onChange={(event) => setOwnerDomicileSame(event.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-teal-600"
                    />
                    Sama seperti alamat KTP
                  </label>
                </div>
              </div>
              <AddressFields
                idPrefix="ownerDomicile"
                streetName={ownerDomicileAddress.streetName}
                rt={ownerDomicileAddress.rt}
                rw={ownerDomicileAddress.rw}
                provinceId={ownerDomicileAddress.provinceId}
                cityId={ownerDomicileAddress.cityId}
                districtId={ownerDomicileAddress.districtId}
                subdistrictId={ownerDomicileAddress.subdistrictId}
                postalCode={ownerDomicileAddress.postalCode}
                onStreetNameChange={setOwnerDomicileStreetName}
                onRtChange={(value) => setOwnerDomicileRt(value.replace(/\D/g, ""))}
                onRwChange={(value) => setOwnerDomicileRw(value.replace(/\D/g, ""))}
                onProvinceChange={setOwnerDomicileProvinceId}
                onCityChange={setOwnerDomicileCityId}
                onDistrictChange={setOwnerDomicileDistrictId}
                onSubdistrictChange={setOwnerDomicileSubdistrictId}
                onPostalCodeChange={(value) => setOwnerDomicilePostalCode(value.replace(/\D/g, ""))}
                provinceOptions={provinceOptions}
                cityOptions={cityOptionsByProvince[ownerDomicileAddress.provinceId] ?? []}
                districtOptions={districtOptionsByCity[ownerDomicileAddress.cityId] ?? []}
                subdistrictOptions={subdistrictOptionsByDistrict[ownerDomicileAddress.districtId] ?? []}
                streetPlaceholder="Masukkan alamat lengkap domisili"
                required={!ownerDomicileSame}
                disabled={ownerDomicileSame}
              />
            </div>
          </div>

          <div>
            <ImageUploadField
              id="ownerKtp"
              name="ownerKtp"
              label={isForeignOwner ? "Upload KITAS" : "Upload KTP"}
              accept={imageAccept}
              file={ownerKtpFile}
              onFileChange={handleImageChange("ownerKtpFile", setOwnerKtpFile, "ownerKtpFileName")}
              onClear={() => setOwnerKtpFile(null)}
              previewAlt={isForeignOwner ? "Pratinjau KITAS" : "Pratinjau KTP"}
              previewHeightClass="h-36"
              error={photoErrors.ownerKtpFile || fieldErrors.ownerKtpFile}
            />
          </div>

          {isForeignOwner && (
            <div>
              <ImageUploadField
                id="ownerPassport"
                name="ownerPassport"
                label="Upload Paspor"
                accept={imageAccept}
                file={ownerPassportFile}
                onFileChange={handleImageChange("ownerPassportFile", setOwnerPassportFile, "ownerPassportFileName")}
                onClear={() => setOwnerPassportFile(null)}
                previewAlt="Pratinjau Paspor"
                previewHeightClass="h-36"
                error={photoErrors.ownerPassportFile || fieldErrors.ownerPassportFile}
              />
            </div>
          )}

          <div>
            <ImageUploadField
              id="ownerNpwp"
              name="ownerNpwp"
              label="NPWP Pemilik Usaha atau Direktur"
              accept={imageAccept}
              file={ownerNpwpFile}
              onFileChange={handleImageChange("ownerNpwpFile", setOwnerNpwpFile, "ownerNpwpFileName")}
              onClear={() => setOwnerNpwpFile(null)}
              previewAlt="Pratinjau NPWP"
              previewHeightClass="h-36"
              error={photoErrors.ownerNpwpFile || fieldErrors.ownerNpwpFile}
            />
          </div>
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => router.push("/business-entity/merchant")}
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
