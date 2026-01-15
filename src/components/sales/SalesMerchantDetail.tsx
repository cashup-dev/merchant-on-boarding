"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeftIcon, CheckCircleIcon, ClockIcon, DocumentIcon } from "@heroicons/react/24/outline";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type MerchantDetail = {
  id: number;
  name: string;
  status: "New" | "Contacted" | "Pending Docs" | "Submitted" | "Approved";
  city: string;
  createdAt: string;
  lastActivity: string;
  business: {
    brandName: string;
    legalName: string;
    businessType: string;
    category: string;
    establishedYear: string;
    employeeCount: string;
    monthlyVolume: string;
    socialLink: string;
    paymentFeatures: string[];
  };
  address: {
    streetName: string;
    rt: string;
    rw: string;
    province: string;
    city: string;
    district: string;
    subDistrict: string;
    postalCode: string;
  };
  owner: {
    name: string;
    nik: string;
    npwp: string;
  };
  bank: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  };
  documents: {
    ownerKtp: boolean;
    ownerNpwp: boolean;
    bankBook: boolean;
    bankMutation: boolean;
    sku: boolean;
  };
  edcInformation: {
    edcType: string;
    edcCount: string;
    shippingAddress: {
      streetName: string;
      rt: string;
      rw: string;
      province: string;
      city: string;
      district: string;
      subDistrict: string;
      postalCode: string;
    };
  };
};

type MdrRow = {
  id: number;
  acquirer: string;
  cardType: string;
  onOffUs: string;
  cardPrincipal: string;
  acquirerMdr: string;
  aggregatorMdr: string;
  agentMdr: string;
  dealerMdr: string;
  salesMdr: string;
  cashlezRevenue: string;
};

const defaultMdrRow = (id: number): MdrRow => ({
  id,
  acquirer: "Bank MTI",
  cardType: "Credit",
  onOffUs: "Off Us",
  cardPrincipal: "All Card Principals",
  acquirerMdr: "0",
  aggregatorMdr: "0",
  agentMdr: "0",
  dealerMdr: "0",
  salesMdr: "0",
  cashlezRevenue: "0",
});

