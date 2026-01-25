"use client";

import type { ZodError } from "zod";

import { getFileName } from "./file";
import type {
  BusinessEntityDraft,
  BusinessEntityDraftMeta,
  MerchantStepData,
  OwnerStepData,
  PicAdminStepData,
  SettlementStepData,
} from "../_schema/types";

const resolveFileName = (file: unknown, existingName?: string) => getFileName(file) || existingName || "";

export const buildMerchantDraftSection = (data: MerchantStepData): Pick<
  BusinessEntityDraft,
  "business" | "businessAddress" | "documents" | "photos"
> => ({
  business: {
    merchantName: data.merchantName,
    businessType: data.businessType,
    companyType: data.businessType === "company" ? data.companyType : "",
    companyName: data.companyName,
    phoneNumber: data.phoneNumber,
    email: data.email,
    websiteLink: data.websiteLink || "",
    businessMode: data.businessMode,
    ownershipStatus: data.ownershipStatus,
    mcc: data.mcc,
    nibNumber: data.businessType === "company" ? resolveFileName(data.nibCompanyFile, data.existingFiles.nibCompanyFileName) : "",
    npwpNumber: data.businessType === "company" ? resolveFileName(data.npwpCompanyFile, data.existingFiles.npwpCompanyFileName) : "",
  },
  businessAddress: data.businessAddress,
  documents: {
    deedFileName: resolveFileName(data.deedFile, data.existingFiles.deedFileName),
    skKemenkumhamFileName: resolveFileName(data.skKemenkumhamFile, data.existingFiles.skKemenkumhamFileName),
    nibSkuFileName: resolveFileName(data.nibSkuFile, data.existingFiles.nibSkuFileName),
    additionalDocumentFileName: resolveFileName(
      data.additionalDocumentFile,
      data.existingFiles.additionalDocumentFileName,
    ),
  },
  photos: {
    frontPhotoFileName: resolveFileName(data.frontPhotoFile, data.existingFiles.frontPhotoFileName),
    insidePhotoFileName: resolveFileName(data.insidePhotoFile, data.existingFiles.insidePhotoFileName),
    productPhotoFileName: resolveFileName(data.productPhotoFile, data.existingFiles.productPhotoFileName),
    logoFileName: resolveFileName(data.logoFile, data.existingFiles.logoFileName),
  },
});

export const buildMerchantMeta = (data: MerchantStepData): BusinessEntityDraftMeta => ({
  merchant: {
    establishedYear: data.establishedYear,
    monthlyVolume: data.monthlyVolume,
  },
});

export const buildOwnerDraftSection = (data: OwnerStepData): Pick<
  BusinessEntityDraft,
  "owner" | "ownerKtpAddress" | "ownerDomicileAddress"
> => ({
  owner: {
    name: data.ownerName,
    birthPlace: data.ownerBirthPlace,
    birthDate: data.ownerBirthDate,
    citizenship: data.ownerCitizenship,
    ktpFileName: resolveFileName(data.ownerKtpFile, data.existingFiles.ownerKtpFileName),
    npwpFileName: resolveFileName(data.ownerNpwpFile, data.existingFiles.ownerNpwpFileName),
    nik: data.ownerNik,
    phoneNumber: data.ownerPhone,
    email: data.ownerEmail,
  },
  ownerKtpAddress: data.ownerKtpAddress,
  ownerDomicileAddress: {
    ...data.ownerDomicileAddress,
    isSameAsKtp: data.ownerDomicileSame,
  },
});

export const buildOwnerMeta = (data: OwnerStepData): BusinessEntityDraftMeta => ({
  owner: {
    passportNumber: data.ownerPassportNumber,
  },
});

export const buildPicAdminDraftSection = (
  data: PicAdminStepData,
): Pick<BusinessEntityDraft, "picAdmin"> => ({
  picAdmin: {
    name: data.picName,
    email: data.picEmail,
    phoneNumber: data.picPhone,
  },
});

export const buildSettlementDraftSection = (
  data: SettlementStepData,
): Pick<BusinessEntityDraft, "settlement"> => ({
  settlement: {
    bankName: data.bankName,
    accountNumber: data.bankAccountNumber,
    accountName: data.bankAccountName,
    email: data.settlementEmail,
  },
});

export const mapZodErrors = (error: ZodError) => {
  const errors: Record<string, string> = {};
  error.issues.forEach((issue) => {
    const key = issue.path.join(".");
    if (!errors[key]) {
      errors[key] = issue.message;
    }
  });
  return errors;
};
