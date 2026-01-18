"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type EdcShippingAddress = {
  streetName: string;
  rt: string;
  rw: string;
  province: string;
  city: string;
  district: string;
  subDistrict: string;
  postalCode: string;
};

type EdcInformation = {
  edcType: string;
  edcCount: string;
  edcOwnership: string;
  shippingAddress: EdcShippingAddress;
};

type BusinessEntityDraft = {
  business: {
    brandName: string;
    legalName: string;
    description: string;
    category: string;
    establishedYear: string;
    employeeCount: string;
    monthlyVolume: string;
    socialType: string;
    socialLink: string;
    logoFileName: string;
  };
  address: {
    addressDetail: string;
    rt: string;
    rw: string;
    province: string;
    city: string;
    district: string;
    subDistrict: string;
    postalCode: string;
    insideOfficeFileName: string;
    outsideOfficeFileName: string;
  };
  bank: {
    ownerName: string;
    ownerNik: string;
    ownerNpwp: string;
    jobTitle: string;
    bankName: string;
    accountNumber: string;
    accountName: string;
    ownerKtpFileName: string;
    ownerNpwpFileName: string;
    bankBookFileName: string;
    bankMutationFileName: string;
    bankSkuFileName: string;
  };
  legalDocuments?: {
    nibNumber: string;
    nibFileName: string;
    deedEstablishmentFileName: string;
    skMenkumhamEstablishmentFileName: string;
    deedAmendmentFileName: string;
    skMenkumhamAmendmentFileName: string;
    pseLicenseFileName: string;
  };
};

type OnboardingState = {
  businessType: string;
  companyType: string;
  paymentFeature: string;
  edcInformation: EdcInformation;
  businessEntity: BusinessEntityDraft | null;
  setBusinessType: (businessType: string, companyType: string) => void;
  setPaymentFeature: (paymentFeature: string) => void;
  setEdcInformation: (edcInformation: EdcInformation) => void;
  setBusinessEntity: (businessEntity: BusinessEntityDraft) => void;
  reset: () => void;
};

const emptyEdcInformation: EdcInformation = {
  edcType: "",
  edcCount: "",
  edcOwnership: "",
  shippingAddress: {
    streetName: "",
    rt: "",
    rw: "",
    province: "",
    city: "",
    district: "",
    subDistrict: "",
    postalCode: "",
  },
};

const initialState = {
  businessType: "individual",
  companyType: "pt",
  paymentFeature: "",
  edcInformation: emptyEdcInformation,
  businessEntity: null,
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      ...initialState,
      setBusinessType: (businessType, companyType) =>
        set({ businessType, companyType }),
      setPaymentFeature: (paymentFeature) => set({ paymentFeature }),
      setEdcInformation: (edcInformation) => set({ edcInformation }),
      setBusinessEntity: (businessEntity) => set({ businessEntity }),
      reset: () => set({ ...initialState }),
    }),
    {
      name: "merchant-onboarding",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
