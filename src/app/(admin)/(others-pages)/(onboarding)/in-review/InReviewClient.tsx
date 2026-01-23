"use client";

import { CheckCircle2, FileText, Download, Landmark, Store, Info } from "lucide-react";
import React, { useEffect } from "react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { useOnboardingStore } from "@/store/onboardingStore";

export default function InReviewClient() {
  const businessEntity = useOnboardingStore((state) => state.businessEntity);

  const business = businessEntity?.business ?? {
    merchantName: "",
    businessType: "",
    companyType: "",
    companyName: "",
    phoneNumber: "",
    email: "",
    websiteLink: "",
    businessMode: "",
    ownershipStatus: "",
    mcc: "",
    nibNumber: "",
    npwpNumber: "",
  };
  const businessAddress = businessEntity?.businessAddress ?? {
    streetName: "",
    rt: "",
    rw: "",
    provinceId: "",
    cityId: "",
    districtId: "",
    subdistrictId: "",
    postalCode: "",
  };
  const documents = businessEntity?.documents ?? {
    deedFileName: "",
    skKemenkumhamFileName: "",
    nibSkuFileName: "",
    additionalDocumentFileName: "",
  };
  const photos = businessEntity?.photos ?? {
    frontPhotoFileName: "",
    insidePhotoFileName: "",
    productPhotoFileName: "",
    logoFileName: "",
  };
  const owner = businessEntity?.owner ?? {
    name: "",
    birthPlace: "",
    birthDate: "",
    citizenship: "",
    ktpFileName: "",
    npwpFileName: "",
    nik: "",
    phoneNumber: "",
    email: "",
  };
  const ownerKtpAddress = businessEntity?.ownerKtpAddress ?? {
    streetName: "",
    rt: "",
    rw: "",
    provinceId: "",
    cityId: "",
    districtId: "",
    subdistrictId: "",
    postalCode: "",
  };
  const ownerDomicileAddress = businessEntity?.ownerDomicileAddress ?? {
    isSameAsKtp: false,
    streetName: "",
    rt: "",
    rw: "",
    provinceId: "",
    cityId: "",
    districtId: "",
    subdistrictId: "",
    postalCode: "",
  };
  const picAdmin = businessEntity?.picAdmin ?? {
    name: "",
    email: "",
    phoneNumber: "",
  };
  const settlement = businessEntity?.settlement ?? {
    bankName: "",
    accountNumber: "",
    accountName: "",
    email: "",
  };

  const establishedYear = "";
  const monthlyVolume = "";
  const ownerPassportNumber = "";
  const ownerPassportFileName = "";

  const formatAddress = (address: {
    streetName: string;
    rt: string;
    rw: string;
    subdistrictId: string;
    districtId: string;
    cityId: string;
    provinceId: string;
    postalCode: string;
  }) => (
    <div className="space-y-1 text-sm">
      <div>{address.streetName || "-"}</div>
      <div>{`RT/RW ${address.rt || "-"} / ${address.rw || "-"}`}</div>
      <div>{`${address.subdistrictId || "-"}, ${address.districtId || "-"}`}</div>
      <div>{`${address.cityId || "-"}, ${address.provinceId || "-"}`}</div>
      <div>{`Kode Pos ${address.postalCode || "-"}`}</div>
    </div>
  );

  const businessTypeLabel = business.businessType
    ? business.businessType === "company"
      ? "Company"
      : "Individual"
    : "-";
  const businessModeLabel = business.businessMode
    ? business.businessMode === "online"
      ? "Online"
      : "Offline"
    : "-";
  const ownershipStatusLabel = business.ownershipStatus
    ? business.ownershipStatus === "owned"
      ? "Milik Sendiri"
      : "Sewa"
    : "-";
  const isForeignOwner = owner.citizenship === "wna";

  const registrationRows = [
    { label: "Type", value: businessTypeLabel },
    {
      label: "Document Completeness",
      value: (
        <span className="inline-flex items-center gap-1 text-sm text-gray-900 dark:text-white">
          <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          0%
        </span>
      ),
    },
  ];

  const merchantInfoRows = [
    { label: "Nama Merchant", value: business.merchantName || "-" },
    { label: "Nama Perusahaan", value: business.companyName || "-" },
    ...(business.businessType === "company"
      ? [{ label: "Tipe Perusahaan", value: business.companyType || "-" }]
      : []),
    { label: "Tahun Berdiri", value: establishedYear || "-" },
    { label: "Perkiraan Volume Transaksi Bulanan", value: monthlyVolume || "-" },
    { label: "Business Mode", value: businessModeLabel },
    { label: "Ownership Status", value: ownershipStatusLabel },
    { label: "Category", value: business.mcc || "-" },
    { label: "Phone", value: business.phoneNumber || "-" },
    { label: "Email", value: business.email || "-" },
    {
      label: "Store URL",
      value: business.websiteLink ? (
        <a
          href={business.websiteLink}
          className="text-blue-600 hover:text-blue-700"
          target="_blank"
          rel="noreferrer"
        >
          {business.websiteLink}
        </a>
      ) : (
        "-"
      ),
    },
    { label: "Address", value: formatAddress(businessAddress) },
  ];

  const ownerRows = [
    { label: "Nama Pemilik Usaha / Direktur", value: owner.name || "-" },
    { label: "Tanggal Lahir", value: owner.birthDate || "-" },
    { label: "Tempat Lahir", value: owner.birthPlace || "-" },
    { label: "Kewarganegaraan", value: owner.citizenship ? owner.citizenship.toUpperCase() : "-" },
    { label: isForeignOwner ? "Nomor KITAS" : "NIK", value: owner.nik || "-" },
    ...(isForeignOwner ? [{ label: "Nomor Paspor", value: ownerPassportNumber || "-" }] : []),
    { label: "No. HP", value: owner.phoneNumber || "-" },
    { label: "Email", value: owner.email || "-" },
    { label: "Alamat KTP", value: formatAddress(ownerKtpAddress) },
    {
      label: "Alamat Domisili",
      value: ownerDomicileAddress.isSameAsKtp ? "Sama dengan KTP" : formatAddress(ownerDomicileAddress),
    },
  ];

  const picRows = [
    { label: "Nama", value: picAdmin.name || "-" },
    { label: "Email", value: picAdmin.email || "-" },
    { label: "Phone", value: picAdmin.phoneNumber || "-" },
  ];

  const bankRows = [
    { label: "Bank Name", value: settlement.bankName || "-" },
    { label: "Account Number", value: settlement.accountNumber || "-" },
    { label: "Account Name", value: settlement.accountName || "-" },
    { label: "Settlement Email", value: settlement.email || "-" },
  ];

  const registrationDocuments = [
    {
      label: isForeignOwner ? "KITAS" : "KTP",
      image: owner.ktpFileName ? "/images/carousel/carousel-01.png" : "",
      value: owner.ktpFileName ? undefined : "-",
    },
    ...(isForeignOwner
      ? [
          {
            label: "PASPOR",
            image: ownerPassportFileName ? "/images/carousel/carousel-02.png" : "",
            value: ownerPassportFileName ? undefined : "-",
          },
        ]
      : []),
    {
      label: "NPWP Pemilik",
      image: owner.npwpFileName ? "/images/carousel/carousel-03.png" : "",
      value: owner.npwpFileName ? undefined : "-",
    },
    {
      label: "Akta Perusahaan",
      value: documents.deedFileName ? (
        <div className="flex items-center gap-3">
          <a className="text-blue-600 hover:text-blue-700" href="#" target="_blank" rel="noreferrer" title="View">
            <FileText className="h-4 w-4" />
          </a>
          <a className="text-blue-600 hover:text-blue-700" href="#" download title="Download">
            <Download className="h-4 w-4" />
          </a>
        </div>
      ) : (
        "-"
      ),
    },
    {
      label: "SK Kemenkumham",
      value: documents.skKemenkumhamFileName ? (
        <div className="flex items-center gap-3">
          <a className="text-blue-600 hover:text-blue-700" href="#" target="_blank" rel="noreferrer" title="View">
            <FileText className="h-4 w-4" />
          </a>
          <a className="text-blue-600 hover:text-blue-700" href="#" download title="Download">
            <Download className="h-4 w-4" />
          </a>
        </div>
      ) : (
        "-"
      ),
    },
    {
      label: "NIB Perusahaan",
      value: business.nibNumber ? (
        <div className="flex items-center gap-3">
          <a className="text-blue-600 hover:text-blue-700" href="#" target="_blank" rel="noreferrer" title="View">
            <FileText className="h-4 w-4" />
          </a>
          <a className="text-blue-600 hover:text-blue-700" href="#" download title="Download">
            <Download className="h-4 w-4" />
          </a>
        </div>
      ) : (
        "-"
      ),
    },
    {
      label: "NPWP Perusahaan",
      image: business.npwpNumber ? "/images/carousel/carousel-04.png" : "",
      value: business.npwpNumber ? undefined : "-",
    },
    {
      label: "NIB / SKU",
      value: documents.nibSkuFileName ? (
        <div className="flex items-center gap-3">
          <a className="text-blue-600 hover:text-blue-700" href="#" target="_blank" rel="noreferrer" title="View">
            <FileText className="h-4 w-4" />
          </a>
          <a className="text-blue-600 hover:text-blue-700" href="#" download title="Download">
            <Download className="h-4 w-4" />
          </a>
        </div>
      ) : (
        "-"
      ),
    },
    {
      label: "Foto Usaha Tampak Depan",
      image: photos.frontPhotoFileName ? "/images/carousel/carousel-01.png" : "",
      value: photos.frontPhotoFileName ? undefined : "-",
    },
    {
      label: "Foto Usaha Tampak Dalam",
      image: photos.insidePhotoFileName ? "/images/carousel/carousel-02.png" : "",
      value: photos.insidePhotoFileName ? undefined : "-",
    },
    {
      label: "Foto Produk",
      image: photos.productPhotoFileName ? "/images/carousel/carousel-03.png" : "",
      value: photos.productPhotoFileName ? undefined : "-",
    },
    {
      label: "Logo Usaha",
      image: photos.logoFileName ? "/images/carousel/carousel-04.png" : "",
      value: photos.logoFileName ? undefined : "-",
    },
    {
      label: "Dokumen Tambahan",
      value: documents.additionalDocumentFileName ? (
        <div className="flex items-center gap-3">
          <a className="text-blue-600 hover:text-blue-700" href="#" target="_blank" rel="noreferrer" title="View">
            <FileText className="h-4 w-4" />
          </a>
          <a className="text-blue-600 hover:text-blue-700" href="#" download title="Download">
            <Download className="h-4 w-4" />
          </a>
        </div>
      ) : (
        "-"
      ),
    },
  ];

  useEffect(() => {
    const fancyboxOptions = {
      Thumbs: {
        autoStart: false,
      },
      Toolbar: {
        display: {
          left: [],
          middle: ["zoomIn", "zoomOut", "toggle1to1", "rotateCCW", "rotateCW"],
          right: ["close"],
        },
      },
    } as unknown as Record<string, unknown>;

    Fancybox.bind("[data-fancybox='registration-docs']", fancyboxOptions);

    return () => {
      Fancybox.destroy();
    };
  }, []);

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-blue-200 bg-blue-50 px-6 py-4 text-blue-800">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <Info className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold">Review & Konfirmasi Data</p>
            <p className="text-sm text-blue-700">
              Silakan periksa kembali seluruh data yang telah Anda isi. Pastikan informasi sudah benar sebelum dikirim
              untuk verifikasi.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="p-6">
          <div className="columns-1 gap-8 space-y-8 lg:columns-2">
            <div className="break-inside-avoid">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/20">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Informasi Merchant / Badan Usaha
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Ringkasan data merchant yang diinput.
                  </p>
                </div>
              </div>

              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {merchantInfoRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {row.label}
                    </span>
                    <span className="text-sm text-gray-900 dark:text-white sm:text-right sm:max-w-[60%]">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="break-inside-avoid">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/20">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Registration
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Ringkasan tipe dan kelengkapan dokumen.
                  </p>
                </div>
              </div>

              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {registrationRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {row.label}
                    </span>
                    <span className="text-sm text-gray-900 dark:text-white sm:text-right">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="break-inside-avoid">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/20">
                  <svg
                    className="w-6 h-6 text-blue-600 dark:text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 11c1.657 0 3-1.567 3-3.5S13.657 4 12 4s-3 1.567-3 3.5S10.343 11 12 11zm0 0c-3.314 0-6 2.239-6 5v1h12v-1c0-2.761-2.686-5-6-5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Data Pemilik Usaha / Direktur
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Informasi identitas dan alamat.
                  </p>
                </div>
              </div>

              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {ownerRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {row.label}
                    </span>
                    <span className="text-sm text-gray-900 dark:text-white sm:text-right sm:max-w-[60%]">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="break-inside-avoid">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/20">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    PIC Admin
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Kontak admin utama merchant.
                  </p>
                </div>
              </div>

              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {picRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {row.label}
                    </span>
                    <span className="text-sm text-gray-900 dark:text-white sm:text-right sm:max-w-[60%]">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="break-inside-avoid">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/20">
                  <Landmark className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Data Rekening Settlement
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Informasi rekening tujuan settlement.
                  </p>
                </div>
              </div>

              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {bankRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {row.label}
                    </span>
                    <span className="text-sm text-gray-900 dark:text-white sm:text-right">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="break-inside-avoid">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/20">
                  <Store className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Dokumen & Foto
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Dokumen dan foto yang diunggah.
                  </p>
                </div>
              </div>

              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {registrationDocuments.map((doc) => (
                  <div
                    key={doc.label}
                    className="flex items-center justify-between py-3 text-sm text-gray-600 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800"
                  >
                    <span>{doc.label}</span>
                    {doc.image ? (
                      <a
                        href={doc.image}
                        data-fancybox="registration-docs"
                        data-caption={doc.label}
                        className="flex flex-col items-end gap-1 text-blue-600 hover:text-blue-700"
                      >
                        <img
                          src={doc.image}
                          alt={doc.label}
                          className="h-14 w-24 rounded-md border border-gray-200 object-cover dark:border-gray-800"
                        />
                        <span className="text-xs">Enlarge</span>
                      </a>
                    ) : (
                      <span className="text-gray-500 dark:text-gray-500">{doc.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end">
        <button
          type="button"
          className="rounded-xl bg-teal-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-600"
        >
          Kirim
        </button>
      </div>
    </section>
  );
}
