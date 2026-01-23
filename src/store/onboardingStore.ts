"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type EdcShippingAddress = {
  streetName: string;
  addressNumber?: string;
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
  businessAddress: {
    streetName: string;
    rt: string;
    rw: string;
    provinceId: string;
    cityId: string;
    districtId: string;
    subdistrictId: string;
    postalCode: string;
  };
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
  ownerKtpAddress: {
    streetName: string;
    rt: string;
    rw: string;
    provinceId: string;
    cityId: string;
    districtId: string;
    subdistrictId: string;
    postalCode: string;
  };
  ownerDomicileAddress: {
    isSameAsKtp: boolean;
    streetName: string;
    rt: string;
    rw: string;
    provinceId: string;
    cityId: string;
    districtId: string;
    subdistrictId: string;
    postalCode: string;
  };
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

type OnboardingState = {
  businessType: string;
  companyType: string;
  paymentFeature: string[];
  edcInformation: EdcInformation;
  businessEntity: BusinessEntityDraft | null;
  setBusinessType: (businessType: string, companyType: string) => void;
  setPaymentFeature: (paymentFeature: string[]) => void;
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
    addressNumber: "",
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
  paymentFeature: [],
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
