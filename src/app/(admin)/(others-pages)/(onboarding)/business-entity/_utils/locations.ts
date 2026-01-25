"use client";

import type { SelectOption } from "@/components/ui/SearchableSelect";

export const provinceOptions: SelectOption[] = [
  { value: "dki", label: "DKI Jakarta" },
  { value: "jabar", label: "Jawa Barat" },
  { value: "jateng", label: "Jawa Tengah" },
  { value: "jatim", label: "Jawa Timur" },
];

export const cityOptionsByProvince: Record<string, SelectOption[]> = {
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

export const districtOptionsByCity: Record<string, SelectOption[]> = {
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

export const subdistrictOptionsByDistrict: Record<string, SelectOption[]> = {
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