const dummyDetails: MerchantDetail[] = [
  {
    id: 101,
    name: "Toko Nusantara",
    status: "New",
    city: "Jakarta",
    createdAt: "2026-01-08T09:20:00",
    lastActivity: "2026-01-09T14:10:00",
    business: {
      brandName: "Nusantara Mart",
      legalName: "PT Nusantara Sejahtera",
      businessType: "Company",
      category: "Retail",
      establishedYear: "2019",
      employeeCount: "6-20",
      monthlyVolume: "10 - 50 juta",
      socialLink: "www.nusantaramart.co.id",
      paymentFeatures: ["Cashlez", "Cashlez Link"],
    },
    address: {
      streetName: "Jl. Melati Raya No. 12",
      rt: "04",
      rw: "08",
      province: "DKI Jakarta",
      city: "Jakarta",
      district: "Kebayoran Baru",
      subDistrict: "Gandaria Utara",
      postalCode: "12140",
    },
    owner: {
      name: "Rina Lestari",
      nik: "3276012301980001",
      npwp: "14.123.456.7-891.000",
    },
    bank: {
      bankName: "BCA",
      accountNumber: "0123456789",
      accountName: "Rina Lestari",
    },
    documents: {
      ownerKtp: false,
      ownerNpwp: false,
      bankBook: false,
      bankMutation: false,
      sku: false,
    },
    edcInformation: {
      edcType: "Topwise T1 Plus",
      edcCount: "2",
      shippingAddress: {
        streetName: "Jl. Melati Raya No. 12",
        rt: "04",
        rw: "08",
        province: "DKI Jakarta",
        city: "Jakarta",
        district: "Kebayoran Baru",
        subDistrict: "Gandaria Utara",
        postalCode: "12140",
      },
    },
  },
  {
    id: 102,
    name: "Warung Bu Sari",
    status: "Contacted",
    city: "Bandung",
    createdAt: "2026-01-06T08:40:00",
    lastActivity: "2026-01-10T16:30:00",
    business: {
      brandName: "Warung Bu Sari",
      legalName: "UD Bu Sari",
      businessType: "Individual",
      category: "Food & Beverage",
      establishedYear: "2015",
      employeeCount: "1-5",
      monthlyVolume: "< 10 juta",
      socialLink: "instagram.com/warungbusari",
      paymentFeatures: ["Cashlez Link"],
    },
    address: {
      streetName: "Jl. Braga No. 22",
      rt: "02",
      rw: "05",
      province: "Jawa Barat",
      city: "Bandung",
      district: "Sumur Bandung",
      subDistrict: "Braga",
      postalCode: "40111",
    },
    owner: {
      name: "Sari Wulandari",
      nik: "3273014509850002",
      npwp: "23.456.789.0-123.000",
    },
    bank: {
      bankName: "BRI",
      accountNumber: "0987654321",
      accountName: "Sari Wulandari",
    },
    documents: {
      ownerKtp: true,
      ownerNpwp: false,
      bankBook: false,
      bankMutation: false,
      sku: false,
    },
    edcInformation: {
      edcType: "Soundbox Newland VB90S",
      edcCount: "1",
      shippingAddress: {
        streetName: "Jl. Braga No. 22",
        rt: "02",
        rw: "05",
        province: "Jawa Barat",
        city: "Bandung",
        district: "Sumur Bandung",
        subDistrict: "Braga",
        postalCode: "40111",
      },
    },
  },
  {
    id: 103,
    name: "Bengkel Maju Jaya",
    status: "Pending Docs",
    city: "Surabaya",
    createdAt: "2026-01-05T11:15:00",
    lastActivity: "2026-01-11T10:05:00",
    business: {
      brandName: "Maju Jaya Motor",
      legalName: "CV Maju Jaya",
      businessType: "Company",
      category: "Services",
      establishedYear: "2012",
      employeeCount: "21-50",
      monthlyVolume: "50 - 200 juta",
      socialLink: "facebook.com/majujayamotor",
      paymentFeatures: ["Softpos"],
    },
    address: {
      streetName: "Jl. Ahmad Yani No. 88",
      rt: "03",
      rw: "06",
      province: "Jawa Timur",
      city: "Surabaya",
      district: "Wonokromo",
      subDistrict: "Ngagel",
      postalCode: "60243",
    },
    owner: {
      name: "Tono Saputra",
      nik: "3578012707900003",
      npwp: "12.345.678.9-012.000",
    },
    bank: {
      bankName: "Mandiri",
      accountNumber: "1122334455",
      accountName: "Tono Saputra",
    },
    documents: {
      ownerKtp: true,
      ownerNpwp: true,
      bankBook: false,
      bankMutation: false,
      sku: false,
    },
    edcInformation: {
      edcType: "Centerm",
      edcCount: "3",
      shippingAddress: {
        streetName: "Jl. Ahmad Yani No. 88",
        rt: "03",
        rw: "06",
        province: "Jawa Timur",
        city: "Surabaya",
        district: "Wonokromo",
        subDistrict: "Ngagel",
        postalCode: "60243",
      },
    },
  },
  {
    id: 104,
    name: "Kedai Kopi Senja",
    status: "Submitted",
    city: "Jakarta",
    createdAt: "2026-01-03T13:05:00",
    lastActivity: "2026-01-12T09:50:00",
    business: {
      brandName: "Senja Coffee",
      legalName: "PT Senja Nusantara",
      businessType: "Company",
      category: "Food & Beverage",
      establishedYear: "2021",
      employeeCount: "6-20",
      monthlyVolume: "10 - 50 juta",
      socialLink: "tiktok.com/@senjacoffee",
      paymentFeatures: ["Cashlez", "Softpos"],
    },
    address: {
      streetName: "Jl. Sudirman No. 101",
      rt: "01",
      rw: "02",
      province: "DKI Jakarta",
      city: "Jakarta",
      district: "Tanah Abang",
      subDistrict: "Karet",
      postalCode: "10220",
    },
    owner: {
      name: "Dina Pratama",
      nik: "3173030202910004",
      npwp: "45.678.901.2-345.000",
    },
    bank: {
      bankName: "BCA",
      accountNumber: "3344556677",
      accountName: "Dina Pratama",
    },
    documents: {
      ownerKtp: true,
      ownerNpwp: true,
      bankBook: true,
      bankMutation: true,
      sku: false,
    },
    edcInformation: {
      edcType: "Topwise Q1",
      edcCount: "2",
      shippingAddress: {
        streetName: "Jl. Sudirman No. 101",
        rt: "01",
        rw: "02",
        province: "DKI Jakarta",
        city: "Jakarta",
        district: "Tanah Abang",
        subDistrict: "Karet",
        postalCode: "10220",
      },
    },
  },
  {
    id: 105,
    name: "Apotek Sehat",
    status: "Approved",
    city: "Semarang",
    createdAt: "2025-12-28T10:30:00",
    lastActivity: "2026-01-08T15:20:00",
    business: {
      brandName: "Apotek Sehat Sentosa",
      legalName: "PT Sehat Sentosa",
      businessType: "Company",
      category: "Healthcare",
      establishedYear: "2018",
      employeeCount: "6-20",
      monthlyVolume: "50 - 200 juta",
      socialLink: "www.sehatsentosa.id",
      paymentFeatures: ["Cashlez", "Cashlez Link", "Softpos"],
    },
    address: {
      streetName: "Jl. Pandanaran No. 55",
      rt: "05",
      rw: "03",
      province: "Jawa Tengah",
      city: "Semarang",
      district: "Semarang Tengah",
      subDistrict: "Pandanaran",
      postalCode: "50241",
    },
    owner: {
      name: "Rudi Hartono",
      nik: "3374011105840005",
      npwp: "67.890.123.4-567.000",
    },
    bank: {
      bankName: "BNI",
      accountNumber: "5566778899",
      accountName: "Rudi Hartono",
    },
    documents: {
      ownerKtp: true,
      ownerNpwp: true,
      bankBook: true,
      bankMutation: true,
      sku: true,
    },
    edcInformation: {
      edcType: "T6D",
      edcCount: "4",
      shippingAddress: {
        streetName: "Jl. Pandanaran No. 55",
        rt: "05",
        rw: "03",
        province: "Jawa Tengah",
        city: "Semarang",
        district: "Semarang Tengah",
        subDistrict: "Pandanaran",
        postalCode: "50241",
      },
    },
  },
];

