"use client";

import UploadPreviewField from "@/components/form/UploadPreviewField";
import TableUpload from "@/components/table-upload";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info } from "lucide-react";
import { z } from "zod";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/store/onboardingStore";
import type { FileWithPreview } from "@/hooks/use-file-upload";

const imageAccept = "image/jpeg,image/png";
const pdfAccept = "application/pdf";

const nonEmptyString = z.string().min(1);

const addressSchema = z.object({
  streetName: nonEmptyString,
  rt: nonEmptyString,
  rw: nonEmptyString,
  provinceId: nonEmptyString,
  cityId: nonEmptyString,
  districtId: nonEmptyString,
  subdistrictId: nonEmptyString,
  postalCode: nonEmptyString,
});

const ownerDomicileSchema = z
  .object({
    isSameAsKtp: z.boolean(),
    streetName: z.string().optional(),
    rt: z.string().optional(),
    rw: z.string().optional(),
    provinceId: z.string().optional(),
    cityId: z.string().optional(),
    districtId: z.string().optional(),
    subdistrictId: z.string().optional(),
    postalCode: z.string().optional(),
  })
  .superRefine((value, ctx) => {
    if (value.isSameAsKtp) {
      return;
    }
    const fields = [
      ["streetName", value.streetName],
      ["rt", value.rt],
      ["rw", value.rw],
      ["provinceId", value.provinceId],
      ["cityId", value.cityId],
      ["districtId", value.districtId],
      ["subdistrictId", value.subdistrictId],
      ["postalCode", value.postalCode],
    ];
    fields.forEach(([key, fieldValue]) => {
      if (!fieldValue || fieldValue.trim().length === 0) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: [key], message: "Required" });
      }
    });
  });

const businessEntitySchema = z
  .object({
    business: z.object({
      merchantName: nonEmptyString,
      businessType: z.enum(["company", "individual"]),
      companyType: z.string().optional(),
      companyName: z.string().optional(),
      phoneNumber: nonEmptyString,
      email: nonEmptyString,
      websiteLink: z.string().optional(),
      businessMode: z.enum(["online", "offline"]),
      ownershipStatus: z.enum(["owned", "rent"]),
      mcc: nonEmptyString,
      nibNumber: z.string().optional(),
      npwpNumber: z.string().optional(),
    }),
    businessAddress: addressSchema,
    documents: z.object({
      deedFileName: z.string().optional(),
      skKemenkumhamFileName: z.string().optional(),
      nibSkuFileName: z.string().optional(),
      additionalDocumentFileName: z.string().optional(),
    }),
    photos: z.object({
      frontPhotoFileName: nonEmptyString,
      insidePhotoFileName: nonEmptyString,
      productPhotoFileName: nonEmptyString,
      logoFileName: z.string().optional(),
    }),
    owner: z.object({
      name: nonEmptyString,
      birthPlace: nonEmptyString,
      birthDate: nonEmptyString,
      citizenship: nonEmptyString,
      ktpFileName: nonEmptyString,
      npwpFileName: nonEmptyString,
      nik: nonEmptyString,
      phoneNumber: nonEmptyString,
      email: nonEmptyString,
    }),
    ownerKtpAddress: addressSchema,
    ownerDomicileAddress: ownerDomicileSchema,
    picAdmin: z.object({
      name: nonEmptyString,
      email: nonEmptyString,
      phoneNumber: nonEmptyString,
    }),
    settlement: z.object({
      bankName: nonEmptyString,
      accountNumber: nonEmptyString,
      accountName: nonEmptyString,
      email: nonEmptyString,
    }),
  })
  .superRefine((value, ctx) => {
    const { business, documents } = value;
    if (business.businessType === "company") {
      if (!business.companyType || business.companyType.trim().length === 0) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["business", "companyType"], message: "Required" });
      }
      if (!business.companyName || business.companyName.trim().length === 0) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["business", "companyName"], message: "Required" });
      }
      if (!business.nibNumber || business.nibNumber.trim().length === 0) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["business", "nibNumber"], message: "Required" });
      }
      if (!business.npwpNumber || business.npwpNumber.trim().length === 0) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["business", "npwpNumber"], message: "Required" });
      }
      if (!documents.deedFileName || documents.deedFileName.trim().length === 0) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["documents", "deedFileName"], message: "Required" });
      }
      if (!documents.skKemenkumhamFileName || documents.skKemenkumhamFileName.trim().length === 0) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["documents", "skKemenkumhamFileName"], message: "Required" });
      }
    }
    if (business.businessType === "individual") {
      if (!documents.nibSkuFileName || documents.nibSkuFileName.trim().length === 0) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["documents", "nibSkuFileName"], message: "Required" });
      }
    }
  });

function InfoPopover({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center text-gray-400 transition hover:text-gray-600"
          aria-label={label}
        >
          <Info className="h-4 w-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="text-xs text-gray-600">{children}</PopoverContent>
    </Popover>
  );
}

type SelectOption = {
  value: string;
  label: string;
};

