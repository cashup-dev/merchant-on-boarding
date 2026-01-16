"use client";

import UploadPreviewField from "@/components/form/UploadPreviewField";
import TableUpload from "@/components/table-upload";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Check, ChevronRight } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/store/onboardingStore";
import type { FileWithPreview } from "@/hooks/use-file-upload";

export default function BusinessEntityForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const businessType = useOnboardingStore((state) => state.businessType);
  const storedBusinessEntity = useOnboardingStore((state) => state.businessEntity);
  const setBusinessEntity = useOnboardingStore((state) => state.setBusinessEntity);
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
  const [rt, setRt] = useState("");
  const [rw, setRw] = useState("");
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
  const [ownerJobTitle, setOwnerJobTitle] = useState("");
  const [nibNumber, setNibNumber] = useState("");
  const [nibFile, setNibFile] = useState<FileWithPreview | null>(null);
  const [deedEstablishmentFile, setDeedEstablishmentFile] = useState<FileWithPreview | null>(null);
  const [skMenkumhamEstablishmentFile, setSkMenkumhamEstablishmentFile] = useState<FileWithPreview | null>(null);
  const [deedAmendmentFile, setDeedAmendmentFile] = useState<FileWithPreview | null>(null);
  const [skMenkumhamAmendmentFile, setSkMenkumhamAmendmentFile] = useState<FileWithPreview | null>(null);
  const [pseLicenseFile, setPseLicenseFile] = useState<FileWithPreview | null>(null);
  const [bankName, setBankName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankBookFile, setBankBookFile] = useState<File | null>(null);
  const [bankMutationFile, setBankMutationFile] = useState<File | null>(null);
  const [bankSkuFile, setBankSkuFile] = useState<File | null>(null);
  const [bankBookPreview, setBankBookPreview] = useState("");
  const [bankMutationPreview, setBankMutationPreview] = useState("");
  const [bankSkuPreview, setBankSkuPreview] = useState("");

  useEffect(() => {
    if (!storedBusinessEntity) {
      return;
    }
    setBrandName(storedBusinessEntity.business.brandName);
    setLegalName(storedBusinessEntity.business.legalName);
    setBusinessDescription(storedBusinessEntity.business.description);
    setBusinessCategory(storedBusinessEntity.business.category);
    setEstablishedYear(storedBusinessEntity.business.establishedYear);
    setEmployeeCount(storedBusinessEntity.business.employeeCount);
    setMonthlyVolume(storedBusinessEntity.business.monthlyVolume);
    setSocialType(storedBusinessEntity.business.socialType);
    setSocialLink(storedBusinessEntity.business.socialLink);
    setAddressDetail(storedBusinessEntity.address.addressDetail);
    setRt(storedBusinessEntity.address.rt);
    setRw(storedBusinessEntity.address.rw);
    setProvince(storedBusinessEntity.address.province);
    setCity(storedBusinessEntity.address.city);
    setDistrict(storedBusinessEntity.address.district);
    setSubDistrict(storedBusinessEntity.address.subDistrict);
    setPostalCode(storedBusinessEntity.address.postalCode);
    setOwnerName(storedBusinessEntity.bank.ownerName);
    setOwnerNik(storedBusinessEntity.bank.ownerNik);
    setOwnerNpwp(storedBusinessEntity.bank.ownerNpwp);
    setOwnerJobTitle(storedBusinessEntity.bank.jobTitle ?? "");
    setNibNumber(storedBusinessEntity.legalDocuments?.nibNumber ?? "");
    setBankName(storedBusinessEntity.bank.bankName);
    setBankAccountNumber(storedBusinessEntity.bank.accountNumber);
    setBankAccountName(storedBusinessEntity.bank.accountName);
  }, [storedBusinessEntity]);

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

  useEffect(() => {
    if (!bankSkuFile || !bankSkuFile.type.startsWith("image/")) {
      setBankSkuPreview("");
      return;
    }
    const url = URL.createObjectURL(bankSkuFile);
    setBankSkuPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [bankSkuFile]);

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
    rt.trim().length > 0 &&
    rw.trim().length > 0 &&
    postalCode.trim().length > 0;

  const isCompany = businessType === "company";
  const hasCompanyDocuments = !isCompany
    ? true
    : nibNumber.trim().length > 0 &&
      !!nibFile &&
      !!deedEstablishmentFile &&
      !!skMenkumhamEstablishmentFile &&
      !!pseLicenseFile;

  const isBankStepValid =
    ownerName.trim().length > 0 &&
    ownerNik.trim().length > 0 &&
    ownerNpwp.trim().length > 0 &&
    ownerJobTitle.trim().length > 0 &&
    bankName !== "" &&
    bankAccountNumber.trim().length > 0 &&
    bankAccountName.trim().length > 0 &&
    hasCompanyDocuments;

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
        setRt("");
        setRw("");
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
        setOwnerJobTitle("");
        setNibNumber("");
        setNibFile(null);
        setDeedEstablishmentFile(null);
        setSkMenkumhamEstablishmentFile(null);
        setDeedAmendmentFile(null);
        setSkMenkumhamAmendmentFile(null);
        setPseLicenseFile(null);
        setBankName("");
        setBankAccountNumber("");
        setBankAccountName("");
        setBankBookFile(null);
        setBankMutationFile(null);
        setBankSkuFile(null);
        setBankBookPreview("");
        setBankMutationPreview("");
        setBankSkuPreview("");
      }}
      onSubmit={(event) => {
        event.preventDefault();
        if (activeStep === "business" && isBusinessStepValid) {
          setActiveStep("address");
          return;
        }
        if (activeStep === "address" && isAddressStepValid) {
          setActiveStep("bank");
          return;
        }
        if (activeStep === "bank" && isBankStepValid) {
          setBusinessEntity({
            business: {
              brandName,
              legalName,
              description: businessDescription,
              category: businessCategory,
              establishedYear,
              employeeCount,
              monthlyVolume,
              socialType,
              socialLink,
              logoFileName: logoFile?.name ?? "",
            },
            address: {
              addressDetail,
              rt,
              rw,
              province,
              city,
              district,
              subDistrict,
              postalCode,
              insideOfficeFileName: insideOfficeFile?.name ?? "",
              outsideOfficeFileName: outsideOfficeFile?.name ?? "",
            },
            bank: {
              ownerName,
              ownerNik,
              ownerNpwp,
              jobTitle: ownerJobTitle,
              bankName,
              accountNumber: bankAccountNumber,
              accountName: bankAccountName,
              ownerKtpFileName: ownerKtpFile?.name ?? "",
              ownerNpwpFileName: ownerNpwpFile?.name ?? "",
              bankBookFileName: bankBookFile?.name ?? "",
              bankMutationFileName: bankMutationFile?.name ?? "",
              bankSkuFileName: bankSkuFile?.name ?? "",
            },
            legalDocuments: isCompany
              ? {
                  nibNumber,
                  nibFileName: nibFile?.file.name ?? "",
                  deedEstablishmentFileName: deedEstablishmentFile?.file.name ?? "",
                  skMenkumhamEstablishmentFileName: skMenkumhamEstablishmentFile?.file.name ?? "",
                  deedAmendmentFileName: deedAmendmentFile?.file.name ?? "",
                  skMenkumhamAmendmentFileName: skMenkumhamAmendmentFile?.file.name ?? "",
                  pseLicenseFileName: pseLicenseFile?.file.name ?? "",
                }
              : undefined,
          });
          router.push("/terms");
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
          {t("onboarding.businessEntity.steps.business")}
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
          {t("onboarding.businessEntity.steps.address")}
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
          {t("onboarding.businessEntity.steps.bank")}
        </span>
      </div>
      {activeStep === "business" && (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="md:col-span-1">
            <UploadPreviewField
              id="companyLogo"
              name="companyLogo"
              label={t("onboarding.businessEntity.business.companyLogo.label")}
              accept="image/*"
              file={logoFile}
              previewUrl={logoPreview}
              onFileChange={setLogoFile}
              onClear={() => setLogoFile(null)}
              previewAlt={t("onboarding.businessEntity.business.companyLogo.previewAlt")}
              previewHeightClass="h-32"
            />
            <p className="mt-2 text-xs text-gray-500">
              {t("onboarding.businessEntity.business.companyLogo.helper")}
            </p>
          </div>
          <div className="hidden md:block" aria-hidden="true" />

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="brandName">
              {t("onboarding.businessEntity.business.brandName.label")}
              <span className="ml-2 text-xs text-red-500">
                {t("onboarding.businessEntity.common.required")}
              </span>
            </label>
            <input
              id="brandName"
              name="brandName"
              type="text"
              value={brandName}
              onChange={(event) => setBrandName(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              placeholder={t("onboarding.businessEntity.business.brandName.placeholder")}
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="legalName">
              {t("onboarding.businessEntity.business.legalName.label")}
              <span className="ml-2 text-xs text-red-500">
                {t("onboarding.businessEntity.common.required")}
              </span>
            </label>
            <input
              id="legalName"
              name="legalName"
              type="text"
              value={legalName}
              onChange={(event) => setLegalName(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              placeholder={t("onboarding.businessEntity.business.legalName.placeholder")}
              required
            />
          </div>

          <div className="md:col-span-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700" htmlFor="businessDescription">
                {t("onboarding.businessEntity.business.description.label")}
                <span className="ml-2 text-xs text-red-500">
                  {t("onboarding.businessEntity.common.required")}
                </span>
              </label>
              <span className="text-xs text-gray-400">{businessDescription.length}/100</span>
            </div>
            <Textarea
              id="businessDescription"
              name="businessDescription"
              value={businessDescription}
              onChange={(event) => setBusinessDescription(event.target.value.slice(0, 100))}
              className="mt-2 min-h-[96px] rounded-xl border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus-visible:border-gray-400 focus-visible:ring-0"
              placeholder={t("onboarding.businessEntity.business.description.placeholder")}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="businessCategory">
              {t("onboarding.businessEntity.business.category.label")}
              <span className="ml-2 text-xs text-red-500">
                {t("onboarding.businessEntity.common.required")}
              </span>
            </label>
            <Select value={businessCategory} onValueChange={setBusinessCategory}>
              <SelectTrigger id="businessCategory" className="mt-2 h-11 rounded-xl border-gray-200 px-4 text-sm">
                <SelectValue placeholder={t("onboarding.businessEntity.business.category.placeholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="food">{t("onboarding.businessEntity.business.category.options.food")}</SelectItem>
                <SelectItem value="retail">{t("onboarding.businessEntity.business.category.options.retail")}</SelectItem>
                <SelectItem value="service">{t("onboarding.businessEntity.business.category.options.service")}</SelectItem>
                <SelectItem value="travel">{t("onboarding.businessEntity.business.category.options.travel")}</SelectItem>
                <SelectItem value="health">{t("onboarding.businessEntity.business.category.options.health")}</SelectItem>
              </SelectContent>
            </Select>
            <input type="hidden" name="businessCategory" value={businessCategory} />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="establishedYear">
              {t("onboarding.businessEntity.business.establishedYear.label")}
              <span className="ml-2 text-xs text-red-500">
                {t("onboarding.businessEntity.common.required")}
              </span>
            </label>
            <Select value={establishedYear} onValueChange={setEstablishedYear}>
              <SelectTrigger id="establishedYear" className="mt-2 h-11 rounded-xl border-gray-200 px-4 text-sm">
                <SelectValue placeholder={t("onboarding.businessEntity.business.establishedYear.placeholder")} />
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
              {t("onboarding.businessEntity.business.employeeCount.label")}
              <span className="ml-2 text-xs text-red-500">
                {t("onboarding.businessEntity.common.required")}
              </span>
            </label>
            <Select value={employeeCount} onValueChange={setEmployeeCount}>
              <SelectTrigger id="employeeCount" className="mt-2 h-11 rounded-xl border-gray-200 px-4 text-sm">
                <SelectValue placeholder={t("onboarding.businessEntity.business.employeeCount.placeholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-5">{t("onboarding.businessEntity.business.employeeCount.options.1_5")}</SelectItem>
                <SelectItem value="6-20">{t("onboarding.businessEntity.business.employeeCount.options.6_20")}</SelectItem>
                <SelectItem value="21-50">{t("onboarding.businessEntity.business.employeeCount.options.21_50")}</SelectItem>
                <SelectItem value="51-200">{t("onboarding.businessEntity.business.employeeCount.options.51_200")}</SelectItem>
                <SelectItem value="200+">{t("onboarding.businessEntity.business.employeeCount.options.200_plus")}</SelectItem>
              </SelectContent>
            </Select>
            <input type="hidden" name="employeeCount" value={employeeCount} />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="monthlyVolume">
              {t("onboarding.businessEntity.business.monthlyVolume.label")}
              <span className="ml-2 text-xs text-red-500">
                {t("onboarding.businessEntity.common.required")}
              </span>
            </label>
            <Select value={monthlyVolume} onValueChange={setMonthlyVolume}>
              <SelectTrigger id="monthlyVolume" className="mt-2 h-11 rounded-xl border-gray-200 px-4 text-sm">
                <SelectValue placeholder={t("onboarding.businessEntity.business.monthlyVolume.placeholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="<10m">{t("onboarding.businessEntity.business.monthlyVolume.options.lt_10m")}</SelectItem>
                <SelectItem value="10-50m">{t("onboarding.businessEntity.business.monthlyVolume.options.10_50m")}</SelectItem>
                <SelectItem value="50-200m">{t("onboarding.businessEntity.business.monthlyVolume.options.50_200m")}</SelectItem>
                <SelectItem value="200-500m">{t("onboarding.businessEntity.business.monthlyVolume.options.200_500m")}</SelectItem>
                <SelectItem value="500m+">{t("onboarding.businessEntity.business.monthlyVolume.options.gt_500m")}</SelectItem>
              </SelectContent>
            </Select>
            <input type="hidden" name="monthlyVolume" value={monthlyVolume} />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="socialLink">
              {t("onboarding.businessEntity.business.socialLink.label")}
            </label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <Select value={socialType} onValueChange={setSocialType}>
                <SelectTrigger className="h-11 w-full rounded-xl border-gray-200 px-4 text-sm sm:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="website">{t("onboarding.businessEntity.business.socialLink.options.website")}</SelectItem>
                  <SelectItem value="instagram">{t("onboarding.businessEntity.business.socialLink.options.instagram")}</SelectItem>
                  <SelectItem value="facebook">{t("onboarding.businessEntity.business.socialLink.options.facebook")}</SelectItem>
                  <SelectItem value="tiktok">{t("onboarding.businessEntity.business.socialLink.options.tiktok")}</SelectItem>
                </SelectContent>
              </Select>
              <input
                id="socialLink"
                name="socialLink"
                type="text"
                value={socialLink}
                onChange={(event) => setSocialLink(event.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
                placeholder={t("onboarding.businessEntity.business.socialLink.placeholder")}
              />
            </div>
            <input type="hidden" name="socialType" value={socialType} />
          </div>

          <button type="button" className="text-left text-sm font-semibold text-teal-500">
            {t("onboarding.businessEntity.common.seeGuideline")}
          </button>
        </div>
      )}

      {activeStep === "address" && (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="addressDetail">
              {t("onboarding.businessEntity.address.addressDetail.label")}
              <span className="ml-2 text-xs text-red-500">
                {t("onboarding.businessEntity.common.required")}
              </span>
            </label>
            <input
              id="addressDetail"
              name="addressDetail"
              type="text"
              value={addressDetail}
              onChange={(event) => setAddressDetail(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              placeholder={t("onboarding.businessEntity.address.addressDetail.placeholder")}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="rt">
              {t("onboarding.businessEntity.address.rt.label")}
              <span className="ml-2 text-xs text-red-500">
                {t("onboarding.businessEntity.common.required")}
              </span>
            </label>
            <input
              id="rt"
              name="rt"
              type="text"
              value={rt}
              onChange={(event) => setRt(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              placeholder={t("onboarding.businessEntity.address.rt.placeholder")}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="rw">
              {t("onboarding.businessEntity.address.rw.label")}
              <span className="ml-2 text-xs text-red-500">
                {t("onboarding.businessEntity.common.required")}
              </span>
            </label>
            <input
              id="rw"
              name="rw"
              type="text"
              value={rw}
              onChange={(event) => setRw(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              placeholder={t("onboarding.businessEntity.address.rw.placeholder")}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="province">
              {t("onboarding.businessEntity.address.province.label")}
              <span className="ml-2 text-xs text-red-500">
                {t("onboarding.businessEntity.common.required")}
              </span>
            </label>
            <Select value={province} onValueChange={setProvince}>
              <SelectTrigger id="province" className="mt-2 h-11 rounded-xl border-gray-200 px-4 text-sm">
                <SelectValue placeholder={t("onboarding.businessEntity.address.province.placeholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dki">{t("onboarding.businessEntity.address.province.options.dki")}</SelectItem>
                <SelectItem value="jabar">{t("onboarding.businessEntity.address.province.options.jabar")}</SelectItem>
                <SelectItem value="jateng">{t("onboarding.businessEntity.address.province.options.jateng")}</SelectItem>
                <SelectItem value="jatim">{t("onboarding.businessEntity.address.province.options.jatim")}</SelectItem>
              </SelectContent>
            </Select>
            <input type="hidden" name="province" value={province} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="city">
              {t("onboarding.businessEntity.address.city.label")}
              <span className="ml-2 text-xs text-red-500">
                {t("onboarding.businessEntity.common.required")}
              </span>
            </label>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger id="city" className="mt-2 h-11 rounded-xl border-gray-200 px-4 text-sm">
                <SelectValue placeholder={t("onboarding.businessEntity.address.city.placeholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jakarta">{t("onboarding.businessEntity.address.city.options.jakarta")}</SelectItem>
                <SelectItem value="bandung">{t("onboarding.businessEntity.address.city.options.bandung")}</SelectItem>
                <SelectItem value="semarang">{t("onboarding.businessEntity.address.city.options.semarang")}</SelectItem>
                <SelectItem value="surabaya">{t("onboarding.businessEntity.address.city.options.surabaya")}</SelectItem>
              </SelectContent>
            </Select>
            <input type="hidden" name="city" value={city} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="district">
              {t("onboarding.businessEntity.address.district.label")}
              <span className="ml-2 text-xs text-red-500">
                {t("onboarding.businessEntity.common.required")}
              </span>
            </label>
            <Select value={district} onValueChange={setDistrict}>
              <SelectTrigger id="district" className="mt-2 h-11 rounded-xl border-gray-200 px-4 text-sm">
                <SelectValue placeholder={t("onboarding.businessEntity.address.district.placeholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="district-1">{t("onboarding.businessEntity.address.district.options.district1")}</SelectItem>
                <SelectItem value="district-2">{t("onboarding.businessEntity.address.district.options.district2")}</SelectItem>
              </SelectContent>
            </Select>
            <input type="hidden" name="district" value={district} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="subDistrict">
              {t("onboarding.businessEntity.address.subDistrict.label")}
              <span className="ml-2 text-xs text-red-500">
                {t("onboarding.businessEntity.common.required")}
              </span>
            </label>
            <Select value={subDistrict} onValueChange={setSubDistrict}>
              <SelectTrigger id="subDistrict" className="mt-2 h-11 rounded-xl border-gray-200 px-4 text-sm">
                <SelectValue placeholder={t("onboarding.businessEntity.address.subDistrict.placeholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sub-1">{t("onboarding.businessEntity.address.subDistrict.options.sub1")}</SelectItem>
                <SelectItem value="sub-2">{t("onboarding.businessEntity.address.subDistrict.options.sub2")}</SelectItem>
              </SelectContent>
            </Select>
            <input type="hidden" name="subDistrict" value={subDistrict} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="postalCode">
              {t("onboarding.businessEntity.address.postalCode.label")}
              <span className="ml-2 text-xs text-red-500">
                {t("onboarding.businessEntity.common.required")}
              </span>
            </label>
            <input
              id="postalCode"
              name="postalCode"
              type="text"
              value={postalCode}
              onChange={(event) => setPostalCode(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              placeholder={t("onboarding.businessEntity.address.postalCode.placeholder")}
              required
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <p className="text-sm font-medium text-gray-700">
              {t("onboarding.businessEntity.address.officePhoto.title")}
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <UploadPreviewField
                  id="insideOfficePhoto"
                  name="insideOfficePhoto"
                  label={t("onboarding.businessEntity.address.officePhoto.inside.label")}
                  accept="image/*"
                  file={insideOfficeFile}
                  previewUrl={insideOfficePreview}
                  onFileChange={setInsideOfficeFile}
                  onClear={() => setInsideOfficeFile(null)}
                  previewAlt={t("onboarding.businessEntity.address.officePhoto.inside.previewAlt")}
                  previewHeightClass="h-36"
                />
                <p className="mt-2 text-xs text-gray-500">
                  {t("onboarding.businessEntity.address.officePhoto.helper")}
                </p>
                <button type="button" className="mt-2 text-sm font-semibold text-teal-500">
                  {t("onboarding.businessEntity.common.seeGuideline")}
                </button>
              </div>
              <div>
                <UploadPreviewField
                  id="outsideOfficePhoto"
                  name="outsideOfficePhoto"
                  label={t("onboarding.businessEntity.address.officePhoto.outside.label")}
                  accept="image/*"
                  file={outsideOfficeFile}
                  previewUrl={outsideOfficePreview}
                  onFileChange={setOutsideOfficeFile}
                  onClear={() => setOutsideOfficeFile(null)}
                  previewAlt={t("onboarding.businessEntity.address.officePhoto.outside.previewAlt")}
                  previewHeightClass="h-36"
                />
                <p className="mt-2 text-xs text-gray-500">
                  {t("onboarding.businessEntity.address.officePhoto.helper")}
                </p>
                <button type="button" className="mt-2 text-sm font-semibold text-teal-500">
                  {t("onboarding.businessEntity.common.seeGuideline")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeStep === "bank" && (
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {t("onboarding.businessEntity.bank.ownerSection.title")}
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <UploadPreviewField
                  id="ownerKtp"
                  name="ownerKtp"
                  label={t("onboarding.businessEntity.bank.ownerSection.ktp.label")}
                  accept="image/*,application/pdf"
                  file={ownerKtpFile}
                  previewUrl={ownerKtpPreview}
                  onFileChange={setOwnerKtpFile}
                  onClear={() => setOwnerKtpFile(null)}
                  previewAlt={t("onboarding.businessEntity.bank.ownerSection.ktp.previewAlt")}
                  previewHeightClass="h-36"
                />
                <button type="button" className="mt-2 text-sm font-semibold text-teal-500">
                  {t("onboarding.businessEntity.common.seeGuideline")}
                </button>
              </div>
              <div>
                <UploadPreviewField
                  id="ownerNpwpPhoto"
                  name="ownerNpwpPhoto"
                  label={t("onboarding.businessEntity.bank.ownerSection.npwpPhoto.label")}
                  accept="image/*,application/pdf"
                  file={ownerNpwpFile}
                  previewUrl={ownerNpwpPreview}
                  onFileChange={setOwnerNpwpFile}
                  onClear={() => setOwnerNpwpFile(null)}
                  previewAlt={t("onboarding.businessEntity.bank.ownerSection.npwpPhoto.previewAlt")}
                  previewHeightClass="h-36"
                />
                <button type="button" className="mt-2 text-sm font-semibold text-teal-500">
                  {t("onboarding.businessEntity.common.seeGuideline")}
                </button>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700" htmlFor="ownerName">
                  {t("onboarding.businessEntity.bank.ownerSection.name.label")}
                  <span className="ml-2 text-xs text-red-500">
                    {t("onboarding.businessEntity.common.required")}
                  </span>
                </label>
                <input
                  id="ownerName"
                  name="ownerName"
                  type="text"
                  value={ownerName}
                  onChange={(event) => setOwnerName(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
                  placeholder={t("onboarding.businessEntity.bank.ownerSection.name.placeholder")}
                  required
                />
                <p className="mt-2 text-xs text-gray-400">
                  {t("onboarding.businessEntity.bank.ownerSection.name.helper")}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700" htmlFor="ownerNik">
                  {t("onboarding.businessEntity.bank.ownerSection.nik.label")}
                  <span className="ml-2 text-xs text-red-500">
                    {t("onboarding.businessEntity.common.required")}
                  </span>
                </label>
                <input
                  id="ownerNik"
                  name="ownerNik"
                  type="text"
                  value={ownerNik}
                  onChange={(event) => setOwnerNik(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
                  placeholder={t("onboarding.businessEntity.bank.ownerSection.nik.placeholder")}
                  required
                />
                <p className="mt-2 text-xs text-gray-400">
                  {t("onboarding.businessEntity.bank.ownerSection.nik.helper")}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700" htmlFor="ownerNpwp">
                  {t("onboarding.businessEntity.bank.ownerSection.npwp.label")}
                  <span className="ml-2 text-xs text-red-500">
                    {t("onboarding.businessEntity.common.required")}
                  </span>
                </label>
                <input
                  id="ownerNpwp"
                  name="ownerNpwp"
                  type="text"
                  value={ownerNpwp}
                  onChange={(event) => setOwnerNpwp(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
                  placeholder={t("onboarding.businessEntity.bank.ownerSection.npwp.placeholder")}
                  required
                />
                <p className="mt-2 text-xs text-gray-400">
                  {t("onboarding.businessEntity.bank.ownerSection.npwp.helper")}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700" htmlFor="ownerJobTitle">
                  {t("onboarding.businessEntity.bank.ownerSection.jobTitle.label")}
                  <span className="ml-2 text-xs text-red-500">
                    {t("onboarding.businessEntity.common.required")}
                  </span>
                </label>
                <input
                  id="ownerJobTitle"
                  name="ownerJobTitle"
                  type="text"
                  value={ownerJobTitle}
                  onChange={(event) => setOwnerJobTitle(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
                  required
                />
              </div>
            </div>
          </div>

          {isCompany && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {t("onboarding.businessEntity.bank.legalDocuments.title")}
                </h3>
                <p className="text-sm text-gray-500">
                  {t("onboarding.businessEntity.bank.legalDocuments.note")}
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-gray-700" htmlFor="nibNumber">
                    {t("onboarding.businessEntity.bank.legalDocuments.nibNumber.label")}
                    <span className="ml-2 text-xs text-red-500">
                      {t("onboarding.businessEntity.common.required")}
                    </span>
                  </label>
                  <input
                    id="nibNumber"
                    name="nibNumber"
                    type="text"
                    value={nibNumber}
                    onChange={(event) => setNibNumber(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
                    required
                  />
                </div>
                <div />
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {t("onboarding.businessEntity.bank.legalDocuments.nibDocument.label")}
                    <span className="ml-2 text-xs text-red-500">
                      {t("onboarding.businessEntity.common.required")}
                    </span>
                  </p>
                  <TableUpload
                    maxFiles={1}
                    multiple={false}
                    accept="application/pdf"
                    simulateUpload={false}
                    showDefaults={false}
                    onFilesChange={(files) => setNibFile(files[0] ?? null)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {t("onboarding.businessEntity.bank.legalDocuments.deedEstablishment.label")}
                    <span className="ml-2 text-xs text-red-500">
                      {t("onboarding.businessEntity.common.required")}
                    </span>
                  </p>
                  <TableUpload
                    maxFiles={1}
                    multiple={false}
                    accept="application/pdf"
                    simulateUpload={false}
                    showDefaults={false}
                    onFilesChange={(files) => setDeedEstablishmentFile(files[0] ?? null)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {t("onboarding.businessEntity.bank.legalDocuments.skMenkumhamEstablishment.label")}
                    <span className="ml-2 text-xs text-red-500">
                      {t("onboarding.businessEntity.common.required")}
                    </span>
                  </p>
                  <TableUpload
                    maxFiles={1}
                    multiple={false}
                    accept="application/pdf"
                    simulateUpload={false}
                    showDefaults={false}
                    onFilesChange={(files) => setSkMenkumhamEstablishmentFile(files[0] ?? null)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {t("onboarding.businessEntity.bank.legalDocuments.deedAmendment.label")}
                  </p>
                  <TableUpload
                    maxFiles={1}
                    multiple={false}
                    accept="application/pdf"
                    simulateUpload={false}
                    showDefaults={false}
                    onFilesChange={(files) => setDeedAmendmentFile(files[0] ?? null)}
                    className="mt-2"
                  />
                  <p className="mt-2 text-xs text-gray-400">
                    {t("onboarding.businessEntity.bank.legalDocuments.deedAmendment.helper")}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {t("onboarding.businessEntity.bank.legalDocuments.skMenkumhamAmendment.label")}
                  </p>
                  <TableUpload
                    maxFiles={1}
                    multiple={false}
                    accept="application/pdf"
                    simulateUpload={false}
                    showDefaults={false}
                    onFilesChange={(files) => setSkMenkumhamAmendmentFile(files[0] ?? null)}
                    className="mt-2"
                  />
                  <p className="mt-2 text-xs text-gray-400">
                    {t("onboarding.businessEntity.bank.legalDocuments.skMenkumhamAmendment.helper")}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {t("onboarding.businessEntity.bank.legalDocuments.pseLicense.label")}
                    <span className="ml-2 text-xs text-red-500">
                      {t("onboarding.businessEntity.common.required")}
                    </span>
                  </p>
                  <TableUpload
                    maxFiles={1}
                    multiple={false}
                    accept="application/pdf"
                    simulateUpload={false}
                    showDefaults={false}
                    onFilesChange={(files) => setPseLicenseFile(files[0] ?? null)}
                    className="mt-2"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {t("onboarding.businessEntity.bank.bankSection.title")}
            </h3>
            <p className="text-sm text-gray-500">
              {t("onboarding.businessEntity.bank.bankSection.subtitle")}
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-gray-700" htmlFor="bankName">
                  {t("onboarding.businessEntity.bank.bankSection.bankName.label")}
                  <span className="ml-2 text-xs text-red-500">
                    {t("onboarding.businessEntity.common.required")}
                  </span>
                </label>
                <Select value={bankName} onValueChange={setBankName}>
                  <SelectTrigger id="bankName" className="mt-2 h-11 rounded-xl border-gray-200 px-4 text-sm">
                    <SelectValue placeholder={t("onboarding.businessEntity.bank.bankSection.bankName.placeholder")} />
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
                  {t("onboarding.businessEntity.bank.bankSection.accountNumber.label")}
                  <span className="ml-2 text-xs text-red-500">
                    {t("onboarding.businessEntity.common.required")}
                  </span>
                </label>
                <input
                  id="bankAccountNumber"
                  name="bankAccountNumber"
                  type="text"
                  value={bankAccountNumber}
                  onChange={(event) => setBankAccountNumber(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
                  placeholder={t("onboarding.businessEntity.bank.bankSection.accountNumber.placeholder")}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700" htmlFor="bankAccountName">
                  {t("onboarding.businessEntity.bank.bankSection.accountName.label")}
                  <span className="ml-2 text-xs text-red-500">
                    {t("onboarding.businessEntity.common.required")}
                  </span>
                </label>
                <input
                  id="bankAccountName"
                  name="bankAccountName"
                  type="text"
                  value={bankAccountName}
                  onChange={(event) => setBankAccountName(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
                  placeholder={t("onboarding.businessEntity.bank.bankSection.accountName.placeholder")}
                  required
                />
              </div>
              <div />
              <div>
                <UploadPreviewField
                  id="bankBookCover"
                  name="bankBookCover"
                  label={t("onboarding.businessEntity.bank.bankSection.bankBook.label")}
                  accept="image/*,application/pdf"
                  file={bankBookFile}
                  previewUrl={bankBookPreview}
                  onFileChange={setBankBookFile}
                  onClear={() => setBankBookFile(null)}
                  previewAlt={t("onboarding.businessEntity.bank.bankSection.bankBook.previewAlt")}
                  previewHeightClass="h-36"
                />
                <button type="button" className="mt-2 text-sm font-semibold text-teal-500">
                  {t("onboarding.businessEntity.common.seeGuideline")}
                </button>
              </div>
              <div>
                <UploadPreviewField
                  id="bankMutation"
                  name="bankMutation"
                  label={t("onboarding.businessEntity.bank.bankSection.bankMutation.label")}
                  accept="image/*,application/pdf"
                  file={bankMutationFile}
                  previewUrl={bankMutationPreview}
                  onFileChange={setBankMutationFile}
                  onClear={() => setBankMutationFile(null)}
                  previewAlt={t("onboarding.businessEntity.bank.bankSection.bankMutation.previewAlt")}
                  previewHeightClass="h-36"
                />
                <button type="button" className="mt-2 text-sm font-semibold text-teal-500">
                  {t("onboarding.businessEntity.common.seeGuideline")}
                </button>
              </div>
              <div>
                <UploadPreviewField
                  id="bankSku"
                  name="bankSku"
                  label={t("onboarding.businessEntity.bank.bankSection.sku.label")}
                  accept="image/*,application/pdf"
                  file={bankSkuFile}
                  previewUrl={bankSkuPreview}
                  onFileChange={setBankSkuFile}
                  onClear={() => setBankSkuFile(null)}
                  previewAlt={t("onboarding.businessEntity.bank.bankSection.sku.previewAlt")}
                  previewHeightClass="h-36"
                />
                <button type="button" className="mt-2 text-sm font-semibold text-teal-500">
                  {t("onboarding.businessEntity.common.seeGuideline")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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
            {t("onboarding.businessEntity.actions.previous")}
          </button>
        ) : (
          <button
            type="reset"
            className="rounded-xl border border-gray-200 px-5 py-2 text-sm font-semibold text-gray-700"
          >
            {t("onboarding.businessEntity.actions.clearAll")}
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
          {activeStep === "bank"
            ? t("onboarding.businessEntity.actions.submit")
            : t("onboarding.businessEntity.actions.next")}
        </button>
      </div>
    </form>
  );
}