const statusTone: Record<MerchantDetail["status"], string> = {
  New: "bg-slate-100 text-slate-700",
  Contacted: "bg-blue-100 text-blue-700",
  "Pending Docs": "bg-yellow-100 text-yellow-700",
  Submitted: "bg-indigo-100 text-indigo-700",
  Approved: "bg-emerald-100 text-emerald-700",
};

type SectionProps = {
  title: string;
  items: Array<{ label: string; value: React.ReactNode }>;
};

function DetailSection({ title, items }: SectionProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.label}>
            <p className="text-xs uppercase tracking-wide text-gray-400">{item.label}</p>
            <p className="mt-1 text-sm font-medium text-gray-900">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

type SalesMerchantDetailProps = {
  merchantId: string;
};

export default function SalesMerchantDetail({ merchantId }: SalesMerchantDetailProps) {
  const merchant = useMemo(() => {
    const numericId = Number(merchantId);
    return dummyDetails.find((item) => item.id === numericId);
  }, [merchantId]);
  const [mdrRows, setMdrRows] = useState<MdrRow[]>([defaultMdrRow(1)]);
  const [freeClearing, setFreeClearing] = useState("No");

  if (!merchant) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <p className="text-sm text-gray-600">Merchant not found.</p>
        <Link
          href="/sales/merchants"
          className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-teal-600"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to list
        </Link>
      </div>
    );
  }

  const updateMdrRow = (rowId: number, key: keyof MdrRow, value: string) => {
    setMdrRows((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, [key]: value } : row)),
    );
  };

  const addMdrRow = () => {
    setMdrRows((prev) => [...prev, defaultMdrRow(prev.length + 1)]);
  };

  const toPercent = (value: string) => {
    const num = Number.parseFloat(value);
    if (Number.isNaN(num)) {
      return 0;
    }
    return num;
  };

  const computeMerchantMdr = (row: MdrRow) => {
    return (
      toPercent(row.acquirerMdr) +
      toPercent(row.aggregatorMdr) +
      toPercent(row.agentMdr) +
      toPercent(row.dealerMdr) +
      toPercent(row.salesMdr) +
      toPercent(row.cashlezRevenue)
    ).toFixed(2);
  };

  return (
    <div className="space-y-6">
      <div className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm overflow-hidden">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link
              href="/sales/merchants"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-800"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back to list
            </Link>
            <h1 className="mt-3 text-2xl font-semibold text-gray-900">{merchant.name}</h1>
            <p className="mt-1 text-sm text-gray-500">
              Created{" "}
              <span className="font-semibold text-gray-900">
                {new Date(merchant.createdAt).toLocaleString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusTone[merchant.status]}`}>
              {merchant.status}
            </span>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
              {merchant.city}
            </span>
          </div>
        </div>
      </div>

      <DetailSection
        title="Business Information"
        items={[
          { label: "Brand Name", value: merchant.business.brandName },
          { label: "Legal Name", value: merchant.business.legalName },
          { label: "Business Type", value: merchant.business.businessType },
          { label: "Payment Features", value: merchant.business.paymentFeatures.join(", ") },
          { label: "Category", value: merchant.business.category },
          { label: "Established", value: merchant.business.establishedYear },
          { label: "Employees", value: merchant.business.employeeCount },
          { label: "Monthly Volume", value: merchant.business.monthlyVolume },
          { label: "Social Link", value: merchant.business.socialLink },
        ]}
      />

      <DetailSection
        title="Business Address"
        items={[
          { label: "Street Name", value: merchant.address.streetName },
          { label: "RT / RW", value: `${merchant.address.rt} / ${merchant.address.rw}` },
          { label: "Province", value: merchant.address.province },
          { label: "City", value: merchant.address.city },
          { label: "District", value: merchant.address.district },
          { label: "Sub-district", value: merchant.address.subDistrict },
          { label: "Postal Code", value: merchant.address.postalCode },
        ]}
      />

      <DetailSection
        title="Owner / Director"
        items={[
          { label: "Name", value: merchant.owner.name },
          { label: "NIK", value: merchant.owner.nik },
          { label: "NPWP", value: merchant.owner.npwp },
        ]}
      />

      <DetailSection
        title="Bank Information"
        items={[
          { label: "Bank Name", value: merchant.bank.bankName },
          { label: "Account Number", value: merchant.bank.accountNumber },
          { label: "Account Name", value: merchant.bank.accountName },
        ]}
      />

      <div className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm overflow-hidden">
        <h2 className="text-lg font-semibold text-gray-900">Documents</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: "Owner KTP", value: merchant.documents.ownerKtp },
            { label: "Owner NPWP", value: merchant.documents.ownerNpwp },
            { label: "Bank Book", value: merchant.documents.bankBook },
            { label: "Bank Mutation", value: merchant.documents.bankMutation },
            { label: "SKU Document", value: merchant.documents.sku },
          ].map((doc) => (
            <div key={doc.label} className="flex items-center justify-between rounded-xl border border-gray-100 px-4 py-3">
              <div className="flex items-center gap-2">
                <DocumentIcon className="h-5 w-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-900">{doc.label}</span>
              </div>
              {doc.value ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                  <CheckCircleIcon className="h-4 w-4" />
                  Uploaded
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-yellow-600">
                  <ClockIcon className="h-4 w-4" />
                  Missing
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <DetailSection
        title="EDC Information"
        items={[
          { label: "EDC Type", value: merchant.edcInformation.edcType },
          { label: "EDC Quantity", value: merchant.edcInformation.edcCount },
          { label: "Street Name", value: merchant.edcInformation.shippingAddress.streetName },
          {
            label: "RT / RW",
            value: `${merchant.edcInformation.shippingAddress.rt} / ${merchant.edcInformation.shippingAddress.rw}`,
          },
          { label: "Province", value: merchant.edcInformation.shippingAddress.province },
          { label: "City", value: merchant.edcInformation.shippingAddress.city },
          { label: "District", value: merchant.edcInformation.shippingAddress.district },
          { label: "Sub-district", value: merchant.edcInformation.shippingAddress.subDistrict },
          { label: "Postal Code", value: merchant.edcInformation.shippingAddress.postalCode },
        ]}
      />

      <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Credit Debit Merchant MDR</h2>
            <p className="mt-1 text-sm text-gray-500">
              Merchant MDR = Acquirer MDR + Aggregator MDR + Agent MDR + Dealer MDR + Sales MDR + Cashlez Revenue
            </p>
          </div>
          <button
            type="button"
            onClick={addMdrRow}
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            + Add MDR &amp; Fee
          </button>
        </div>

        <div className="mt-6 w-full max-w-full overflow-x-auto pb-2">
          <table className="min-w-[1700px] w-full">
            <thead className="border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
              <tr>
                <th className="px-4 py-3 w-[240px]">Acquirer</th>
                <th className="px-4 py-3 w-[190px]">Card Type</th>
                <th className="px-4 py-3 w-[190px]">On/Off Us</th>
                <th className="px-4 py-3 w-[260px]">Card Principal</th>
                <th className="px-4 py-3">Acquirer MDR</th>
                <th className="px-4 py-3">Aggregator MDR</th>
                <th className="px-4 py-3">Agent MDR</th>
                <th className="px-4 py-3">Dealer MDR</th>
                <th className="px-4 py-3">Sales MDR</th>
                <th className="px-4 py-3">Cashlez Revenue</th>
                <th className="px-4 py-3">Merchant MDR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mdrRows.map((row) => (
                <tr key={row.id}>
                  <td className="px-4 py-3 w-[240px]">
                    <Select value={row.acquirer} onValueChange={(value) => updateMdrRow(row.id, "acquirer", value)}>
                      <SelectTrigger className="h-10 w-full min-w-[220px] rounded-xl border border-gray-200 px-3 text-sm">
                        <SelectValue placeholder="Select acquirer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bank MTI">Bank MTI</SelectItem>
                        <SelectItem value="Bank BCA">Bank BCA</SelectItem>
                        <SelectItem value="Bank Mandiri">Bank Mandiri</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-3 w-[190px]">
                    <Select value={row.cardType} onValueChange={(value) => updateMdrRow(row.id, "cardType", value)}>
                      <SelectTrigger className="h-10 w-full min-w-[160px] rounded-xl border border-gray-200 px-3 text-sm">
                        <SelectValue placeholder="Select card type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Credit">Credit</SelectItem>
                        <SelectItem value="Debit">Debit</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-3 w-[190px]">
                    <Select value={row.onOffUs} onValueChange={(value) => updateMdrRow(row.id, "onOffUs", value)}>
                      <SelectTrigger className="h-10 w-full min-w-[160px] rounded-xl border border-gray-200 px-3 text-sm">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Off Us">Off Us</SelectItem>
                        <SelectItem value="On Us">On Us</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-3 w-[260px]">
                    <Select
                      value={row.cardPrincipal}
                      onValueChange={(value) => updateMdrRow(row.id, "cardPrincipal", value)}
                    >
                      <SelectTrigger className="h-10 w-full min-w-[240px] rounded-xl border border-gray-200 px-3 text-sm">
                        <SelectValue placeholder="Select principal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All Card Principals">All Card Principals</SelectItem>
                        <SelectItem value="Visa">Visa</SelectItem>
                        <SelectItem value="Mastercard">Mastercard</SelectItem>
                        <SelectItem value="Amex">Amex</SelectItem>
                        <SelectItem value="JCB">JCB</SelectItem>
                        <SelectItem value="CUP">CUP</SelectItem>
                        <SelectItem value="GPN">GPN</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  {([
                    { key: "acquirerMdr", label: "Acquirer MDR" },
                    { key: "aggregatorMdr", label: "Aggregator MDR" },
                    { key: "agentMdr", label: "Agent MDR" },
                    { key: "dealerMdr", label: "Dealer MDR" },
                    { key: "salesMdr", label: "Sales MDR" },
                    { key: "cashlezRevenue", label: "Cashlez Revenue" },
                  ] as Array<{ key: keyof MdrRow; label: string }>).map((field) => (
                    <td key={field.key} className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={row[field.key]}
                          onChange={(event) => updateMdrRow(row.id, field.key, event.target.value)}
                          className="h-10 w-24 rounded-xl border border-gray-200 px-3 text-sm"
                          aria-label={field.label}
                        />
                        <span className="text-xs text-gray-500">%</span>
                      </div>
                    </td>
                  ))}
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                    {computeMerchantMdr(row)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Free Clearing</h2>
        <p className="mt-1 text-sm text-gray-500">Set whether this merchant gets free clearing.</p>
        <div className="mt-4 max-w-xs">
          <Select value={freeClearing} onValueChange={setFreeClearing}>
            <SelectTrigger className="h-10 w-full rounded-xl border border-gray-200 px-3 text-sm">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
