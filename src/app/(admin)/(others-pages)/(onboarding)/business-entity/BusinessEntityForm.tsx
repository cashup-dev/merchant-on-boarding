"use client";

import UploadPreviewField from "@/components/form/UploadPreviewField";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Check, ChevronRight } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";

export default function BusinessEntityForm() {
  const [activeStep, setActiveStep] = useState<"business" | "address" | "bank">("business");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [brandName, setBrandName] = useState("");
  const [legalName, setLegalName] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [businessCategory, setBusinessCategory] = useState("");
  const [establishedYear, setEstablishedYear] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");
  const [monthlyVolume, setMonthlyVolume] = useState("");
  const [socialType, setSocialType] = useState("website");
  const [socialLink, setSocialLink] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [subDistrict, setSubDistrict] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [insideOfficeFile, setInsideOfficeFile] = useState<File | null>(null);
  const [outsideOfficeFile, setOutsideOfficeFile] = useState<File | null>(null);
  const [insideOfficePreview, setInsideOfficePreview] = useState("");
  const [outsideOfficePreview, setOutsideOfficePreview] = useState("");
  const [ownerKtpFile, setOwnerKtpFile] = useState<File | null>(null);
  const [ownerNpwpFile, setOwnerNpwpFile] = useState<File | null>(null);
  const [ownerKtpPreview, setOwnerKtpPreview] = useState("");
  const [ownerNpwpPreview, setOwnerNpwpPreview] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerNik, setOwnerNik] = useState("");
  const [ownerNpwp, setOwnerNpwp] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankBookFile, setBankBookFile] = useState<File | null>(null);
  const [bankMutationFile, setBankMutationFile] = useState<File | null>(null);
  const [bankBookPreview, setBankBookPreview] = useState("");
  const [bankMutationPreview, setBankMutationPreview] = useState("");

  const yearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= currentYear - 60; year -= 1) {
      years.push(`${year}`);
    }
    return years;
  }, []);

  useEffect(() => {
    if (!logoFile || !logoFile.type.startsWith("image/")) {
      setLogoPreview("");
      return;
    }
    const url = URL.createObjectURL(logoFile);
    setLogoPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [logoFile]);

  useEffect(() => {
    if (!insideOfficeFile || !insideOfficeFile.type.startsWith("image/")) {
      setInsideOfficePreview("");
      return;
    }
    const url = URL.createObjectURL(insideOfficeFile);
    setInsideOfficePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [insideOfficeFile]);

  useEffect(() => {
    if (!outsideOfficeFile || !outsideOfficeFile.type.startsWith("image/")) {
      setOutsideOfficePreview("");
      return;
    }
    const url = URL.createObjectURL(outsideOfficeFile);
    setOutsideOfficePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [outsideOfficeFile]);

  useEffect(() => {
    if (!ownerKtpFile || !ownerKtpFile.type.startsWith("image/")) {
      setOwnerKtpPreview("");
      return;
    }
    const url = URL.createObjectURL(ownerKtpFile);
    setOwnerKtpPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [ownerKtpFile]);

  useEffect(() => {
    if (!ownerNpwpFile || !ownerNpwpFile.type.startsWith("image/")) {
      setOwnerNpwpPreview("");
      return;
    }
    const url = URL.createObjectURL(ownerNpwpFile);
    setOwnerNpwpPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [ownerNpwpFile]);

  useEffect(() => {
    if (!bankBookFile || !bankBookFile.type.startsWith("image/")) {
      setBankBookPreview("");
      return;
    }
    const url = URL.createObjectURL(bankBookFile);
    setBankBookPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [bankBookFile]);

  useEffect(() => {
    if (!bankMutationFile || !bankMutationFile.type.startsWith("image/")) {
      setBankMutationPreview("");
      return;
    }
    const url = URL.createObjectURL(bankMutationFile);
    setBankMutationPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [bankMutationFile]);

  const isBusinessStepValid =
    brandName.trim().length > 0 &&
    legalName.trim().length > 0 &&
    businessDescription.trim().length > 0 &&
    businessCategory !== "" &&
    establishedYear !== "" &&
    employeeCount !== "" &&
    monthlyVolume !== "";

  const isAddressStepValid =
    province !== "" &&
    city !== "" &&
    district !== "" &&
    subDistrict !== "" &&
    addressDetail.trim().length > 0 &&
    postalCode.trim().length > 0;

  const isBankStepValid =
    ownerName.trim().length > 0 &&
    ownerNik.trim().length > 0 &&
    ownerNpwp.trim().length > 0 &&
    bankName !== "" &&
    bankAccountNumber.trim().length > 0 &&
    bankAccountName.trim().length > 0;

  return (
    <form
      id="business-entity-form"
      className="mt-8 space-y-8"
      onReset={() => {
        setActiveStep("business");
        setLogoFile(null);
        setLogoPreview("");
        setBrandName("");
        setLegalName("");
        setBusinessDescription("");
        setBusinessCategory("");
        setEstablishedYear("");
        setEmployeeCount("");
        setMonthlyVolume("");
        setSocialType("website");
        setSocialLink("");
        setProvince("");
        setCity("");
        setDistrict("");
        setSubDistrict("");
        setAddressDetail("");
        setPostalCode("");
        setInsideOfficeFile(null);
        setOutsideOfficeFile(null);
        setInsideOfficePreview("");
        setOutsideOfficePreview("");
        setOwnerKtpFile(null);
        setOwnerNpwpFile(null);
        setOwnerKtpPreview("");
        setOwnerNpwpPreview("");
        setOwnerName("");
        setOwnerNik("");
        setOwnerNpwp("");
        setBankName("");
        setBankAccountNumber("");
        setBankAccountName("");
        setBankBookFile(null);
        setBankMutationFile(null);
        setBankBookPreview("");
        setBankMutationPreview("");
      }}
      onSubmit={(event) => {
        event.preventDefault();
        if (activeStep === "business" && isBusinessStepValid) {
          setActiveStep("address");
          return;
        }
        if (activeStep === "address" && isAddressStepValid) {
          setActiveStep("bank");
        }
      }}
    >
      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
        <span
          className={`inline-flex h-7 w-7 items-center justify-center rounded-full font-semibold ${
            activeStep === "business"
              ? "bg-teal-100 text-teal-700"
              : "bg-gray-100 text-teal-600"
          }`}
        >
          {activeStep === "business" ? "1" : <Check className="h-4 w-4" />}
        </span>
        <span className={activeStep === "business" ? "font-semibold text-gray-900" : "text-gray-400"}>
          Business Information
        </span>
        <ChevronRight className="h-4 w-4 text-gray-300" />
        <span
          className={`inline-flex h-7 w-7 items-center justify-center rounded-full font-semibold ${
            activeStep === "address"
              ? "bg-teal-100 text-teal-700"
              : activeStep === "bank"
              ? "bg-gray-100 text-teal-600"
              : "bg-gray-100 text-gray-400"
          }`}
        >
          {activeStep === "bank" ? <Check className="h-4 w-4" /> : "2"}
        </span>
        <span
          className={
            activeStep === "address" || activeStep === "bank"
              ? "font-semibold text-gray-900"
              : "text-gray-400"
          }
        >
          Business Address
        </span>
        <ChevronRight className="h-4 w-4 text-gray-300" />
        <span
          className={`inline-flex h-7 w-7 items-center justify-center rounded-full font-semibold ${
            activeStep === "bank" ? "bg-teal-100 text-teal-700" : "bg-gray-100 text-gray-400"
          }`}
        >
          3
        </span>
        <span className={activeStep === "bank" ? "font-semibold text-gray-900" : "text-gray-400"}>
          Bank & Document Detail
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-3">
        {activeStep !== "business" ? (
          <button
            type="button"
            className="rounded-xl border border-gray-200 px-5 py-2 text-sm font-semibold text-gray-700"
            onClick={(event) => {
              event.preventDefault();
              setActiveStep(activeStep === "bank" ? "address" : "business");
            }}
          >
            Previous
          </button>
        ) : (
          <button
            type="reset"
            className="rounded-xl border border-gray-200 px-5 py-2 text-sm font-semibold text-gray-700"
          >
            Clear all
          </button>
        )}
        <button
          type="submit"
          disabled={
            activeStep === "business"
              ? !isBusinessStepValid
              : activeStep === "address"
              ? !isAddressStepValid
              : !isBankStepValid
          }
          className={`rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition ${
            activeStep === "business" ? "bg-teal-500 hover:bg-teal-600" : "bg-teal-500 hover:bg-teal-600"
          } ${
            activeStep === "business"
              ? !isBusinessStepValid
                ? "cursor-not-allowed opacity-60"
                : ""
              : activeStep === "address"
              ? !isAddressStepValid
                ? "cursor-not-allowed opacity-60"
                : ""
              : !isBankStepValid
              ? "cursor-not-allowed opacity-60"
              : ""
          }`}
        >
          {activeStep === "bank" ? "Submit" : "Next"}
        </button>
      </div>
      {activeStep === "business" && (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="md:col-span-1">
            <UploadPreviewField
              id="companyLogo"
              name="companyLogo"
              label="Company Logo"
              accept="image/*"
              file={logoFile}
              previewUrl={logoPreview}
              onFileChange={setLogoFile}
              onClear={() => setLogoFile(null)}
              previewAlt="Preview logo"
              previewHeightClass="h-32"
            />
            <p className="mt-2 text-xs text-gray-500">
              Hanya JPEG/PNG dengan ukuran maksimal 5MB.
            </p>
          </div>
          <div className="hidden md:block" aria-hidden="true" />

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="brandName">
              Brand Name<span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
            </label>
            <input
              id="brandName"
              name="brandName"
              type="text"
              value={brandName}
              onChange={(event) => setBrandName(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              placeholder="Autofill dari signup"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="legalName">
              Business Legal Name<span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
            </label>
            <input
              id="legalName"
              name="legalName"
              type="text"
              value={legalName}
              onChange={(event) => setLegalName(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              placeholder="e.g. PT Sejahtera"
              required
            />
          </div>

          <div className="md:col-span-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700" htmlFor="businessDescription">
                Business Description<span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
              </label>
              <span className="text-xs text-gray-400">{businessDescription.length}/100</span>
            </div>
            <Textarea
              id="businessDescription"
              name="businessDescription"
              value={businessDescription}
              onChange={(event) => setBusinessDescription(event.target.value.slice(0, 100))}
              className="mt-2 min-h-[96px] rounded-xl border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus-visible:border-gray-400 focus-visible:ring-0"
              placeholder="Ceritakan tentang bisnis Anda"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="businessCategory">
              Business Category<span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
            </label>
            <Select value={businessCategory} onValueChange={setBusinessCategory}>
              <SelectTrigger id="businessCategory" className="mt-2 h-11 rounded-xl border-gray-200 px-4 text-sm">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="food">Food & Beverage</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="service">Service</SelectItem>
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="health">Health</SelectItem>
              </SelectContent>
            </Select>
            <input type="hidden" name="businessCategory" value={businessCategory} />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="establishedYear">
              Established Since<span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
            </label>
            <Select value={establishedYear} onValueChange={setEstablishedYear}>
              <SelectTrigger id="establishedYear" className="mt-2 h-11 rounded-xl border-gray-200 px-4 text-sm">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {yearOptions.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input type="hidden" name="establishedYear" value={establishedYear} />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="employeeCount">
              Estimated Current Employees<span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
            </label>
            <Select value={employeeCount} onValueChange={setEmployeeCount}>
              <SelectTrigger id="employeeCount" className="mt-2 h-11 rounded-xl border-gray-200 px-4 text-sm">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-5">1-5</SelectItem>
                <SelectItem value="6-20">6-20</SelectItem>
                <SelectItem value="21-50">21-50</SelectItem>
                <SelectItem value="51-200">51-200</SelectItem>
                <SelectItem value="200+">200+</SelectItem>
              </SelectContent>
            </Select>
            <input type="hidden" name="employeeCount" value={employeeCount} />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="monthlyVolume">
              Volume Transaction Estimation Monthly<span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
            </label>
            <Select value={monthlyVolume} onValueChange={setMonthlyVolume}>
              <SelectTrigger id="monthlyVolume" className="mt-2 h-11 rounded-xl border-gray-200 px-4 text-sm">
                <SelectValue placeholder="Select volume" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="<10m">{`< 10 juta`}</SelectItem>
                <SelectItem value="10-50m">10 - 50 juta</SelectItem>
                <SelectItem value="50-200m">50 - 200 juta</SelectItem>
                <SelectItem value="200-500m">200 - 500 juta</SelectItem>
                <SelectItem value="500m+">{`> 500 juta`}</SelectItem>
              </SelectContent>
            </Select>
            <input type="hidden" name="monthlyVolume" value={monthlyVolume} />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="socialLink">
              Business Website or Social Media Link
            </label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <Select value={socialType} onValueChange={setSocialType}>
                <SelectTrigger className="h-11 w-full rounded-xl border-gray-200 px-4 text-sm sm:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                </SelectContent>
              </Select>
              <input
                id="socialLink"
                name="socialLink"
                type="text"
                value={socialLink}
                onChange={(event) => setSocialLink(event.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
                placeholder="www.yourbrand.com"
              />
            </div>
            <input type="hidden" name="socialType" value={socialType} />
          </div>

          <button type="button" className="text-left text-sm font-semibold text-teal-500">
            See guideline
          </button>
        </div>
      )}

      {activeStep === "address" && (
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="province">
              Province<span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
            </label>
            <Select value={province} onValueChange={setProvince}>
              <SelectTrigger id="province" className="mt-2 h-11 rounded-xl border-gray-200 px-4 text-sm">
                <SelectValue placeholder="Select province" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dki">DKI Jakarta</SelectItem>
                <SelectItem value="jabar">Jawa Barat</SelectItem>
                <SelectItem value="jateng">Jawa Tengah</SelectItem>
                <SelectItem value="jatim">Jawa Timur</SelectItem>
              </SelectContent>
            </Select>
            <input type="hidden" name="province" value={province} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="city">
              City<span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
            </label>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger id="city" className="mt-2 h-11 rounded-xl border-gray-200 px-4 text-sm">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jakarta">Jakarta</SelectItem>
                <SelectItem value="bandung">Bandung</SelectItem>
                <SelectItem value="semarang">Semarang</SelectItem>
                <SelectItem value="surabaya">Surabaya</SelectItem>
              </SelectContent>
            </Select>
            <input type="hidden" name="city" value={city} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="district">
              District<span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
            </label>
            <Select value={district} onValueChange={setDistrict}>
              <SelectTrigger id="district" className="mt-2 h-11 rounded-xl border-gray-200 px-4 text-sm">
                <SelectValue placeholder="Select district" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="district-1">District 1</SelectItem>
                <SelectItem value="district-2">District 2</SelectItem>
              </SelectContent>
            </Select>
            <input type="hidden" name="district" value={district} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="subDistrict">
              Sub-district<span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
            </label>
            <Select value={subDistrict} onValueChange={setSubDistrict}>
              <SelectTrigger id="subDistrict" className="mt-2 h-11 rounded-xl border-gray-200 px-4 text-sm">
                <SelectValue placeholder="Select sub-district" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sub-1">Sub-district 1</SelectItem>
                <SelectItem value="sub-2">Sub-district 2</SelectItem>
              </SelectContent>
            </Select>
            <input type="hidden" name="subDistrict" value={subDistrict} />
          </div>
          <div className="md:col-span-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700" htmlFor="addressDetail">
                Address Detail<span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
              </label>
              <span className="text-xs text-gray-400">{addressDetail.length}/100</span>
            </div>
            <Textarea
              id="addressDetail"
              name="addressDetail"
              value={addressDetail}
              onChange={(event) => setAddressDetail(event.target.value.slice(0, 100))}
              className="mt-2 min-h-[96px] rounded-xl border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus-visible:border-gray-400 focus-visible:ring-0"
              placeholder="Street address, building number, apt, unit, etc"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="postalCode">
              Postal Code<span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
            </label>
            <input
              id="postalCode"
              name="postalCode"
              type="text"
              value={postalCode}
              onChange={(event) => setPostalCode(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              placeholder="Postal code"
              required
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <p className="text-sm font-medium text-gray-700">Office Photo</p>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <UploadPreviewField
                  id="insideOfficePhoto"
                  name="insideOfficePhoto"
                  label="Inside Office Room Photo"
                  accept="image/*"
                  file={insideOfficeFile}
                  previewUrl={insideOfficePreview}
                  onFileChange={setInsideOfficeFile}
                  onClear={() => setInsideOfficeFile(null)}
                  previewAlt="Preview inside office"
                  previewHeightClass="h-36"
                />
                <p className="mt-2 text-xs text-gray-500">Only JPEG/PNG, maksimum 5MB.</p>
                <button type="button" className="mt-2 text-sm font-semibold text-teal-500">
                  See guideline
                </button>
              </div>
              <div>
                <UploadPreviewField
                  id="outsideOfficePhoto"
                  name="outsideOfficePhoto"
                  label="Outside Office Room Photo"
                  accept="image/*"
                  file={outsideOfficeFile}
                  previewUrl={outsideOfficePreview}
                  onFileChange={setOutsideOfficeFile}
                  onClear={() => setOutsideOfficeFile(null)}
                  previewAlt="Preview outside office"
                  previewHeightClass="h-36"
                />
                <p className="mt-2 text-xs text-gray-500">Only JPEG/PNG, maksimum 5MB.</p>
                <button type="button" className="mt-2 text-sm font-semibold text-teal-500">
                  See guideline
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeStep === "bank" && (
        <div className="space-y-8">
          <p className="text-sm font-semibold text-orange-500">
            Upload document only JPEG, JPG, PNG, PDF files with maximum file size of 5 MB
          </p>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Owner/Director Information</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <UploadPreviewField
                  id="ownerKtp"
                  name="ownerKtp"
                  label="Foto KTP Pemilik Bisnis"
                  accept="image/*,application/pdf"
                  file={ownerKtpFile}
                  previewUrl={ownerKtpPreview}
                  onFileChange={setOwnerKtpFile}
                  onClear={() => setOwnerKtpFile(null)}
                  previewAlt="Preview KTP pemilik"
                  previewHeightClass="h-36"
                />
                <button type="button" className="mt-2 text-sm font-semibold text-teal-500">
                  See guideline
                </button>
              </div>
              <div>
                <UploadPreviewField
                  id="ownerNpwpPhoto"
                  name="ownerNpwpPhoto"
                  label="Foto NPWP Pemilik Bisnis"
                  accept="image/*,application/pdf"
                  file={ownerNpwpFile}
                  previewUrl={ownerNpwpPreview}
                  onFileChange={setOwnerNpwpFile}
                  onClear={() => setOwnerNpwpFile(null)}
                  previewAlt="Preview NPWP pemilik"
                  previewHeightClass="h-36"
                />
                <button type="button" className="mt-2 text-sm font-semibold text-teal-500">
                  See guideline
                </button>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700" htmlFor="ownerName">
                  Nama Pemilik Bisnis<span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
                </label>
                <input
                  id="ownerName"
                  name="ownerName"
                  type="text"
                  value={ownerName}
                  onChange={(event) => setOwnerName(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
                  placeholder="Input name"
                  required
                />
                <p className="mt-2 text-xs text-gray-400">Sesuai KTP</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700" htmlFor="ownerNik">
                  NIK Pemilik Bisnis<span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
                </label>
                <input
                  id="ownerNik"
                  name="ownerNik"
                  type="text"
                  value={ownerNik}
                  onChange={(event) => setOwnerNik(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
                  placeholder="123456789101112"
                  required
                />
                <p className="mt-2 text-xs text-gray-400">
                  Sesuai Akta Pendirian/Perubahan Perusahaan
                </p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="ownerNpwp">
                  NPWP16 Pemilik Bisnis<span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
                </label>
                <input
                  id="ownerNpwp"
                  name="ownerNpwp"
                  type="text"
                  value={ownerNpwp}
                  onChange={(event) => setOwnerNpwp(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
                  placeholder="1414 1414 1414 1414"
                  required
                />
                <p className="mt-2 text-xs text-gray-400">
                  Sesuai Akta Pendirian/Perubahan Perusahaan
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Bank Information</h3>
            <p className="text-sm text-gray-500">You will accept money to this account</p>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-gray-700" htmlFor="bankName">
                  Nama Bank<span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
                </label>
                <Select value={bankName} onValueChange={setBankName}>
                  <SelectTrigger id="bankName" className="mt-2 h-11 rounded-xl border-gray-200 px-4 text-sm">
                    <SelectValue placeholder="Select bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bca">BCA</SelectItem>
                    <SelectItem value="bni">BNI</SelectItem>
                    <SelectItem value="bri">BRI</SelectItem>
                    <SelectItem value="mandiri">Mandiri</SelectItem>
                  </SelectContent>
                </Select>
                <input type="hidden" name="bankName" value={bankName} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700" htmlFor="bankAccountNumber">
                  Nomor Rekening Bank<span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
                </label>
                <input
                  id="bankAccountNumber"
                  name="bankAccountNumber"
                  type="text"
                  value={bankAccountNumber}
                  onChange={(event) => setBankAccountNumber(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
                  placeholder="Input nomor rekening"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700" htmlFor="bankAccountName">
                  Nama Pemilik Rekening<span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
                </label>
                <input
                  id="bankAccountName"
                  name="bankAccountName"
                  type="text"
                  value={bankAccountName}
                  onChange={(event) => setBankAccountName(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
                  placeholder="Input nama pemilik rekening"
                  required
                />
              </div>
              <div />
              <div>
                <UploadPreviewField
                  id="bankBookCover"
                  name="bankBookCover"
                  label="Cover Buku Tabungan"
                  accept="image/*,application/pdf"
                  file={bankBookFile}
                  previewUrl={bankBookPreview}
                  onFileChange={setBankBookFile}
                  onClear={() => setBankBookFile(null)}
                  previewAlt="Preview buku tabungan"
                  previewHeightClass="h-36"
                />
                <button type="button" className="mt-2 text-sm font-semibold text-teal-500">
                  See guideline
                </button>
              </div>
              <div>
                <UploadPreviewField
                  id="bankMutation"
                  name="bankMutation"
                  label="Mutasi Rekening 3 Bulan Terakhir"
                  accept="image/*,application/pdf"
                  file={bankMutationFile}
                  previewUrl={bankMutationPreview}
                  onFileChange={setBankMutationFile}
                  onClear={() => setBankMutationFile(null)}
                  previewAlt="Preview mutasi rekening"
                  previewHeightClass="h-36"
                />
                <button type="button" className="mt-2 text-sm font-semibold text-teal-500">
                  See guideline
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