function SearchableSelect({
  id,
  value,
  onValueChange,
  options,
  placeholder,
  disabled = false,
}: {
  id: string;
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder: string;
  disabled?: boolean;
}) {
  const [query, setQuery] = useState("");
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Select
      value={value}
      onValueChange={(nextValue) => {
        onValueChange(nextValue);
        setQuery("");
      }}
      disabled={disabled}
    >
      <SelectTrigger id={id} className="mt-2 h-11 rounded-xl border-gray-200 px-4 text-sm">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <div className="px-3 py-2">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari..."
            className="w-full rounded-md border border-gray-200 px-2 py-1 text-sm outline-none focus:border-gray-400"
          />
        </div>
        {filteredOptions.length === 0 ? (
          <div className="px-4 py-2 text-sm text-gray-400">Tidak ada hasil</div>
        ) : (
          filteredOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
}

const provinceOptions: SelectOption[] = [
  { value: "dki", label: "DKI Jakarta" },
  { value: "jabar", label: "Jawa Barat" },
  { value: "jateng", label: "Jawa Tengah" },
  { value: "jatim", label: "Jawa Timur" },
];

const cityOptionsByProvince: Record<string, SelectOption[]> = {
  dki: [
    { value: "jakarta", label: "Jakarta" },
    { value: "kepulauan-seribu", label: "Kepulauan Seribu" },
  ],
  jabar: [
    { value: "bandung", label: "Bandung" },
    { value: "bekasi", label: "Bekasi" },
  ],
  jateng: [
    { value: "semarang", label: "Semarang" },
    { value: "surakarta", label: "Surakarta" },
  ],
  jatim: [
    { value: "surabaya", label: "Surabaya" },
    { value: "malang", label: "Malang" },
  ],
};

const districtOptionsByCity: Record<string, SelectOption[]> = {
  jakarta: [
    { value: "menteng", label: "Menteng" },
    { value: "tanah-abang", label: "Tanah Abang" },
  ],
  bandung: [
    { value: "coblong", label: "Coblong" },
    { value: "lengkong", label: "Lengkong" },
  ],
  semarang: [
    { value: "banyumanik", label: "Banyumanik" },
    { value: "candisari", label: "Candisari" },
  ],
  surabaya: [
    { value: "gubeng", label: "Gubeng" },
    { value: "tegalsari", label: "Tegalsari" },
  ],
};

const subdistrictOptionsByDistrict: Record<string, SelectOption[]> = {
  menteng: [
    { value: "cikini", label: "Cikini" },
    { value: "gondangdia", label: "Gondangdia" },
  ],
  "tanah-abang": [
    { value: "bendungan-hilir", label: "Bendungan Hilir" },
    { value: "karet-tengsin", label: "Karet Tengsin" },
  ],
  coblong: [
    { value: "dago", label: "Dago" },
    { value: "lebakgede", label: "Lebakgede" },
  ],
  lengkong: [
    { value: "malabar", label: "Malabar" },
    { value: "turangga", label: "Turangga" },
  ],
};

export default function BusinessEntityForm() {
  const router = useRouter();
  const storedBusinessEntity = useOnboardingStore((state) => state.businessEntity);
  const setBusinessEntity = useOnboardingStore((state) => state.setBusinessEntity);

  const [merchantName, setMerchantName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [businessStreetName, setBusinessStreetName] = useState("");
  const [businessRt, setBusinessRt] = useState("");
  const [businessRw, setBusinessRw] = useState("");
  const [businessProvinceId, setBusinessProvinceId] = useState("");
  const [businessCityId, setBusinessCityId] = useState("");
  const [businessDistrictId, setBusinessDistrictId] = useState("");
  const [businessSubdistrictId, setBusinessSubdistrictId] = useState("");
  const [businessPostalCode, setBusinessPostalCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [businessMode, setBusinessMode] = useState("");
  const [ownershipStatus, setOwnershipStatus] = useState("");
  const [mcc, setMcc] = useState("");

  const [deedFile, setDeedFile] = useState<FileWithPreview | null>(null);
  const [skKemenkumhamFile, setSkKemenkumhamFile] = useState<FileWithPreview | null>(null);
  const [nibCompanyFile, setNibCompanyFile] = useState<FileWithPreview | null>(null);
  const [npwpCompanyFile, setNpwpCompanyFile] = useState<File | null>(null);
  const [npwpCompanyPreview, setNpwpCompanyPreview] = useState("");
  const [nibSkuFile, setNibSkuFile] = useState<FileWithPreview | null>(null);

  const [frontPhotoFile, setFrontPhotoFile] = useState<File | null>(null);
  const [frontPhotoPreview, setFrontPhotoPreview] = useState("");
  const [insidePhotoFile, setInsidePhotoFile] = useState<File | null>(null);
  const [insidePhotoPreview, setInsidePhotoPreview] = useState("");
  const [productPhotoFile, setProductPhotoFile] = useState<File | null>(null);
  const [productPhotoPreview, setProductPhotoPreview] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [additionalDocumentFile, setAdditionalDocumentFile] = useState<FileWithPreview | null>(null);
  const [photoErrors, setPhotoErrors] = useState<Record<string, string>>({});

  const [ownerName, setOwnerName] = useState("");
  const [ownerBirthPlace, setOwnerBirthPlace] = useState("");
  const [ownerBirthDate, setOwnerBirthDate] = useState("");
  const [ownerKtpStreetName, setOwnerKtpStreetName] = useState("");
  const [ownerKtpRt, setOwnerKtpRt] = useState("");
  const [ownerKtpRw, setOwnerKtpRw] = useState("");
  const [ownerKtpProvinceId, setOwnerKtpProvinceId] = useState("");
  const [ownerKtpCityId, setOwnerKtpCityId] = useState("");
  const [ownerKtpDistrictId, setOwnerKtpDistrictId] = useState("");
  const [ownerKtpSubdistrictId, setOwnerKtpSubdistrictId] = useState("");
  const [ownerKtpPostalCode, setOwnerKtpPostalCode] = useState("");
  const [ownerDomicileSame, setOwnerDomicileSame] = useState(false);
  const [ownerDomicileStreetName, setOwnerDomicileStreetName] = useState("");
  const [ownerDomicileRt, setOwnerDomicileRt] = useState("");
  const [ownerDomicileRw, setOwnerDomicileRw] = useState("");
  const [ownerDomicileProvinceId, setOwnerDomicileProvinceId] = useState("");
  const [ownerDomicileCityId, setOwnerDomicileCityId] = useState("");
  const [ownerDomicileDistrictId, setOwnerDomicileDistrictId] = useState("");
  const [ownerDomicileSubdistrictId, setOwnerDomicileSubdistrictId] = useState("");
  const [ownerDomicilePostalCode, setOwnerDomicilePostalCode] = useState("");
  const [ownerCitizenship, setOwnerCitizenship] = useState("");
  const [ownerKtpFile, setOwnerKtpFile] = useState<File | null>(null);
  const [ownerKtpPreview, setOwnerKtpPreview] = useState("");
  const [ownerNpwpFile, setOwnerNpwpFile] = useState<File | null>(null);
  const [ownerNpwpPreview, setOwnerNpwpPreview] = useState("");
  const [ownerNik, setOwnerNik] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");

  const [picName, setPicName] = useState("");
  const [picEmail, setPicEmail] = useState("");
  const [picPhone, setPicPhone] = useState("");

  const [bankName, setBankName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [settlementEmail, setSettlementEmail] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (!storedBusinessEntity) {
      return;
    }
    setMerchantName(storedBusinessEntity.business.merchantName ?? "");
    setBusinessType(storedBusinessEntity.business.businessType ?? "");
    setCompanyType(storedBusinessEntity.business.companyType ?? "");
    setCompanyName(storedBusinessEntity.business.companyName ?? "");
    setBusinessStreetName(storedBusinessEntity.businessAddress.streetName ?? "");
    setBusinessRt(storedBusinessEntity.businessAddress.rt ?? "");
    setBusinessRw(storedBusinessEntity.businessAddress.rw ?? "");
    setBusinessProvinceId(storedBusinessEntity.businessAddress.provinceId ?? "");
    setBusinessCityId(storedBusinessEntity.businessAddress.cityId ?? "");
    setBusinessDistrictId(storedBusinessEntity.businessAddress.districtId ?? "");
    setBusinessSubdistrictId(storedBusinessEntity.businessAddress.subdistrictId ?? "");
    setBusinessPostalCode(storedBusinessEntity.businessAddress.postalCode ?? "");
    setPhoneNumber(storedBusinessEntity.business.phoneNumber ?? "");
    setEmail(storedBusinessEntity.business.email ?? "");
    setWebsiteLink(storedBusinessEntity.business.websiteLink ?? "");
    setBusinessMode(storedBusinessEntity.business.businessMode ?? "");
    setOwnershipStatus(storedBusinessEntity.business.ownershipStatus ?? "");
    setMcc(storedBusinessEntity.business.mcc ?? "");
    setNibCompanyFile(null);
    setNpwpCompanyFile(null);
    setNpwpCompanyPreview("");

    setOwnerName(storedBusinessEntity.owner.name ?? "");
    setOwnerBirthPlace(storedBusinessEntity.owner.birthPlace ?? "");
    setOwnerBirthDate(storedBusinessEntity.owner.birthDate ?? "");
    setOwnerKtpStreetName(storedBusinessEntity.ownerKtpAddress.streetName ?? "");
    setOwnerKtpRt(storedBusinessEntity.ownerKtpAddress.rt ?? "");
    setOwnerKtpRw(storedBusinessEntity.ownerKtpAddress.rw ?? "");
    setOwnerKtpProvinceId(storedBusinessEntity.ownerKtpAddress.provinceId ?? "");
    setOwnerKtpCityId(storedBusinessEntity.ownerKtpAddress.cityId ?? "");
    setOwnerKtpDistrictId(storedBusinessEntity.ownerKtpAddress.districtId ?? "");
    setOwnerKtpSubdistrictId(storedBusinessEntity.ownerKtpAddress.subdistrictId ?? "");
    setOwnerKtpPostalCode(storedBusinessEntity.ownerKtpAddress.postalCode ?? "");
    setOwnerDomicileSame(storedBusinessEntity.ownerDomicileAddress.isSameAsKtp ?? false);
    setOwnerDomicileStreetName(storedBusinessEntity.ownerDomicileAddress.streetName ?? "");
    setOwnerDomicileRt(storedBusinessEntity.ownerDomicileAddress.rt ?? "");
    setOwnerDomicileRw(storedBusinessEntity.ownerDomicileAddress.rw ?? "");
    setOwnerDomicileProvinceId(storedBusinessEntity.ownerDomicileAddress.provinceId ?? "");
    setOwnerDomicileCityId(storedBusinessEntity.ownerDomicileAddress.cityId ?? "");
    setOwnerDomicileDistrictId(storedBusinessEntity.ownerDomicileAddress.districtId ?? "");
    setOwnerDomicileSubdistrictId(storedBusinessEntity.ownerDomicileAddress.subdistrictId ?? "");
    setOwnerDomicilePostalCode(storedBusinessEntity.ownerDomicileAddress.postalCode ?? "");
    setOwnerCitizenship(storedBusinessEntity.owner.citizenship ?? "");
    setOwnerNik(storedBusinessEntity.owner.nik ?? "");
    setOwnerPhone(storedBusinessEntity.owner.phoneNumber ?? "");
    setOwnerEmail(storedBusinessEntity.owner.email ?? "");

    setPicName(storedBusinessEntity.picAdmin.name ?? "");
    setPicEmail(storedBusinessEntity.picAdmin.email ?? "");
    setPicPhone(storedBusinessEntity.picAdmin.phoneNumber ?? "");

    setBankName(storedBusinessEntity.settlement.bankName ?? "");
    setBankAccountNumber(storedBusinessEntity.settlement.accountNumber ?? "");
    setBankAccountName(storedBusinessEntity.settlement.accountName ?? "");
    setSettlementEmail(storedBusinessEntity.settlement.email ?? "");
  }, [storedBusinessEntity]);

  useEffect(() => {
    setBusinessCityId("");
    setBusinessDistrictId("");
    setBusinessSubdistrictId("");
  }, [businessProvinceId]);

  useEffect(() => {
    setBusinessDistrictId("");
    setBusinessSubdistrictId("");
  }, [businessCityId]);

  useEffect(() => {
    setBusinessSubdistrictId("");
  }, [businessDistrictId]);

  useEffect(() => {
    setOwnerKtpCityId("");
    setOwnerKtpDistrictId("");
    setOwnerKtpSubdistrictId("");
  }, [ownerKtpProvinceId]);

  useEffect(() => {
    setOwnerKtpDistrictId("");
    setOwnerKtpSubdistrictId("");
  }, [ownerKtpCityId]);

  useEffect(() => {
    setOwnerKtpSubdistrictId("");
  }, [ownerKtpDistrictId]);

  useEffect(() => {
    setOwnerDomicileCityId("");
    setOwnerDomicileDistrictId("");
    setOwnerDomicileSubdistrictId("");
  }, [ownerDomicileProvinceId]);

  useEffect(() => {
    setOwnerDomicileDistrictId("");
    setOwnerDomicileSubdistrictId("");
  }, [ownerDomicileCityId]);

  useEffect(() => {
    setOwnerDomicileSubdistrictId("");
  }, [ownerDomicileDistrictId]);

  useEffect(() => {
    if (!ownerDomicileSame) {
      return;
    }
    setOwnerDomicileStreetName(ownerKtpStreetName);
    setOwnerDomicileRt(ownerKtpRt);
    setOwnerDomicileRw(ownerKtpRw);
    setOwnerDomicileProvinceId(ownerKtpProvinceId);
    setOwnerDomicileCityId(ownerKtpCityId);
    setOwnerDomicileDistrictId(ownerKtpDistrictId);
    setOwnerDomicileSubdistrictId(ownerKtpSubdistrictId);
    setOwnerDomicilePostalCode(ownerKtpPostalCode);
  }, [
    ownerDomicileSame,
    ownerKtpStreetName,
    ownerKtpRt,
    ownerKtpRw,
    ownerKtpProvinceId,
    ownerKtpCityId,
    ownerKtpDistrictId,
    ownerKtpSubdistrictId,
    ownerKtpPostalCode,
  ]);

  const handleBusinessTypeChange = (value: string) => {
    setBusinessType(value);
    setCompanyType("");
    if (value === "company") {
      setNibSkuFile(null);
    }
    if (value === "individual") {
      setDeedFile(null);
      setSkKemenkumhamFile(null);
      setNibCompanyFile(null);
      setNpwpCompanyFile(null);
      setNpwpCompanyPreview("");
    }
    setDeedFile(null);
    setSkKemenkumhamFile(null);
    setNibSkuFile(null);
    setNibCompanyFile(null);
    setNpwpCompanyFile(null);
    setNpwpCompanyPreview("");
    setFrontPhotoFile(null);
    setFrontPhotoPreview("");
    setInsidePhotoFile(null);
    setInsidePhotoPreview("");
    setProductPhotoFile(null);
    setProductPhotoPreview("");
    setLogoFile(null);
    setLogoPreview("");
    setAdditionalDocumentFile(null);
    setPhotoErrors({});
  };

  const handleDomicileSameChange = (checked: boolean) => {
    setOwnerDomicileSame(checked);
    if (!checked) {
      return;
    }
    setOwnerDomicileStreetName(ownerKtpStreetName);
    setOwnerDomicileRt(ownerKtpRt);
    setOwnerDomicileRw(ownerKtpRw);
    setOwnerDomicileProvinceId(ownerKtpProvinceId);
    setOwnerDomicileCityId(ownerKtpCityId);
    setOwnerDomicileDistrictId(ownerKtpDistrictId);
    setOwnerDomicileSubdistrictId(ownerKtpSubdistrictId);
    setOwnerDomicilePostalCode(ownerKtpPostalCode);
  };

  useEffect(() => {
    if (!frontPhotoFile || !frontPhotoFile.type.startsWith("image/")) {
      setFrontPhotoPreview("");
      return;
    }
    const url = URL.createObjectURL(frontPhotoFile);
    setFrontPhotoPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [frontPhotoFile]);

  useEffect(() => {
    if (!insidePhotoFile || !insidePhotoFile.type.startsWith("image/")) {
      setInsidePhotoPreview("");
      return;
    }
    const url = URL.createObjectURL(insidePhotoFile);
    setInsidePhotoPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [insidePhotoFile]);

  useEffect(() => {
    if (!productPhotoFile || !productPhotoFile.type.startsWith("image/")) {
      setProductPhotoPreview("");
      return;
    }
    const url = URL.createObjectURL(productPhotoFile);
    setProductPhotoPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [productPhotoFile]);

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
    if (!npwpCompanyFile || !npwpCompanyFile.type.startsWith("image/")) {
      setNpwpCompanyPreview("");
      return;
    }
    const url = URL.createObjectURL(npwpCompanyFile);
    setNpwpCompanyPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [npwpCompanyFile]);

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

  const handleNumericChange = (setter: (value: string) => void) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setter(event.target.value.replace(/\D/g, ""));
  };

  const hasFile = (file: File | null) => file instanceof File;
  const hasFileWrapper = (file: FileWithPreview | null) => !!file?.file;

  const handlePdfChange =
    (setter: (file: FileWithPreview | null) => void) => (files: FileWithPreview[]) =>
      setter(files[0] ?? null);

  const handleImageChange =
    (key: string, setter: (file: File | null) => void) => (file: File | null) => {
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
  };

  const buildMultipartPayload = () => {
    const formData = new FormData();
    const appendIf = (key: string, file?: File | null) => {
      if (file) {
        formData.append(key, file);
      }
    };
    appendIf("companyDeedFile", deedFile?.file ?? null);
    appendIf("skKemenkumhamFile", skKemenkumhamFile?.file ?? null);
    appendIf("nibNumber", nibCompanyFile?.file ?? null);
    appendIf("npwpNumber", npwpCompanyFile);
    appendIf("nibSkuFile", nibSkuFile?.file ?? null);
    appendIf("frontPhotoFile", frontPhotoFile);
    appendIf("insidePhotoFile", insidePhotoFile);
    appendIf("productPhotoFile", productPhotoFile);
    appendIf("logoFile", logoFile);
    appendIf("additionalDocumentFile", additionalDocumentFile?.file ?? null);
    appendIf("ownerKtpFile", ownerKtpFile);
    appendIf("ownerNpwpFile", ownerNpwpFile);
    return formData;
  };

  const isStep1Valid = () => {
    const hasCompanyDocuments =
      businessType !== "company" ||
      (companyType !== "" &&
        companyName.trim().length > 0 &&
        hasFileWrapper(deedFile) &&
        hasFileWrapper(skKemenkumhamFile) &&
        hasFileWrapper(nibCompanyFile) &&
        hasFile(npwpCompanyFile));

    const hasIndividualDocuments = businessType !== "individual" ? true : hasFileWrapper(nibSkuFile);

    return (
      merchantName.trim().length > 0 &&
      businessType !== "" &&
      businessStreetName.trim().length > 0 &&
      businessRt.trim().length > 0 &&
      businessRw.trim().length > 0 &&
      businessProvinceId !== "" &&
      businessCityId !== "" &&
      businessDistrictId !== "" &&
      businessSubdistrictId !== "" &&
      businessPostalCode.trim().length > 0 &&
      phoneNumber.trim().length > 0 &&
      email.trim().length > 0 &&
      businessMode !== "" &&
      ownershipStatus !== "" &&
      mcc !== "" &&
      hasFile(frontPhotoFile) &&
      hasFile(insidePhotoFile) &&
      hasFile(productPhotoFile) &&
      hasCompanyDocuments &&
      hasIndividualDocuments
    );
  };

  const isStep2Valid = () =>
    ownerName.trim().length > 0 &&
    ownerBirthPlace.trim().length > 0 &&
    ownerBirthDate.trim().length > 0 &&
    ownerKtpStreetName.trim().length > 0 &&
    ownerKtpRt.trim().length > 0 &&
    ownerKtpRw.trim().length > 0 &&
    ownerKtpProvinceId !== "" &&
    ownerKtpCityId !== "" &&
    ownerKtpDistrictId !== "" &&
    ownerKtpSubdistrictId !== "" &&
    ownerKtpPostalCode.trim().length > 0 &&
    (ownerDomicileSame ||
      (ownerDomicileStreetName.trim().length > 0 &&
        ownerDomicileRt.trim().length > 0 &&
        ownerDomicileRw.trim().length > 0 &&
        ownerDomicileProvinceId !== "" &&
        ownerDomicileCityId !== "" &&
        ownerDomicileDistrictId !== "" &&
        ownerDomicileSubdistrictId !== "" &&
        ownerDomicilePostalCode.trim().length > 0)) &&
    ownerCitizenship.trim().length > 0 &&
    hasFile(ownerKtpFile) &&
    hasFile(ownerNpwpFile) &&
    ownerNik.trim().length > 0 &&
    ownerPhone.trim().length > 0 &&
    ownerEmail.trim().length > 0;

  const isStep3Valid = () =>
    picName.trim().length > 0 && picEmail.trim().length > 0 && picPhone.trim().length > 0;

  const isStep4Valid = () =>
    bankName !== "" &&
    bankAccountNumber.trim().length > 0 &&
    bankAccountName.trim().length > 0 &&
    settlementEmail.trim().length > 0;

  const isFormValid = isStep1Valid() && isStep2Valid() && isStep3Valid() && isStep4Valid();

  const steps = [
    { id: 1, label: "Informasi Merchant / Badan Usaha" },
    { id: 2, label: "Data Pemilik Usaha / Direktur" },
    { id: 3, label: "Data PIC Admin" },
    { id: 4, label: "Data Rekening Settlement" },
  ];

  const isStepValid =
    currentStep === 1
      ? isStep1Valid()
      : currentStep === 2
      ? isStep2Valid()
      : currentStep === 3
      ? isStep3Valid()
      : isStep4Valid();
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === steps.length;

  const goToStep = (nextStep: number) => {
    setCurrentStep(nextStep);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextStep = () => {
    if (!isStepValid || isLastStep) {
      return;
    }
    goToStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    if (isFirstStep) {
      return;
    }
    goToStep(currentStep - 1);
  };

  const isCompany = businessType === "company";
  const ownerLabel = isCompany ? "Direktur" : "Pemilik Usaha";

  return (
    <form
      id="business-entity-form"
      className="mt-8 space-y-10"
      onReset={() => {
        setMerchantName("");
        setBusinessType("");
        setCompanyType("");
        setCompanyName("");
        setBusinessStreetName("");
        setBusinessRt("");
        setBusinessRw("");
        setBusinessProvinceId("");
        setBusinessCityId("");
        setBusinessDistrictId("");
        setBusinessSubdistrictId("");
        setBusinessPostalCode("");
        setPhoneNumber("");
        setEmail("");
        setWebsiteLink("");
        setBusinessMode("");
        setOwnershipStatus("");
        setMcc("");
        setDeedFile(null);
        setSkKemenkumhamFile(null);
        setNibCompanyFile(null);
        setNpwpCompanyFile(null);
        setNpwpCompanyPreview("");
        setNibSkuFile(null);
        setFrontPhotoFile(null);
        setFrontPhotoPreview("");
        setInsidePhotoFile(null);
        setInsidePhotoPreview("");
        setProductPhotoFile(null);
        setProductPhotoPreview("");
        setLogoFile(null);
        setLogoPreview("");
        setAdditionalDocumentFile(null);
        setOwnerName("");
        setOwnerBirthPlace("");
        setOwnerBirthDate("");
        setOwnerKtpStreetName("");
        setOwnerKtpRt("");
        setOwnerKtpRw("");
        setOwnerKtpProvinceId("");
        setOwnerKtpCityId("");
        setOwnerKtpDistrictId("");
        setOwnerKtpSubdistrictId("");
        setOwnerKtpPostalCode("");
        setOwnerDomicileSame(false);
        setOwnerDomicileStreetName("");
        setOwnerDomicileRt("");
        setOwnerDomicileRw("");
        setOwnerDomicileProvinceId("");
        setOwnerDomicileCityId("");
        setOwnerDomicileDistrictId("");
        setOwnerDomicileSubdistrictId("");
        setOwnerDomicilePostalCode("");
        setOwnerCitizenship("");
        setOwnerKtpFile(null);
        setOwnerKtpPreview("");
        setOwnerNpwpFile(null);
        setOwnerNpwpPreview("");
        setOwnerNik("");
        setOwnerPhone("");
        setOwnerEmail("");
        setPicName("");
        setPicEmail("");
        setPicPhone("");
        setBankName("");
        setBankAccountNumber("");
        setBankAccountName("");
        setSettlementEmail("");
        setCurrentStep(1);
      }}
      onSubmit={(event) => {
        event.preventDefault();
        if (currentStep !== steps.length) {
          if (isStepValid) {
            goToStep(currentStep + 1);
          }
          return;
        }
        if (!isFormValid) {
          return;
        }
        buildMultipartPayload();
        const payload = {
          business: {
            merchantName,
            businessType,
            companyType: isCompany ? companyType : "",
            companyName: isCompany ? companyName : "",
            phoneNumber,
            email,
            websiteLink,
            businessMode,
            ownershipStatus,
            mcc,
            nibNumber: isCompany ? nibCompanyFile?.file.name ?? "" : "",
            npwpNumber: isCompany ? npwpCompanyFile?.name ?? "" : "",
          },
          businessAddress: {
            streetName: businessStreetName,
            rt: businessRt,
            rw: businessRw,
            provinceId: businessProvinceId,
            cityId: businessCityId,
            districtId: businessDistrictId,
            subdistrictId: businessSubdistrictId,
            postalCode: businessPostalCode,
          },
          documents: {
            deedFileName: deedFile?.file.name ?? "",
            skKemenkumhamFileName: skKemenkumhamFile?.file.name ?? "",
            nibSkuFileName: nibSkuFile?.file.name ?? "",
            additionalDocumentFileName: additionalDocumentFile?.file.name ?? "",
          },
          photos: {
            frontPhotoFileName: frontPhotoFile?.name ?? "",
            insidePhotoFileName: insidePhotoFile?.name ?? "",
            productPhotoFileName: productPhotoFile?.name ?? "",
            logoFileName: logoFile?.name ?? "",
          },
          owner: {
            name: ownerName,
            birthPlace: ownerBirthPlace,
            birthDate: ownerBirthDate,
            citizenship: ownerCitizenship,
            ktpFileName: ownerKtpFile?.name ?? "",
            npwpFileName: ownerNpwpFile?.name ?? "",
            nik: ownerNik,
            phoneNumber: ownerPhone,
            email: ownerEmail,
          },
          ownerKtpAddress: {
            streetName: ownerKtpStreetName,
            rt: ownerKtpRt,
            rw: ownerKtpRw,
            provinceId: ownerKtpProvinceId,
            cityId: ownerKtpCityId,
            districtId: ownerKtpDistrictId,
            subdistrictId: ownerKtpSubdistrictId,
            postalCode: ownerKtpPostalCode,
          },
          ownerDomicileAddress: {
            isSameAsKtp: ownerDomicileSame,
            streetName: ownerDomicileStreetName,
            rt: ownerDomicileRt,
            rw: ownerDomicileRw,
            provinceId: ownerDomicileProvinceId,
            cityId: ownerDomicileCityId,
            districtId: ownerDomicileDistrictId,
            subdistrictId: ownerDomicileSubdistrictId,
            postalCode: ownerDomicilePostalCode,
          },
          picAdmin: {
            name: picName,
            email: picEmail,
            phoneNumber: picPhone,
          },
          settlement: {
            bankName,
            accountNumber: bankAccountNumber,
            accountName: bankAccountName,
            email: settlementEmail,
          },
        };
        const validationResult = businessEntitySchema.safeParse(payload);
        if (!validationResult.success) {
          return;
        }
        setBusinessEntity(validationResult.data);
        router.push("/payment-feature");
      }}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          {steps.map((step, index) => {
            const isActive = currentStep === step.id;
            const isComplete = currentStep > step.id;
            return (
              <div key={step.id} className="flex items-center gap-3">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${
                    isActive
                      ? "bg-teal-500 text-white"
                      : isComplete
                      ? "bg-teal-100 text-teal-700"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {step.id}
                </div>
                <span
                  className={`text-sm font-semibold ${
                    isActive ? "text-gray-900" : isComplete ? "text-gray-700" : "text-gray-400"
                  }`}
                >
                  {step.label}
                </span>
                {index < steps.length - 1 && <span className="text-gray-300">›</span>}
              </div>
            );
          })}
        </div>
      </div>

      {currentStep === 1 && (
      <section className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Informasi Merchant / Badan Usaha</h3>
          <p className="text-sm text-gray-500">Lengkapi data bisnis merchant sesuai jenis usaha.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700">
              Tipe Bisnis
              <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
            </label>
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
                  description:
                    "Bisnis yang dimiliki oleh suatu entitas dan memiliki hak dan kewajiban hukum sendiri.",
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
          </div>

          {businessType === "company" && (
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700">
                Tipe Perusahaan
                <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
              </label>
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
            </div>
          )}

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="merchantName">
              Nama Merchant
              <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
            </label>
            <input
              id="merchantName"
              name="merchantName"
              type="text"
              // value={merchantName}
              // readOnly
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none"
              placeholder="Your brand"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="companyName">
              Nama Perusahaan
              <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
            </label>
            <input
              id="companyName"
              name="companyName"
              type="text"
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              required={isCompany}
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="businessStreetName">
              Nama Jalan
              <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
            </label>
            <input
              id="businessStreetName"
              name="businessStreetName"
              type="text"
              value={businessStreetName}
              onChange={(event) => setBusinessStreetName(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-gray-700" htmlFor="businessRt">
                RT
                <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
              </label>
              <input
                id="businessRt"
                name="businessRt"
                type="text"
                inputMode="numeric"
                value={businessRt}
                onChange={handleNumericChange(setBusinessRt)}
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700" htmlFor="businessRw">
                RW
                <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
              </label>
              <input
                id="businessRw"
                name="businessRw"
                type="text"
                inputMode="numeric"
                value={businessRw}
                onChange={handleNumericChange(setBusinessRw)}
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="businessProvinceId">
              Provinsi
              <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
            </label>
            <SearchableSelect
              id="businessProvinceId"
              value={businessProvinceId}
              onValueChange={setBusinessProvinceId}
              options={provinceOptions}
              placeholder="Pilih provinsi"
            />
            <input type="hidden" name="businessProvinceId" value={businessProvinceId} />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="businessCityId">
              Kota / Kabupaten
              <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
            </label>
            <SearchableSelect
              id="businessCityId"
              value={businessCityId}
              onValueChange={setBusinessCityId}
              options={cityOptionsByProvince[businessProvinceId] ?? []}
              placeholder="Pilih kota/kabupaten"
              disabled={!businessProvinceId}
            />
            <input type="hidden" name="businessCityId" value={businessCityId} />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="businessDistrictId">
              Kecamatan
              <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
            </label>
            <SearchableSelect
              id="businessDistrictId"
              value={businessDistrictId}
              onValueChange={setBusinessDistrictId}
              options={districtOptionsByCity[businessCityId] ?? []}
              placeholder="Pilih kecamatan"
              disabled={!businessCityId}
            />
            <input type="hidden" name="businessDistrictId" value={businessDistrictId} />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="businessSubdistrictId">
              Kelurahan
              <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
            </label>
            <SearchableSelect
              id="businessSubdistrictId"
              value={businessSubdistrictId}
              onValueChange={setBusinessSubdistrictId}
              options={subdistrictOptionsByDistrict[businessDistrictId] ?? []}
              placeholder="Pilih kelurahan"
              disabled={!businessDistrictId}
            />
            <input type="hidden" name="businessSubdistrictId" value={businessSubdistrictId} />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="businessPostalCode">
              Kode Pos
              <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
            </label>
            <input
              id="businessPostalCode"
              name="businessPostalCode"
              type="number"
              inputMode="numeric"
              value={businessPostalCode}
              onChange={handleNumericChange(setBusinessPostalCode)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="phoneNumber">
              Nomor Handphone
              <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              inputMode="numeric"
              value={phoneNumber}
              onChange={handleNumericChange(setPhoneNumber)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="email">
              Email
              <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="websiteLink">
              Link Website
            </label>
            <input
              id="websiteLink"
              name="websiteLink"
              type="url"
              value={websiteLink}
              onChange={(event) => setWebsiteLink(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              placeholder="https://"
            />
          </div>

          <div>
          <p className="text-sm font-medium text-gray-700">
            Jenis Usaha
            <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
          </p>
          <div className="mt-2 flex flex-wrap gap-4">
            <label className="inline-flex items-center gap-2 text-sm text-gray-700">
              <input
                type="radio"
                name="businessMode"
                value="online"
                checked={businessMode === "online"}
                onChange={() => setBusinessMode("online")}
                className="h-4 w-4 border-gray-300 text-teal-600"
                required
              />
              Online
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-gray-700">
              <input
                type="radio"
                name="businessMode"
                value="offline"
                checked={businessMode === "offline"}
                onChange={() => setBusinessMode("offline")}
                className="h-4 w-4 border-gray-300 text-teal-600"
                required
              />
              Offline
            </label>
          </div>
          </div>

          <div>
          <p className="text-sm font-medium text-gray-700">
            Status Kepemilikan Usaha
            <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
          </p>
          <div className="mt-2 flex flex-wrap gap-4">
            <label className="inline-flex items-center gap-2 text-sm text-gray-700">
              <input
                type="radio"
                name="ownershipStatus"
                value="owned"
                checked={ownershipStatus === "owned"}
                onChange={() => setOwnershipStatus("owned")}
                className="h-4 w-4 border-gray-300 text-teal-600"
                required
              />
              Milik Sendiri
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-gray-700">
              <input
                type="radio"
                name="ownershipStatus"
                value="rent"
                checked={ownershipStatus === "rent"}
                onChange={() => setOwnershipStatus("rent")}
                className="h-4 w-4 border-gray-300 text-teal-600"
                required
              />
              Sewa
            </label>
          </div>
          </div>

          <div className="md:col-span-2">
          <label className="text-sm font-medium text-gray-700" htmlFor="mcc">
            Kategori Usaha
            <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
          </label>
          <Select value={mcc} onValueChange={setMcc}>
            <SelectTrigger id="mcc" className="mt-2 h-11 rounded-xl border-gray-200 px-4 text-sm">
              <SelectValue placeholder="Pilih kategori usaha" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mcc-5411">MCC 5411</SelectItem>
              <SelectItem value="mcc-5812">MCC 5812</SelectItem>
              <SelectItem value="mcc-5999">MCC 5999</SelectItem>
            </SelectContent>
          </Select>
          <input type="hidden" name="mcc" value={mcc} />
          </div>

          {businessType === "company" && (
            <>
              <div className="md:col-span-2 grid gap-6 sm:grid-cols-2">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-700">
                      Akta Perusahaan ({"<= 5 tahun"})
                      <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
                    </p>
                    <InfoPopover label="Informasi akta perusahaan">
                      *yg menjabarkan jajaran direksi & pasal yg menerangkan "maksud & tujuan perusahaan"
                    </InfoPopover>
                  </div>
                  <TableUpload
                    maxFiles={1}
                    multiple={false}
                    accept={pdfAccept}
                    simulateUpload={false}
                    showDefaults={false}
                    onFilesChange={handlePdfChange(setDeedFile)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    SK Kemenkumham
                    <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
                  </p>
                  <TableUpload
                    maxFiles={1}
                    multiple={false}
                    accept={pdfAccept}
                    simulateUpload={false}
                    showDefaults={false}
                    onFilesChange={handlePdfChange(setSkKemenkumhamFile)}
                    className="mt-2"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-700">
                    NIB Perusahaan
                    <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
                  </p>
                  <InfoPopover label="Informasi NIB perusahaan">*Harus sesuai dengan bidang usaha</InfoPopover>
                </div>
                <TableUpload
                  maxFiles={1}
                  multiple={false}
                  accept={pdfAccept}
                  simulateUpload={false}
                  showDefaults={false}
                  onFilesChange={handlePdfChange(setNibCompanyFile)}
                  className="mt-2"
                />
                <input type="hidden" name="nibNumber" value={nibCompanyFile?.file.name ?? ""} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  NPWP Perusahaan
                  <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
                </p>
                <UploadPreviewField
                  id="npwpNumber"
                  name="npwpNumber"
                  label=""
                  accept={imageAccept}
                  file={npwpCompanyFile}
                  previewUrl={npwpCompanyPreview}
                  onFileChange={handleImageChange("npwpCompanyFile", setNpwpCompanyFile)}
                  onClear={() => setNpwpCompanyFile(null)}
                  previewAlt="Pratinjau NPWP perusahaan"
                  previewHeightClass="h-36"
                />
                <input type="hidden" name="npwpNumber" value={npwpCompanyFile?.name ?? ""} />
                {photoErrors.npwpCompanyFile && (
                  <p className="mt-2 text-xs text-red-500">{photoErrors.npwpCompanyFile}</p>
                )}
              </div>
            </>
          )}

          {businessType === "individual" && (
            <div className="md:col-span-2">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-gray-700">
                  NIB / SKU (Surat Keterangan Usaha)
                  <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
                </p>
                <InfoPopover label="Informasi NIB/SKU">
                  *SKU masa berlaku kurang dari 12 bulan; SKU bisa dari RT/RW, kelurahan, kecamatan setempat; Harus sesuai bidang usaha
                </InfoPopover>
              </div>
              <TableUpload
                maxFiles={1}
                multiple={false}
                accept={pdfAccept}
                simulateUpload={false}
                showDefaults={false}
                onFilesChange={handlePdfChange(setNibSkuFile)}
                className="mt-2"
              />
            </div>
          )}

          {businessType !== "" && (
            <>
              <div className="md:col-span-2 grid gap-6 sm:grid-cols-2">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-700">
                      Foto Usaha Tampak Depan (plang usaha terlihat)
                      <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
                    </p>
                    <InfoPopover label="Informasi foto tampak depan">
                      *bidang usaha jasa apabila tidak ada plang : foto lokasi usaha yg terlihat aktivitas usaha/Kartu nama/social media
                    </InfoPopover>
                  </div>
                  <UploadPreviewField
                    id="frontPhoto"
                    name="frontPhoto"
                    label=""
                    accept={imageAccept}
                    file={frontPhotoFile}
                    previewUrl={frontPhotoPreview}
                    onFileChange={handleImageChange("frontPhoto", setFrontPhotoFile)}
                    onClear={() => setFrontPhotoFile(null)}
                    previewAlt="Pratinjau foto tampak depan"
                    previewHeightClass="h-36"
                  />
                  {photoErrors.frontPhoto && <p className="mt-2 text-xs text-red-500">{photoErrors.frontPhoto}</p>}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Foto Usaha Dalam (produk / aktivitas usaha)
                    <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
                  </p>
                  <UploadPreviewField
                    id="insidePhoto"
                    name="insidePhoto"
                    label=""
                    accept={imageAccept}
                    file={insidePhotoFile}
                    previewUrl={insidePhotoPreview}
                    onFileChange={handleImageChange("insidePhoto", setInsidePhotoFile)}
                    onClear={() => setInsidePhotoFile(null)}
                    previewAlt="Pratinjau foto usaha dalam"
                    previewHeightClass="h-36"
                  />
                  {photoErrors.insidePhoto && <p className="mt-2 text-xs text-red-500">{photoErrors.insidePhoto}</p>}
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-700">
                    Foto Produk / Brosur / Price List
                    <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
                  </p>
                  <InfoPopover label="Informasi foto produk">
                    *bidang usaha jasa bisa melampirkan foto lokasi usaha yg terlihat aktivitas usaha
                  </InfoPopover>
                </div>
                <UploadPreviewField
                  id="productPhoto"
                  name="productPhoto"
                  label=""
                  accept={imageAccept}
                  file={productPhotoFile}
                  previewUrl={productPhotoPreview}
                  onFileChange={handleImageChange("productPhoto", setProductPhotoFile)}
                  onClear={() => setProductPhotoFile(null)}
                  previewAlt="Pratinjau foto produk"
                  previewHeightClass="h-36"
                />
                {photoErrors.productPhoto && <p className="mt-2 text-xs text-red-500">{photoErrors.productPhoto}</p>}
              </div>

              <div className="md:col-span-2 grid gap-6 sm:grid-cols-2">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-700">Logo Usaha (optional)</p>
                    <InfoPopover label="Informasi logo usaha">
                      *Kredivo wajib lampirkan logo (bentuk JPEG)
                    </InfoPopover>
                  </div>
                  <UploadPreviewField
                    id="logoFile"
                    name="logoFile"
                    label=""
                    accept={imageAccept}
                    file={logoFile}
                    previewUrl={logoPreview}
                    onFileChange={handleImageChange("logoFile", setLogoFile)}
                    onClear={() => setLogoFile(null)}
                    previewAlt="Pratinjau logo usaha"
                    previewHeightClass="h-36"
                  />
                  {photoErrors.logoFile && <p className="mt-2 text-xs text-red-500">{photoErrors.logoFile}</p>}
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
                    onFilesChange={handlePdfChange(setAdditionalDocumentFile)}
                    className="mt-2"
                  />
                </div>
              </div>
            </>
          )}
        </div>
        </section>
      )}

      {currentStep === 2 && (
        <section className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Data Pemilik Usaha / Direktur</h3>
          <p className="text-sm text-gray-500">Data {ownerLabel.toLowerCase()} utama untuk verifikasi.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="ownerName">
              Nama {ownerLabel}
              <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
            </label>
            <input
              id="ownerName"
              name="ownerName"
              type="text"
              value={ownerName}
              onChange={(event) => setOwnerName(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="ownerBirthPlace">
              Tempat Lahir
              <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
            </label>
            <input
              id="ownerBirthPlace"
              name="ownerBirthPlace"
              type="text"
              value={ownerBirthPlace}
              onChange={(event) => setOwnerBirthPlace(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="ownerBirthDate">
              Tanggal Lahir
              <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
            </label>
            <input
              id="ownerBirthDate"
              name="ownerBirthDate"
              type="date"
              value={ownerBirthDate}
              onChange={(event) => setOwnerBirthDate(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="ownerCitizenship">
              Kewarganegaraan
              <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
            </label>
            <input
              id="ownerCitizenship"
              name="ownerCitizenship"
              type="text"
              value={ownerCitizenship}
              onChange={(event) => setOwnerCitizenship(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              required
            />
          </div>

          <div className="md:col-span-2 grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-900">Alamat Pemilik (Sesuai KTP)</h4>
                <p className="text-xs text-gray-500">Lengkapi alamat sesuai KTP.</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700" htmlFor="ownerKtpStreetName">
                  Nama Jalan
                  <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
                </label>
                <input
                  id="ownerKtpStreetName"
                  name="ownerKtpStreetName"
                  type="text"
                  value={ownerKtpStreetName}
                  onChange={(event) => setOwnerKtpStreetName(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
                  required
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-gray-700" htmlFor="ownerKtpRt">
                    RT
                    <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
                  </label>
                  <input
                    id="ownerKtpRt"
                    name="ownerKtpRt"
                    type="text"
                    inputMode="numeric"
                    value={ownerKtpRt}
                    onChange={handleNumericChange(setOwnerKtpRt)}
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700" htmlFor="ownerKtpRw">
                    RW
                    <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
                  </label>
                  <input
                    id="ownerKtpRw"
                    name="ownerKtpRw"
                    type="text"
                    inputMode="numeric"
                    value={ownerKtpRw}
                    onChange={handleNumericChange(setOwnerKtpRw)}
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700" htmlFor="ownerKtpProvinceId">
                  Provinsi
                  <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
                </label>
                <SearchableSelect
                  id="ownerKtpProvinceId"
                  value={ownerKtpProvinceId}
                  onValueChange={setOwnerKtpProvinceId}
                  options={provinceOptions}
                  placeholder="Pilih provinsi"
                />
                <input type="hidden" name="ownerKtpProvinceId" value={ownerKtpProvinceId} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700" htmlFor="ownerKtpCityId">
                  Kota / Kabupaten
                  <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
                </label>
                <SearchableSelect
                  id="ownerKtpCityId"
                  value={ownerKtpCityId}
                  onValueChange={setOwnerKtpCityId}
                  options={cityOptionsByProvince[ownerKtpProvinceId] ?? []}
                  placeholder="Pilih kota/kabupaten"
                  disabled={!ownerKtpProvinceId}
                />
                <input type="hidden" name="ownerKtpCityId" value={ownerKtpCityId} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700" htmlFor="ownerKtpDistrictId">
                  Kecamatan
                  <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
                </label>
                <SearchableSelect
                  id="ownerKtpDistrictId"
                  value={ownerKtpDistrictId}
                  onValueChange={setOwnerKtpDistrictId}
                  options={districtOptionsByCity[ownerKtpCityId] ?? []}
                  placeholder="Pilih kecamatan"
                  disabled={!ownerKtpCityId}
                />
                <input type="hidden" name="ownerKtpDistrictId" value={ownerKtpDistrictId} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700" htmlFor="ownerKtpSubdistrictId">
                  Kelurahan
                  <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
                </label>
                <SearchableSelect
                  id="ownerKtpSubdistrictId"
                  value={ownerKtpSubdistrictId}
                  onValueChange={setOwnerKtpSubdistrictId}
                  options={subdistrictOptionsByDistrict[ownerKtpDistrictId] ?? []}
                  placeholder="Pilih kelurahan"
                  disabled={!ownerKtpDistrictId}
                />
                <input type="hidden" name="ownerKtpSubdistrictId" value={ownerKtpSubdistrictId} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700" htmlFor="ownerKtpPostalCode">
                  Kode Pos
                  <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
                </label>
                <input
                  id="ownerKtpPostalCode"
                  name="ownerKtpPostalCode"
                  type="number"
                  inputMode="numeric"
                  value={ownerKtpPostalCode}
                  onChange={handleNumericChange(setOwnerKtpPostalCode)}
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
                  required
                />
              </div>
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
                      onChange={(event) => handleDomicileSameChange(event.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-teal-600"
                    />
                    Sama seperti alamat KTP
                  </label>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700" htmlFor="ownerDomicileStreetName">
                  Nama Jalan
                  {!ownerDomicileSame && <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>}
                </label>
                <input
                  id="ownerDomicileStreetName"
                  name="ownerDomicileStreetName"
                  type="text"
                  value={ownerDomicileStreetName}
                  onChange={(event) => setOwnerDomicileStreetName(event.target.value)}
                  className={`mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400 ${
                    ownerDomicileSame ? "bg-gray-50 text-gray-500" : ""
                  }`}
                  required={!ownerDomicileSame}
                  disabled={ownerDomicileSame}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-gray-700" htmlFor="ownerDomicileRt">
                    RT
                    {!ownerDomicileSame && <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>}
                  </label>
                  <input
                    id="ownerDomicileRt"
                    name="ownerDomicileRt"
                    type="text"
                    inputMode="numeric"
                    value={ownerDomicileRt}
                    onChange={handleNumericChange(setOwnerDomicileRt)}
                    className={`mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400 ${
                      ownerDomicileSame ? "bg-gray-50 text-gray-500" : ""
                    }`}
                    required={!ownerDomicileSame}
                    disabled={ownerDomicileSame}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700" htmlFor="ownerDomicileRw">
                    RW
                    {!ownerDomicileSame && <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>}
                  </label>
                  <input
                    id="ownerDomicileRw"
                    name="ownerDomicileRw"
                    type="text"
                    inputMode="numeric"
                    value={ownerDomicileRw}
                    onChange={handleNumericChange(setOwnerDomicileRw)}
                    className={`mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400 ${
                      ownerDomicileSame ? "bg-gray-50 text-gray-500" : ""
                    }`}
                    required={!ownerDomicileSame}
                    disabled={ownerDomicileSame}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700" htmlFor="ownerDomicileProvinceId">
                  Provinsi
                  {!ownerDomicileSame && <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>}
                </label>
                <SearchableSelect
                  id="ownerDomicileProvinceId"
                  value={ownerDomicileProvinceId}
                  onValueChange={setOwnerDomicileProvinceId}
                  options={provinceOptions}
                  placeholder="Pilih provinsi"
                  disabled={ownerDomicileSame}
                />
                <input type="hidden" name="ownerDomicileProvinceId" value={ownerDomicileProvinceId} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700" htmlFor="ownerDomicileCityId">
                  Kota / Kabupaten
                  {!ownerDomicileSame && <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>}
                </label>
                <SearchableSelect
                  id="ownerDomicileCityId"
                  value={ownerDomicileCityId}
                  onValueChange={setOwnerDomicileCityId}
                  options={cityOptionsByProvince[ownerDomicileProvinceId] ?? []}
                  placeholder="Pilih kota/kabupaten"
                  disabled={!ownerDomicileProvinceId || ownerDomicileSame}
                />
                <input type="hidden" name="ownerDomicileCityId" value={ownerDomicileCityId} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700" htmlFor="ownerDomicileDistrictId">
                  Kecamatan
                  {!ownerDomicileSame && <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>}
                </label>
                <SearchableSelect
                  id="ownerDomicileDistrictId"
                  value={ownerDomicileDistrictId}
                  onValueChange={setOwnerDomicileDistrictId}
                  options={districtOptionsByCity[ownerDomicileCityId] ?? []}
                  placeholder="Pilih kecamatan"
                  disabled={!ownerDomicileCityId || ownerDomicileSame}
                />
                <input type="hidden" name="ownerDomicileDistrictId" value={ownerDomicileDistrictId} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700" htmlFor="ownerDomicileSubdistrictId">
                  Kelurahan
                  {!ownerDomicileSame && <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>}
                </label>
                <SearchableSelect
                  id="ownerDomicileSubdistrictId"
                  value={ownerDomicileSubdistrictId}
                  onValueChange={setOwnerDomicileSubdistrictId}
                  options={subdistrictOptionsByDistrict[ownerDomicileDistrictId] ?? []}
                  placeholder="Pilih kelurahan"
                  disabled={!ownerDomicileDistrictId || ownerDomicileSame}
                />
                <input type="hidden" name="ownerDomicileSubdistrictId" value={ownerDomicileSubdistrictId} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700" htmlFor="ownerDomicilePostalCode">
                  Kode Pos
                  {!ownerDomicileSame && <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>}
                </label>
                <input
                  id="ownerDomicilePostalCode"
                  name="ownerDomicilePostalCode"
                  type="number"
                  inputMode="numeric"
                  value={ownerDomicilePostalCode}
                  onChange={handleNumericChange(setOwnerDomicilePostalCode)}
                  className={`mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400 ${
                    ownerDomicileSame ? "bg-gray-50 text-gray-500" : ""
                  }`}
                  required={!ownerDomicileSame}
                  disabled={ownerDomicileSame}
                />
              </div>
            </div>
          </div>

          <div>
            <UploadPreviewField
              id="ownerKtp"
              name="ownerKtp"
              label="KTP Pemilik Usaha atau Direktur"
              accept={imageAccept}
              file={ownerKtpFile}
              previewUrl={ownerKtpPreview}
              onFileChange={handleImageChange("ownerKtpFile", setOwnerKtpFile)}
              onClear={() => setOwnerKtpFile(null)}
              previewAlt="Pratinjau KTP"
              previewHeightClass="h-36"
            />
          </div>

          <div>
            <UploadPreviewField
              id="ownerNpwp"
              name="ownerNpwp"
              label="NPWP Pemilik Usaha atau Direktur"
              accept={imageAccept}
              file={ownerNpwpFile}
              previewUrl={ownerNpwpPreview}
              onFileChange={handleImageChange("ownerNpwpFile", setOwnerNpwpFile)}
              onClear={() => setOwnerNpwpFile(null)}
              previewAlt="Pratinjau NPWP"
              previewHeightClass="h-36"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="ownerNik">
              NIK
              <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
            </label>
            <input
              id="ownerNik"
              name="ownerNik"
              type="text"
              inputMode="numeric"
              value={ownerNik}
              onChange={handleNumericChange(setOwnerNik)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="ownerPhone">
              Nomor Handphone
              <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
            </label>
            <input
              id="ownerPhone"
              name="ownerPhone"
              type="tel"
              inputMode="numeric"
              value={ownerPhone}
              onChange={handleNumericChange(setOwnerPhone)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="ownerEmail">
              Email
              <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
            </label>
            <input
              id="ownerEmail"
              name="ownerEmail"
              type="email"
              value={ownerEmail}
              onChange={(event) => setOwnerEmail(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              required
            />
          </div>
        </div>
      </section>
      )}

      {currentStep === 3 && (
      <section className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Data PIC Admin</h3>
          <p className="text-sm text-gray-500">PIC Admin dapat berbeda dengan pemilik usaha.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="picName">
              Nama PIC Admin
              <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
            </label>
            <input
              id="picName"
              name="picName"
              type="text"
              value={picName}
              onChange={(event) => setPicName(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="picEmail">
              Email
              <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
            </label>
            <input
              id="picEmail"
              name="picEmail"
              type="email"
              value={picEmail}
              onChange={(event) => setPicEmail(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="picPhone">
              Nomor Handphone
              <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
            </label>
            <input
              id="picPhone"
              name="picPhone"
              type="tel"
              inputMode="numeric"
              value={picPhone}
              onChange={handleNumericChange(setPicPhone)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              required
            />
          </div>
        </div>
        </section>
      )}

      {currentStep === 4 && (
        <section className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Data Rekening Settlement</h3>
          <p className="text-sm text-gray-500">Rekening tujuan pencairan dana settlement merchant.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="bankName">
              Nama Bank
              <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
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
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="bankAccountNumber">
              Nomor Akun Bank
              <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
            </label>
            <input
              id="bankAccountNumber"
              name="bankAccountNumber"
              type="text"
              inputMode="numeric"
              value={bankAccountNumber}
              onChange={handleNumericChange(setBankAccountNumber)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="bankAccountName">
              Nama Pemilik Akun
              <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
            </label>
            <input
              id="bankAccountName"
              name="bankAccountName"
              type="text"
              value={bankAccountName}
              onChange={(event) => setBankAccountName(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="settlementEmail">
              Email Settlement
              <span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
            </label>
            <input
              id="settlementEmail"
              name="settlementEmail"
              type="email"
              value={settlementEmail}
              onChange={(event) => setSettlementEmail(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              required
            />
          </div>
        </div>
        </section>
      )}

      <div className="flex flex-wrap items-center gap-3">
        {!isFirstStep && (
          <button
            type="button"
            onClick={handlePrevStep}
            className="rounded-xl border border-gray-200 px-5 py-2 text-sm font-semibold text-gray-700"
          >
            Kembali
          </button>
        )}
        <div className="ml-auto">
          {isLastStep ? (
            <button
              type="submit"
              disabled={!isFormValid}
              className={`rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition ${
                !isFormValid ? "cursor-not-allowed bg-teal-300" : "bg-teal-500 hover:bg-teal-600"
              }`}
            >
              Selanjutnya
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNextStep}
              disabled={!isStepValid}
              className={`rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition ${
                !isStepValid ? "cursor-not-allowed bg-teal-300" : "bg-teal-500 hover:bg-teal-600"
              }`}
            >
              Selanjutnya
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
