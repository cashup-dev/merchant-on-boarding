
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { InfoPopover } from "@/components/ui/InfoPopover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TableUpload from "@/components/table-upload";
import mccCodes from "@/data/mcc-codes.json";
import type { FileMetadata, FileWithPreview } from "@/hooks/use-file-upload";

import { useOnboardingDraft } from "../_hooks/useOnboardingDraft";
import { useAddressCascade } from "../_hooks/useAddressCascade";
import { merchantSchema } from "../_schema/merchant.schema";
import type { MerchantStepData } from "../_schema/types";
import { buildMerchantDraftSection, buildMerchantMeta, mapZodErrors } from "../_utils/normalize";
import {
  cityOptionsByProvince,
  districtOptionsByCity,
  provinceOptions,
  subdistrictOptionsByDistrict,
} from "../_utils/locations";
import { AddressFields } from "./AddressFields";
import { ImageUploadField } from "./ImageUploadField";

const imageAccept = "image/jpeg,image/png";
const pdfAccept = "application/pdf";

type MccEntry = {
  mcc: string;
  edited_description?: string;
  combined_description?: string;
};

export function MerchantStepForm() {
  const router = useRouter();
  const { draft, meta, saveDraft } = useOnboardingDraft();
  const [initialized, setInitialized] = useState(false);

  const [businessType, setBusinessType] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [merchantName, setMerchantName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [establishedYear, setEstablishedYear] = useState("");
  const [monthlyVolume, setMonthlyVolume] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [businessMode, setBusinessMode] = useState("");
  const [ownershipStatus, setOwnershipStatus] = useState("");
  const [mcc, setMcc] = useState("");

  const {
    address: businessAddress,
    setStreetName: setBusinessStreetName,
    setRt: setBusinessRt,
    setRw: setBusinessRw,
    setProvinceId: setBusinessProvinceId,
    setCityId: setBusinessCityId,
    setDistrictId: setBusinessDistrictId,
    setSubdistrictId: setBusinessSubdistrictId,
    setPostalCode: setBusinessPostalCode,
    setAddress: setBusinessAddress,
  } = useAddressCascade();

  const [deedFile, setDeedFile] = useState<FileWithPreview | null>(null);
  const [skKemenkumhamFile, setSkKemenkumhamFile] = useState<FileWithPreview | null>(null);
  const [nibCompanyFile, setNibCompanyFile] = useState<FileWithPreview | null>(null);
  const [npwpCompanyFile, setNpwpCompanyFile] = useState<File | null>(null);
  const [nibSkuFile, setNibSkuFile] = useState<FileWithPreview | null>(null);
  const [frontPhotoFile, setFrontPhotoFile] = useState<File | null>(null);
  const [insidePhotoFile, setInsidePhotoFile] = useState<File | null>(null);
  const [productPhotoFile, setProductPhotoFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [additionalDocumentFile, setAdditionalDocumentFile] = useState<FileWithPreview | null>(null);
  const [photoErrors, setPhotoErrors] = useState<Record<string, string>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [existingFiles, setExistingFiles] = useState<MerchantStepData["existingFiles"]>({
    deedFileName: "",
    skKemenkumhamFileName: "",
    nibCompanyFileName: "",
    npwpCompanyFileName: "",
    nibSkuFileName: "",
    frontPhotoFileName: "",
    insidePhotoFileName: "",
    productPhotoFileName: "",
    logoFileName: "",
    additionalDocumentFileName: "",
  });

  useEffect(() => {
    if (!draft || initialized) {
      return;
    }
    setBusinessType(draft.business?.businessType ?? "");
    setCompanyType(draft.business?.companyType ?? "");
    setMerchantName(draft.business?.merchantName ?? "");
    setCompanyName(draft.business?.companyName ?? "");
    setPhoneNumber(draft.business?.phoneNumber ?? "");
    setEmail(draft.business?.email ?? "");
    setWebsiteLink(draft.business?.websiteLink ?? "");
    setBusinessMode(draft.business?.businessMode ?? "");
    setOwnershipStatus(draft.business?.ownershipStatus ?? "");
    setMcc(draft.business?.mcc ?? "");
    setBusinessAddress({
      streetName: draft.businessAddress?.streetName ?? "",
      rt: draft.businessAddress?.rt ?? "",
      rw: draft.businessAddress?.rw ?? "",
      provinceId: draft.businessAddress?.provinceId ?? "",
      cityId: draft.businessAddress?.cityId ?? "",
      districtId: draft.businessAddress?.districtId ?? "",
      subdistrictId: draft.businessAddress?.subdistrictId ?? "",
      postalCode: draft.businessAddress?.postalCode ?? "",
    });
    setExistingFiles({
      deedFileName: draft.documents?.deedFileName ?? "",
      skKemenkumhamFileName: draft.documents?.skKemenkumhamFileName ?? "",
      nibCompanyFileName: draft.business?.nibNumber ?? "",
      npwpCompanyFileName: draft.business?.npwpNumber ?? "",
      nibSkuFileName: draft.documents?.nibSkuFileName ?? "",
      additionalDocumentFileName: draft.documents?.additionalDocumentFileName ?? "",
      frontPhotoFileName: draft.photos?.frontPhotoFileName ?? "",
      insidePhotoFileName: draft.photos?.insidePhotoFileName ?? "",
      productPhotoFileName: draft.photos?.productPhotoFileName ?? "",
      logoFileName: draft.photos?.logoFileName ?? "",
    });
    setEstablishedYear(meta?.merchant?.establishedYear ?? "");
    setMonthlyVolume(meta?.merchant?.monthlyVolume ?? "");
    setInitialized(true);
  }, [draft, initialized, meta, setBusinessAddress]);
  const yearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 100 }, (_, index) => String(currentYear - index));
  }, []);

  const mccOptions = useMemo(
    () =>
      (mccCodes as MccEntry[]).map((entry) => ({
        value: entry.mcc,
        label: entry.combined_description || entry.edited_description || entry.mcc,
      })),
    [],
  );

  const handleNumericChange = (setter: (value: string) => void) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setter(event.target.value.replace(/\D/g, ""));
  };

  const handleBusinessTypeChange = (value: string) => {
    setBusinessType(value);
    setCompanyType("");
    setDeedFile(null);
    setSkKemenkumhamFile(null);
    setNibSkuFile(null);
    setNibCompanyFile(null);
    setNpwpCompanyFile(null);
    setFrontPhotoFile(null);
    setInsidePhotoFile(null);
    setProductPhotoFile(null);
    setLogoFile(null);
    setAdditionalDocumentFile(null);
    setPhotoErrors({});
  };

  const handlePdfChange =
    (setter: (file: FileWithPreview | null) => void, nameKey: keyof MerchantStepData["existingFiles"]) =>
    (files: FileWithPreview[]) => {
      const file = files[0] ?? null;
      setter(file);
      if (file) {
        setExistingFiles((prev) => ({ ...prev, [nameKey]: file.file.name }));
      }
    };

  const handleImageChange =
    (key: string, setter: (file: File | null) => void, nameKey: keyof MerchantStepData["existingFiles"]) =>
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

  const buildValidationPayload = (): MerchantStepData => ({
    businessType,
    companyType,
    merchantName,
    companyName,
    establishedYear,
    monthlyVolume,
    phoneNumber,
    email,
    websiteLink,
    businessMode,
    ownershipStatus,
    mcc,
    businessAddress,
    deedFile,
    skKemenkumhamFile,
    nibCompanyFile,
    npwpCompanyFile,
    nibSkuFile,
    frontPhotoFile,
    insidePhotoFile,
    productPhotoFile,
    logoFile,
    additionalDocumentFile,
    existingFiles,
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFieldErrors({});
    const payload = buildValidationPayload();
    const result = merchantSchema.safeParse(payload);
    if (!result.success) {
      setFieldErrors(mapZodErrors(result.error));
      return;
    }

    const businessEntity = buildMerchantDraftSection(payload);
    const metaPayload = buildMerchantMeta(payload);

    const success = await saveDraft(
      {
        merchant: {
          businessEntity,
          meta: metaPayload,
        },
      },
      "merchant",
    );

    if (!success) {
      return;
    }
    router.push("/business-entity/owner");
  };

  const isCompany = businessType === "company";
  const isIndividual = businessType === "individual";
  return (
    <form className="mt-8 space-y-10" onSubmit={handleSubmit}>
      <section className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Informasi Merchant / Badan Usaha</h3>
          <p className="text-sm text-gray-500">Lengkapi data bisnis merchant sesuai jenis usaha.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Tipe Bisnis</label>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {[
                {
                  value: "individual",
                  title: "Individu",
                  description: "Bisnis yang dimiliki dan dikelola oleh satu individu.",
                },
                {
                  value: "company",
                  title: "Perusahaan",
                  description: "Bisnis yang dimiliki oleh suatu entitas dan memiliki hak dan kewajiban hukum sendiri.",
                },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleBusinessTypeChange(option.value)}
                  className={`flex h-full w-full flex-col items-start gap-2 rounded-2xl border px-4 py-4 text-left transition ${
                    businessType === option.value
                      ? "border-teal-500 bg-teal-50 text-teal-900"
                      : "border-gray-200 bg-white text-gray-700 hover:border-teal-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-4 w-4 rounded-full border ${
                        businessType === option.value ? "border-teal-500 bg-teal-500" : "border-gray-300"
                      }`}
                    />
                    <span className="text-sm font-semibold">{option.title}</span>
                  </div>
                  <span className="text-xs text-gray-500">{option.description}</span>
                </button>
              ))}
            </div>
            <input type="hidden" name="businessType" value={businessType} required />
            {fieldErrors.businessType && <p className="mt-2 text-xs text-red-500">{fieldErrors.businessType}</p>}
          </div>

          {isCompany && (
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Tipe Perusahaan</label>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {["PT", "CV", "Firma", "Koperasi", "Nirlaba"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setCompanyType(type)}
                    className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                      companyType === type
                        ? "border-teal-500 bg-teal-50 text-teal-900"
                        : "border-gray-200 text-gray-700 hover:border-teal-300"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <input type="hidden" name="companyType" value={companyType} required />
              {fieldErrors.companyType && <p className="mt-2 text-xs text-red-500">{fieldErrors.companyType}</p>}
            </div>
          )}

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="merchantName">
              Nama Merchant
            </label>
            <input
              id="merchantName"
              name="merchantName"
              type="text"
              value={merchantName}
              onChange={(event) => setMerchantName(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none"
              placeholder="Masukkan nama merchant"
              required
            />
            {fieldErrors.merchantName && <p className="mt-2 text-xs text-red-500">{fieldErrors.merchantName}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="companyName">
              Nama Perusahaan
            </label>
            <input
              id="companyName"
              name="companyName"
              type="text"
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              placeholder="Masukkan nama perusahaan"
              required
            />
            {fieldErrors.companyName && <p className="mt-2 text-xs text-red-500">{fieldErrors.companyName}</p>}
          </div>

          <div className="md:col-span-2 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-gray-700" htmlFor="establishedYear">
                Tahun Berdiri
              </label>
              <Select value={establishedYear} onValueChange={setEstablishedYear}>
                <SelectTrigger id="establishedYear" className="mt-2 h-11 rounded-xl border-gray-200 px-4 text-sm">
                  <SelectValue placeholder="Pilih tahun berdiri" />
                </SelectTrigger>
                <SelectContent>
                  {yearOptions.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input type="hidden" name="establishedYear" value={establishedYear} required />
              {fieldErrors.establishedYear && <p className="mt-2 text-xs text-red-500">{fieldErrors.establishedYear}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700" htmlFor="monthlyVolume">
                Perkiraan Volume Transaksi Bulanan
              </label>
              <input
                id="monthlyVolume"
                name="monthlyVolume"
                type="number"
                inputMode="numeric"
                value={monthlyVolume}
                onChange={(event) => setMonthlyVolume(event.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
                placeholder="Masukkan estimasi volume"
                required
              />
              {fieldErrors.monthlyVolume && <p className="mt-2 text-xs text-red-500">{fieldErrors.monthlyVolume}</p>}
            </div>
          </div>
          <AddressFields
            idPrefix="business"
            streetName={businessAddress.streetName}
            rt={businessAddress.rt}
            rw={businessAddress.rw}
            provinceId={businessAddress.provinceId}
            cityId={businessAddress.cityId}
            districtId={businessAddress.districtId}
            subdistrictId={businessAddress.subdistrictId}
            postalCode={businessAddress.postalCode}
            onStreetNameChange={setBusinessStreetName}
            onRtChange={(value) => setBusinessRt(value.replace(/\D/g, ""))}
            onRwChange={(value) => setBusinessRw(value.replace(/\D/g, ""))}
            onProvinceChange={setBusinessProvinceId}
            onCityChange={setBusinessCityId}
            onDistrictChange={setBusinessDistrictId}
            onSubdistrictChange={setBusinessSubdistrictId}
            onPostalCodeChange={(value) => setBusinessPostalCode(value.replace(/\D/g, ""))}
            provinceOptions={provinceOptions}
            cityOptions={cityOptionsByProvince[businessAddress.provinceId] ?? []}
            districtOptions={districtOptionsByCity[businessAddress.cityId] ?? []}
            subdistrictOptions={subdistrictOptionsByDistrict[businessAddress.districtId] ?? []}
            streetPlaceholder="Masukkan alamat lengkap"
            fullWidth
          />

          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="phoneNumber">
              Nomor Handphone
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              inputMode="numeric"
              value={phoneNumber}
              onChange={handleNumericChange(setPhoneNumber)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              placeholder="Masukkan nomor handphone"
              required
            />
            {fieldErrors.phoneNumber && <p className="mt-2 text-xs text-red-500">{fieldErrors.phoneNumber}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              placeholder="Masukkan alamat email"
              required
            />
            {fieldErrors.email && <p className="mt-2 text-xs text-red-500">{fieldErrors.email}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="websiteLink">
              Website (Optional)
            </label>
            <input
              id="websiteLink"
              name="websiteLink"
              type="url"
              value={websiteLink}
              onChange={(event) => setWebsiteLink(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              placeholder="Masukkan URL website"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Mode Usaha</label>
            <div className="mt-3 flex flex-wrap gap-3">
              {[
                { value: "online", label: "Online" },
                { value: "offline", label: "Offline" },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setBusinessMode(option.value)}
                  className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                    businessMode === option.value
                      ? "border-teal-500 bg-teal-50 text-teal-900"
                      : "border-gray-200 text-gray-700 hover:border-teal-300"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <input type="hidden" name="businessMode" value={businessMode} required />
            {fieldErrors.businessMode && <p className="mt-2 text-xs text-red-500">{fieldErrors.businessMode}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Status Kepemilikan</label>
            <div className="mt-3 flex flex-wrap gap-3">
              {[
                { value: "owned", label: "Milik Pribadi" },
                { value: "rent", label: "Sewa" },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setOwnershipStatus(option.value)}
                  className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                    ownershipStatus === option.value
                      ? "border-teal-500 bg-teal-50 text-teal-900"
                      : "border-gray-200 text-gray-700 hover:border-teal-300"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <input type="hidden" name="ownershipStatus" value={ownershipStatus} required />
            {fieldErrors.ownershipStatus && (
              <p className="mt-2 text-xs text-red-500">{fieldErrors.ownershipStatus}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="mcc">
              Kategori Usaha
            </label>
            <Select value={mcc} onValueChange={setMcc}>
              <SelectTrigger id="mcc" className="mt-2 h-11 rounded-xl border-gray-200 px-4 text-sm">
                <SelectValue placeholder="Pilih kategori usaha" />
              </SelectTrigger>
              <SelectContent>
                {mccOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input type="hidden" name="mcc" value={mcc} required />
            {fieldErrors.mcc && <p className="mt-2 text-xs text-red-500">{fieldErrors.mcc}</p>}
          </div>
          {businessType && (
            <>
              <div className="md:col-span-2 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">Dokumen Perusahaan</h4>
                  <p className="text-xs text-gray-500">Lengkapi dokumen sesuai jenis usaha.</p>
                </div>

                {isCompany && (
                  <div className="space-y-6">
                    <div className="grid gap-6 lg:grid-cols-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-700">Akta Perusahaan (&lt;= 5 tahun)</p>
                          <InfoPopover label="Informasi akta perusahaan">
                            *wajib untuk badan usaha PT/CV/Firma
                          </InfoPopover>
                        </div>
                        <TableUpload
                          maxFiles={1}
                          multiple={false}
                          accept={pdfAccept}
                          simulateUpload={false}
                          showDefaults={false}
                          initialFiles={
                            existingFiles.deedFileName
                              ? [
                                  {
                                    id: "deed-file",
                                    name: existingFiles.deedFileName,
                                    size: 0,
                                    type: "application/pdf",
                                  } as FileMetadata,
                                ]
                              : undefined
                          }
                          onFilesChange={handlePdfChange(setDeedFile, "deedFileName")}
                          className="mt-2"
                        />
                        {fieldErrors.deedFile && <p className="mt-2 text-xs text-red-500">{fieldErrors.deedFile}</p>}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-700">SK Kemenkumham</p>
                        </div>
                        <TableUpload
                          maxFiles={1}
                          multiple={false}
                          accept={pdfAccept}
                          simulateUpload={false}
                          showDefaults={false}
                          initialFiles={
                            existingFiles.skKemenkumhamFileName
                              ? [
                                  {
                                    id: "sk-kemenkumham",
                                    name: existingFiles.skKemenkumhamFileName,
                                    size: 0,
                                    type: "application/pdf",
                                  } as FileMetadata,
                                ]
                              : undefined
                          }
                          onFilesChange={handlePdfChange(setSkKemenkumhamFile, "skKemenkumhamFileName")}
                          className="mt-2"
                        />
                        {fieldErrors.skKemenkumhamFile && (
                          <p className="mt-2 text-xs text-red-500">{fieldErrors.skKemenkumhamFile}</p>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-700">NIB Perusahaan</p>
                          <InfoPopover label="Informasi NIB perusahaan">*Harus sesuai dengan bidang usaha</InfoPopover>
                        </div>
                        <TableUpload
                          maxFiles={1}
                          multiple={false}
                          accept={pdfAccept}
                          simulateUpload={false}
                          showDefaults={false}
                          initialFiles={
                            existingFiles.nibCompanyFileName
                              ? [
                                  {
                                    id: "nib-company",
                                    name: existingFiles.nibCompanyFileName,
                                    size: 0,
                                    type: "application/pdf",
                                  } as FileMetadata,
                                ]
                              : undefined
                          }
                          onFilesChange={handlePdfChange(setNibCompanyFile, "nibCompanyFileName")}
                          className="mt-2"
                        />
                        {fieldErrors.nibCompanyFile && (
                          <p className="mt-2 text-xs text-red-500">{fieldErrors.nibCompanyFile}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-700">NPWP Perusahaan</p>
                        </div>
                        <ImageUploadField
                          id="npwpNumber"
                          name="npwpNumber"
                          label=""
                          accept={imageAccept}
                          file={npwpCompanyFile}
                          onFileChange={handleImageChange("npwpCompanyFile", setNpwpCompanyFile, "npwpCompanyFileName")}
                          onClear={() => setNpwpCompanyFile(null)}
                          previewAlt="Pratinjau NPWP perusahaan"
                          previewHeightClass="h-36"
                          error={photoErrors.npwpCompanyFile || fieldErrors.npwpCompanyFile}
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-700">Foto Produk / Brosur / Price List</p>
                          <InfoPopover label="Informasi foto produk">
                            *Foto produk best seller / produk utama
                          </InfoPopover>
                        </div>
                        <ImageUploadField
                          id="productPhoto"
                          name="productPhoto"
                          label=""
                          accept={imageAccept}
                          file={productPhotoFile}
                          onFileChange={handleImageChange("productPhoto", setProductPhotoFile, "productPhotoFileName")}
                          onClear={() => setProductPhotoFile(null)}
                          previewAlt="Pratinjau foto produk"
                          previewHeightClass="h-36"
                          error={photoErrors.productPhoto || fieldErrors.productPhotoFile}
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-700">
                            Foto Usaha Tampak Depan (plang usaha terlihat)
                          </p>
                          <InfoPopover label="Informasi foto tampak depan">*Foto tampak depan lokasi usaha</InfoPopover>
                        </div>
                        <ImageUploadField
                          id="frontPhoto"
                          name="frontPhoto"
                          label=""
                          accept={imageAccept}
                          file={frontPhotoFile}
                          onFileChange={handleImageChange("frontPhoto", setFrontPhotoFile, "frontPhotoFileName")}
                          onClear={() => setFrontPhotoFile(null)}
                          previewAlt="Pratinjau foto tampak depan"
                          previewHeightClass="h-36"
                          error={photoErrors.frontPhoto || fieldErrors.frontPhotoFile}
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-700">
                            Foto Usaha Dalam (produk / aktivitas usaha)
                          </p>
                        </div>
                        <ImageUploadField
                          id="insidePhoto"
                          name="insidePhoto"
                          label=""
                          accept={imageAccept}
                          file={insidePhotoFile}
                          onFileChange={handleImageChange("insidePhoto", setInsidePhotoFile, "insidePhotoFileName")}
                          onClear={() => setInsidePhotoFile(null)}
                          previewAlt="Pratinjau foto usaha dalam"
                          previewHeightClass="h-36"
                          error={photoErrors.insidePhoto || fieldErrors.insidePhotoFile}
                        />
                      </div>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-700">Logo Usaha (optional)</p>
                          <InfoPopover label="Informasi logo usaha">
                            *Kredivo wajib lampirkan logo (bentuk JPEG)
                          </InfoPopover>
                        </div>
                        <ImageUploadField
                          id="logoFile"
                          name="logoFile"
                          label=""
                          accept={imageAccept}
                          file={logoFile}
                          onFileChange={handleImageChange("logoFile", setLogoFile, "logoFileName")}
                          onClear={() => setLogoFile(null)}
                          previewAlt="Pratinjau logo usaha"
                          previewHeightClass="h-36"
                          error={photoErrors.logoFile}
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-700">Dokumen Tambahan (optional)</p>
                          <InfoPopover label="Informasi dokumen tambahan">
                            *pengajuan Indodana lampirkan file excel sales volume, Online Card Payment lampirkan FPM BRI
                          </InfoPopover>
                        </div>
                        <TableUpload
                          maxFiles={1}
                          multiple={false}
                          accept={pdfAccept}
                          simulateUpload={false}
                          showDefaults={false}
                          initialFiles={
                            existingFiles.additionalDocumentFileName
                              ? [
                                  {
                                    id: "additional-doc",
                                    name: existingFiles.additionalDocumentFileName,
                                    size: 0,
                                    type: "application/pdf",
                                  } as FileMetadata,
                                ]
                              : undefined
                          }
                          onFilesChange={handlePdfChange(setAdditionalDocumentFile, "additionalDocumentFileName")}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {isIndividual && (
                  <div className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-700">
                            Foto Usaha Tampak Depan (plang usaha terlihat)
                          </p>
                          <InfoPopover label="Informasi foto tampak depan">*Foto tampak depan lokasi usaha</InfoPopover>
                        </div>
                        <ImageUploadField
                          id="frontPhoto"
                          name="frontPhoto"
                          label=""
                          accept={imageAccept}
                          file={frontPhotoFile}
                          onFileChange={handleImageChange("frontPhoto", setFrontPhotoFile, "frontPhotoFileName")}
                          onClear={() => setFrontPhotoFile(null)}
                          previewAlt="Pratinjau foto tampak depan"
                          previewHeightClass="h-36"
                          error={photoErrors.frontPhoto || fieldErrors.frontPhotoFile}
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-700">
                            Foto Usaha Dalam (produk / aktivitas usaha)
                          </p>
                        </div>
                        <ImageUploadField
                          id="insidePhoto"
                          name="insidePhoto"
                          label=""
                          accept={imageAccept}
                          file={insidePhotoFile}
                          onFileChange={handleImageChange("insidePhoto", setInsidePhotoFile, "insidePhotoFileName")}
                          onClear={() => setInsidePhotoFile(null)}
                          previewAlt="Pratinjau foto usaha dalam"
                          previewHeightClass="h-36"
                          error={photoErrors.insidePhoto || fieldErrors.insidePhotoFile}
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-700">Foto Produk / Brosur / Price List</p>
                          <InfoPopover label="Informasi foto produk">
                            *Foto produk best seller / produk utama
                          </InfoPopover>
                        </div>
                        <ImageUploadField
                          id="productPhoto"
                          name="productPhoto"
                          label=""
                          accept={imageAccept}
                          file={productPhotoFile}
                          onFileChange={handleImageChange("productPhoto", setProductPhotoFile, "productPhotoFileName")}
                          onClear={() => setProductPhotoFile(null)}
                          previewAlt="Pratinjau foto produk"
                          previewHeightClass="h-36"
                          error={photoErrors.productPhoto || fieldErrors.productPhotoFile}
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-700">NIB / SKU (Surat Keterangan Usaha)</p>
                          <InfoPopover label="Informasi NIB / SKU">*NIB/SKU sesuai jenis usaha</InfoPopover>
                        </div>
                        <TableUpload
                          maxFiles={1}
                          multiple={false}
                          accept={pdfAccept}
                          simulateUpload={false}
                          showDefaults={false}
                          initialFiles={
                            existingFiles.nibSkuFileName
                              ? [
                                  {
                                    id: "nib-sku",
                                    name: existingFiles.nibSkuFileName,
                                    size: 0,
                                    type: "application/pdf",
                                  } as FileMetadata,
                                ]
                              : undefined
                          }
                          onFilesChange={handlePdfChange(setNibSkuFile, "nibSkuFileName")}
                          className="mt-2"
                        />
                        {fieldErrors.nibSkuFile && (
                          <p className="mt-2 text-xs text-red-500">{fieldErrors.nibSkuFile}</p>
                        )}
                      </div>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-700">Logo Usaha (optional)</p>
                          <InfoPopover label="Informasi logo usaha">
                            *Kredivo wajib lampirkan logo (bentuk JPEG)
                          </InfoPopover>
                        </div>
                        <ImageUploadField
                          id="logoFile"
                          name="logoFile"
                          label=""
                          accept={imageAccept}
                          file={logoFile}
                          onFileChange={handleImageChange("logoFile", setLogoFile, "logoFileName")}
                          onClear={() => setLogoFile(null)}
                          previewAlt="Pratinjau logo usaha"
                          previewHeightClass="h-36"
                          error={photoErrors.logoFile}
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-700">Dokumen Tambahan (optional)</p>
                          <InfoPopover label="Informasi dokumen tambahan">
                            *pengajuan Indodana lampirkan file excel sales volume, Online Card Payment lampirkan FPM BRI
                          </InfoPopover>
                        </div>
                        <TableUpload
                          maxFiles={1}
                          multiple={false}
                          accept={pdfAccept}
                          simulateUpload={false}
                          showDefaults={false}
                          initialFiles={
                            existingFiles.additionalDocumentFileName
                              ? [
                                  {
                                    id: "additional-doc",
                                    name: existingFiles.additionalDocumentFileName,
                                    size: 0,
                                    type: "application/pdf",
                                  } as FileMetadata,
                                ]
                              : undefined
                          }
                          onFilesChange={handlePdfChange(setAdditionalDocumentFile, "additionalDocumentFileName")}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-3">
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

