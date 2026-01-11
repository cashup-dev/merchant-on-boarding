"use client";

import React, { useEffect, useState } from "react";
import { format, isAfter, startOfDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UploadPreviewField from "@/components/form/UploadPreviewField";
import { Textarea } from "@/components/ui/textarea";


export default function BusinessRepresentativeInformationForm() {
  const [birthDate, setBirthDate] = useState<Date | undefined>();
  const [gender, setGender] = useState<string>("");
  const [birthDateWarning, setBirthDateWarning] = useState<string>("");
  const [nationality, setNationality] = useState<string>("");
  const [isDomicileSame, setIsDomicileSame] = useState(false);
  const [idAddress, setIdAddress] = useState("");
  const [idAddressNumber, setIdAddressNumber] = useState("");
  const [idRt, setIdRt] = useState("");
  const [idRw, setIdRw] = useState("");
  const [idDistrictSearch, setIdDistrictSearch] = useState("");
  const [domicileAddress, setDomicileAddress] = useState("");
  const [domicileAddressNumber, setDomicileAddressNumber] = useState("");
  const [domicileRt, setDomicileRt] = useState("");
  const [domicileRw, setDomicileRw] = useState("");
  const [domicileDistrictSearch, setDomicileDistrictSearch] = useState("");
  const [identityDocumentFile, setIdentityDocumentFile] = useState<File | null>(null);
  const [identitySelfieFile, setIdentitySelfieFile] = useState<File | null>(null);
  const [npwpDocumentFile, setNpwpDocumentFile] = useState<File | null>(null);
  const [identityDocumentPreview, setIdentityDocumentPreview] = useState<string>("");
  const [identitySelfiePreview, setIdentitySelfiePreview] = useState<string>("");
  const [npwpDocumentPreview, setNpwpDocumentPreview] = useState<string>("");

  const handleBirthDateSelect = (date: Date | undefined) => {
    if (!date) {
      setBirthDate(undefined);
      setBirthDateWarning("");
      return;
    }

    const today = startOfDay(new Date());
    const selected = startOfDay(date);
    if (isAfter(selected, today)) {
      setBirthDateWarning("Tanggal lahir tidak boleh melebihi tanggal hari ini.");
      return;
    }

    setBirthDate(date);
    setBirthDateWarning("");
  };

  const syncDomicileWithId = (checked: boolean) => {
    setIsDomicileSame(checked);
    if (checked) {
      setDomicileAddress(idAddress);
      setDomicileAddressNumber(idAddressNumber);
      setDomicileRt(idRt);
      setDomicileRw(idRw);
      setDomicileDistrictSearch(idDistrictSearch);
    }
  };

  const resetFormState = () => {
    setBirthDate(undefined);
    setGender("");
    setBirthDateWarning("");
    setNationality("");
    setIsDomicileSame(false);
    setIdAddress("");
    setIdAddressNumber("");
    setIdRt("");
    setIdRw("");
    setIdDistrictSearch("");
    setDomicileAddress("");
    setDomicileAddressNumber("");
    setDomicileRt("");
    setDomicileRw("");
    setDomicileDistrictSearch("");
    setIdentityDocumentFile(null);
    setIdentitySelfieFile(null);
    setNpwpDocumentFile(null);
    setIdentityDocumentPreview("");
    setIdentitySelfiePreview("");
    setNpwpDocumentPreview("");
  };

  useEffect(() => {
    if (!identityDocumentFile || !identityDocumentFile.type.startsWith("image/")) {
      setIdentityDocumentPreview("");
      return;
    }
    const url = URL.createObjectURL(identityDocumentFile);
    setIdentityDocumentPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [identityDocumentFile]);

  useEffect(() => {
    if (!identitySelfieFile || !identitySelfieFile.type.startsWith("image/")) {
      setIdentitySelfiePreview("");
      return;
    }
    const url = URL.createObjectURL(identitySelfieFile);
    setIdentitySelfiePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [identitySelfieFile]);

  useEffect(() => {
    if (!npwpDocumentFile || !npwpDocumentFile.type.startsWith("image/")) {
      setNpwpDocumentPreview("");
      return;
    }
    const url = URL.createObjectURL(npwpDocumentFile);
    setNpwpDocumentPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [npwpDocumentFile]);

  return (
    <form
      id="business-representative-form"
      className="mt-8 space-y-8"
      onReset={resetFormState}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700" htmlFor="fullName">
            Nama Lengkap
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
            placeholder="Nama lengkap sesuai identitas"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700" htmlFor="birthDate">
            Tanggal Lahir
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <button
                id="birthDate"
                type="button"
                className="flex w-full items-center justify-between rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-400"
              >
                <span className={birthDate ? "text-gray-900" : "text-gray-400"}>
                  {birthDate ? format(birthDate, "dd/MM/yyyy") : "Pilih tanggal lahir"}
                </span>
                <span className="text-xs text-gray-400">dd/mm/yyyy</span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={birthDate}
                onSelect={handleBirthDateSelect}
                captionLayout="dropdown"
                fromYear={1940}
                toYear={new Date().getFullYear()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {birthDateWarning && (
            <p className="text-xs text-red-500">{birthDateWarning}</p>
          )}
          <input type="hidden" name="birthDate" value={birthDate ? birthDate.toISOString() : ""} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700" htmlFor="gender">
            Jenis Kelamin
          </label>
          <Select value={gender} onValueChange={setGender}>
            <SelectTrigger id="gender" className="h-11 rounded-xl border-gray-200 px-4 text-sm">
              <SelectValue placeholder="Pilih jenis kelamin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Laki-laki</SelectItem>
              <SelectItem value="female">Perempuan</SelectItem>
            </SelectContent>
          </Select>
          <input type="hidden" name="gender" value={gender} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
            placeholder="nama@email.com"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700" htmlFor="phone">
            No Telp
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
            placeholder="08xxxxxxxxxx"
          />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
            Alamat Sesuai Kartu Identitas
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-gray-700" htmlFor="idAddress">
                Alamat Sesuai Kartu Identitas
              </label>
              <Textarea
                id="idAddress"
                name="idAddress"
                value={idAddress}
                onChange={(event) => {
                  const value = event.target.value;
                  setIdAddress(value);
                  if (isDomicileSame) setDomicileAddress(value);
                }}
                className="min-h-[96px] rounded-xl border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus-visible:ring-0 focus-visible:border-gray-400"
                placeholder="Nama jalan, nomor, dan detail alamat"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700" htmlFor="idAddressNumber">
                Nomor Alamat
              </label>
              <input
                id="idAddressNumber"
                name="idAddressNumber"
                type="text"
                value={idAddressNumber}
                onChange={(event) => {
                  const value = event.target.value;
                  setIdAddressNumber(value);
                  if (isDomicileSame) setDomicileAddressNumber(value);
                }}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
                placeholder="Nomor rumah"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="idRt">
                  RT
                </label>
                <input
                  id="idRt"
                  name="idRt"
                  type="text"
                  value={idRt}
                  onChange={(event) => {
                    const value = event.target.value;
                    setIdRt(value);
                    if (isDomicileSame) setDomicileRt(value);
                  }}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
                  placeholder="RT"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="idRw">
                  RW
                </label>
                <input
                  id="idRw"
                  name="idRw"
                  type="text"
                  value={idRw}
                  onChange={(event) => {
                    const value = event.target.value;
                    setIdRw(value);
                    if (isDomicileSame) setDomicileRw(value);
                  }}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
                  placeholder="RW"
                />
              </div>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-gray-700" htmlFor="idDistrictSearch">
                Pencarian Kecamatan atau Kelurahan
              </label>
              <input
                id="idDistrictSearch"
                name="idDistrictSearch"
                type="text"
                value={idDistrictSearch}
                onChange={(event) => {
                  const value = event.target.value;
                  setIdDistrictSearch(value);
                  if (isDomicileSame) setDomicileDistrictSearch(value);
                }}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
                placeholder="Cari kecamatan atau kelurahan"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between  ">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              Alamat Domisili
            </h2>
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-gray-900"
                checked={isDomicileSame}
                onChange={(event) => syncDomicileWithId(event.target.checked)}
              />
              Sama dengan alamat identitas
            </label>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-gray-700" htmlFor="domicileAddress">
                Alamat Domisili
              </label>
              <Textarea
                id="domicileAddress"
                name="domicileAddress"
                value={domicileAddress}
                onChange={(event) => setDomicileAddress(event.target.value)}
                readOnly={isDomicileSame}
                className={`min-h-[96px] rounded-xl border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus-visible:ring-0 focus-visible:border-gray-400 ${
                  isDomicileSame ? "bg-gray-50 text-gray-500" : ""
                }`}
                placeholder="Nama jalan, nomor, dan detail alamat"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700" htmlFor="domicileAddressNumber">
                Nomor Alamat
              </label>
              <input
                id="domicileAddressNumber"
                name="domicileAddressNumber"
                type="text"
                value={domicileAddressNumber}
                onChange={(event) => setDomicileAddressNumber(event.target.value)}
                readOnly={isDomicileSame}
                className={`w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400 ${
                  isDomicileSame ? "bg-gray-50 text-gray-500" : ""
                }`}
                placeholder="Nomor rumah"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="domicileRt">
                  RT
                </label>
                <input
                  id="domicileRt"
                  name="domicileRt"
                  type="text"
                  value={domicileRt}
                  onChange={(event) => setDomicileRt(event.target.value)}
                  readOnly={isDomicileSame}
                  className={`w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400 ${
                    isDomicileSame ? "bg-gray-50 text-gray-500" : ""
                  }`}
                  placeholder="RT"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="domicileRw">
                  RW
                </label>
                <input
                  id="domicileRw"
                  name="domicileRw"
                  type="text"
                  value={domicileRw}
                  onChange={(event) => setDomicileRw(event.target.value)}
                  readOnly={isDomicileSame}
                  className={`w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400 ${
                    isDomicileSame ? "bg-gray-50 text-gray-500" : ""
                  }`}
                  placeholder="RW"
                />
              </div>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-gray-700" htmlFor="domicileDistrictSearch">
                Pencarian Kecamatan atau Kelurahan
              </label>
              <input
                id="domicileDistrictSearch"
                name="domicileDistrictSearch"
                type="text"
                value={domicileDistrictSearch}
                onChange={(event) => setDomicileDistrictSearch(event.target.value)}
                readOnly={isDomicileSame}
                className={`w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400 ${
                  isDomicileSame ? "bg-gray-50 text-gray-500" : ""
                }`}
                placeholder="Cari kecamatan atau kelurahan"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
          Dokumen Pemilik Bisnis atau Pengurus Perusahaan
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="nationality">
              Kewarganegaraan
            </label>
            <Select value={nationality} onValueChange={setNationality}>
              <SelectTrigger id="nationality" className="h-11 rounded-xl border-gray-200 px-4 text-sm">
                <SelectValue placeholder="Pilih kewarganegaraan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="WNI">WNI</SelectItem>
                <SelectItem value="WNA">WNA</SelectItem>
              </SelectContent>
            </Select>
            <input type="hidden" name="nationality" value={nationality} />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="identityNumber">
              {nationality === "WNA" ? "No. Paspor" : "No. KTP"}
            </label>
            <input
              id="identityNumber"
              name="identityNumber"
              type="text"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              placeholder={nationality === "WNA" ? "Masukkan nomor paspor" : "Masukkan nomor KTP"}
            />
          </div>
          <UploadPreviewField
            id="identityDocument"
            name="identityDocument"
            label={nationality === "WNA" ? "Upload Paspor" : "Upload KTP"}
            accept="image/*,application/pdf"
            file={identityDocumentFile}
            previewUrl={identityDocumentPreview}
            onFileChange={setIdentityDocumentFile}
            onClear={() => setIdentityDocumentFile(null)}
            previewAlt="Preview dokumen identitas"
          />
          <UploadPreviewField
            id="identitySelfie"
            name="identitySelfie"
            label={nationality === "WNA" ? "Upload Memegang Paspor" : "Upload Memegang KTP"}
            accept="image/*"
            capture="user"
            cameraOnly
            previewHeightClass="h-64"
            file={identitySelfieFile}
            previewUrl={identitySelfiePreview}
            onFileChange={setIdentitySelfieFile}
            onClear={() => setIdentitySelfieFile(null)}
            previewAlt="Preview memegang identitas"
          />
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="npwpNumber">
              No. NPWP
            </label>
            <input
              id="npwpNumber"
              name="npwpNumber"
              type="text"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              placeholder="Masukkan nomor NPWP"
            />
          </div>
          <div className="md:col-span-1">
            <UploadPreviewField
              id="npwpDocument"
              name="npwpDocument"
              label="Upload NPWP"
              accept="image/*,application/pdf"
              file={npwpDocumentFile}
              previewUrl={npwpDocumentPreview}
              onFileChange={setNpwpDocumentFile}
              onClear={() => setNpwpDocumentFile(null)}
              previewAlt="Preview NPWP"
            />
          </div>
        </div>

        <label className="flex items-start gap-3 text-sm text-gray-600">
          <input
            type="checkbox"
            name="dataStatement"
            className="mt-1 h-4 w-4 rounded border-gray-300 text-gray-900"
          />
          Saya menyatakan bahwa data yang diisi di atas sudah benar.
        </label>
      </div>
    </form>
  );
}
