"use client";

import type { FileWithPreview } from "@/hooks/use-file-upload";

export type AddressState = {
  streetName: string;
  rt: string;
  rw: string;
  provinceId: string;
  cityId: string;
  districtId: string;
  subdistrictId: string;
  postalCode: string;
};

export type MerchantStepData = {
  businessType: string;
  companyType: string;
  merchantName: string;
  companyName: string;
  establishedYear: string;
  monthlyVolume: string;
  phoneNumber: string;
  email: string;
  websiteLink: string;
  businessMode: string;
  ownershipStatus: string;
  mcc: string;
  businessAddress: AddressState;
  deedFile: FileWithPreview | null;
  skKemenkumhamFile: FileWithPreview | null;
  nibCompanyFile: FileWithPreview | null;
  npwpCompanyFile: File | null;
  nibSkuFile: FileWithPreview | null;
  frontPhotoFile: File | null;
  insidePhotoFile: File | null;
  productPhotoFile: File | null;
  logoFile: File | null;
  additionalDocumentFile: FileWithPreview | null;
  existingFiles: {
    deedFileName?: string;
    skKemenkumhamFileName?: string;
    nibCompanyFileName?: string;
    npwpCompanyFileName?: string;
    nibSkuFileName?: string;
    frontPhotoFileName?: string;
    insidePhotoFileName?: string;
    productPhotoFileName?: string;
    logoFileName?: string;
    additionalDocumentFileName?: string;
  };
};

export type OwnerStepData = {
  ownerName: string;
  ownerBirthPlace: string;
  ownerBirthDate: string;
  ownerCitizenship: string;
  ownerNik: string;
  ownerPhone: string;
  ownerEmail: string;
  ownerPassportNumber: string;
  ownerKtpFile: File | null;
  ownerPassportFile: File | null;
  ownerNpwpFile: File | null;
  ownerKtpAddress: AddressState;
  ownerDomicileAddress: AddressState;
  ownerDomicileSame: boolean;
  existingFiles: {
    ownerKtpFileName?: string;
    ownerPassportFileName?: string;
    ownerNpwpFileName?: string;
  };
};

export type PicAdminStepData = {
  picName: string;
  picEmail: string;
  picPhone: string;
};

export type SettlementStepData = {
  bankName: string;
  bankAccountNumber: string;
  bankAccountName: string;
  settlementEmail: string;
};

export type BusinessEntityDraft = {
  business: {
    merchantName: string;
    businessType: string;
    companyType?: string;
    companyName?: string;
    phoneNumber: string;
    email: string;
    websiteLink?: string;
    businessMode: string;
    ownershipStatus: string;
    mcc: string;
    nibNumber?: string;
    npwpNumber?: string;
  };
  businessAddress: AddressState;
  documents: {
    deedFileName?: string;
    skKemenkumhamFileName?: string;
    nibSkuFileName?: string;
    additionalDocumentFileName?: string;
  };
  photos: {
    frontPhotoFileName: string;
    insidePhotoFileName: string;
    productPhotoFileName: string;
    logoFileName?: string;
  };
  owner: {
    name: string;
    birthPlace: string;
    birthDate: string;
    citizenship: string;
    ktpFileName: string;
    npwpFileName: string;
    nik: string;
    phoneNumber: string;
    email: string;
  };
  ownerKtpAddress: AddressState;
  ownerDomicileAddress: AddressState & { isSameAsKtp: boolean };
  picAdmin: {
    name: string;
    email: string;
    phoneNumber: string;
  };
  settlement: {
    bankName: string;
    accountNumber: string;
    accountName: string;
    email: string;
  };
};

export type BusinessEntityDraftMeta = {
  merchant?: {
    establishedYear?: string;
    monthlyVolume?: string;
  };
  owner?: {
    passportNumber?: string;
  };
};

export type CompletedStepKey = "merchant" | "owner" | "pic-admin" | "settlement";

export type OnboardingDraftPayload = {
  merchant?: {
    businessEntity: Partial<BusinessEntityDraft>;
    meta?: BusinessEntityDraftMeta;
  };
  owner?: {
    businessEntity: Partial<BusinessEntityDraft>;
    meta?: BusinessEntityDraftMeta;
  };
  picAdmin?: {
    businessEntity: Partial<BusinessEntityDraft>;
  };
  settlement?: {
    businessEntity: Partial<BusinessEntityDraft>;
  };
};

export type OnboardingDraftResponse = {
  success: boolean;
  status?: "DRAFT";
  completedSteps?: CompletedStepKey[];
  businessEntity?: BusinessEntityDraft | null;
  meta?: BusinessEntityDraftMeta | null;
  message?: string;
};
