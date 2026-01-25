"use client";

import React from "react";

import { SearchableSelect, type SelectOption } from "@/components/ui/SearchableSelect";
import { Textarea } from "@/components/ui/textarea";

type AddressFieldsProps = {
  idPrefix: string;
  streetName: string;
  rt: string;
  rw: string;
  provinceId: string;
  cityId: string;
  districtId: string;
  subdistrictId: string;
  postalCode: string;
  onStreetNameChange: (value: string) => void;
  onRtChange: (value: string) => void;
  onRwChange: (value: string) => void;
  onProvinceChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onDistrictChange: (value: string) => void;
  onSubdistrictChange: (value: string) => void;
  onPostalCodeChange: (value: string) => void;
  provinceOptions: SelectOption[];
  cityOptions: SelectOption[];
  districtOptions: SelectOption[];
  subdistrictOptions: SelectOption[];
  required?: boolean;
  disabled?: boolean;
  streetPlaceholder: string;
  fullWidth?: boolean;
};

export function AddressFields({
  idPrefix,
  streetName,
  rt,
  rw,
  provinceId,
  cityId,
  districtId,
  subdistrictId,
  postalCode,
  onStreetNameChange,
  onRtChange,
  onRwChange,
  onProvinceChange,
  onCityChange,
  onDistrictChange,
  onSubdistrictChange,
  onPostalCodeChange,
  provinceOptions,
  cityOptions,
  districtOptions,
  subdistrictOptions,
  required = true,
  disabled = false,
  streetPlaceholder,
  fullWidth = false,
}: AddressFieldsProps) {
  const disabledClassName = disabled ? "bg-gray-50 text-gray-500" : "";
  const textAreaClassName = `mt-2 min-h-[96px] w-full rounded-xl border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus-visible:border-gray-400 focus-visible:ring-0 ${disabledClassName}`;
  const inputClassName = `mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400 ${disabledClassName}`;
  const fullWidthClassName = fullWidth ? "md:col-span-2" : "";
  const gridClassName = `${fullWidth ? "md:col-span-2 " : ""}grid gap-4 sm:grid-cols-2`;

  return (
    <>
      <div className={fullWidthClassName}>
        <label className="text-sm font-medium text-gray-700" htmlFor={`${idPrefix}StreetName`}>
          Alamat
        </label>
        <Textarea
          id={`${idPrefix}StreetName`}
          name={`${idPrefix}StreetName`}
          value={streetName}
          onChange={(event) => onStreetNameChange(event.target.value)}
          className={textAreaClassName}
          placeholder={streetPlaceholder}
          required={required}
          disabled={disabled}
        />
      </div>

      <div className={gridClassName}>
        <div>
          <label className="text-sm font-medium text-gray-700" htmlFor={`${idPrefix}Rt`}>
            RT
          </label>
          <input
            id={`${idPrefix}Rt`}
            name={`${idPrefix}Rt`}
            type="text"
            inputMode="numeric"
            value={rt}
            onChange={(event) => onRtChange(event.target.value)}
            className={inputClassName}
            placeholder="Masukkan RT"
            required={required}
            disabled={disabled}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700" htmlFor={`${idPrefix}Rw`}>
            RW
          </label>
          <input
            id={`${idPrefix}Rw`}
            name={`${idPrefix}Rw`}
            type="text"
            inputMode="numeric"
            value={rw}
            onChange={(event) => onRwChange(event.target.value)}
            className={inputClassName}
            placeholder="Masukkan RW"
            required={required}
            disabled={disabled}
          />
        </div>
      </div>

      <div className={gridClassName}>
        <div>
          <label className="text-sm font-medium text-gray-700" htmlFor={`${idPrefix}ProvinceId`}>
            Provinsi
          </label>
          <SearchableSelect
            id={`${idPrefix}ProvinceId`}
            value={provinceId}
            onValueChange={onProvinceChange}
            options={provinceOptions}
            placeholder="Pilih provinsi"
            disabled={disabled}
          />
          <input type="hidden" name={`${idPrefix}ProvinceId`} value={provinceId} />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700" htmlFor={`${idPrefix}CityId`}>
            Kota / Kabupaten
          </label>
          <SearchableSelect
            id={`${idPrefix}CityId`}
            value={cityId}
            onValueChange={onCityChange}
            options={cityOptions}
            placeholder="Pilih kota/kabupaten"
            disabled={disabled || !provinceId}
          />
          <input type="hidden" name={`${idPrefix}CityId`} value={cityId} />
        </div>
      </div>

      <div className={gridClassName}>
        <div>
          <label className="text-sm font-medium text-gray-700" htmlFor={`${idPrefix}DistrictId`}>
            Kecamatan
          </label>
          <SearchableSelect
            id={`${idPrefix}DistrictId`}
            value={districtId}
            onValueChange={onDistrictChange}
            options={districtOptions}
            placeholder="Pilih kecamatan"
            disabled={disabled || !cityId}
          />
          <input type="hidden" name={`${idPrefix}DistrictId`} value={districtId} />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700" htmlFor={`${idPrefix}SubdistrictId`}>
            Kelurahan
          </label>
          <SearchableSelect
            id={`${idPrefix}SubdistrictId`}
            value={subdistrictId}
            onValueChange={onSubdistrictChange}
            options={subdistrictOptions}
            placeholder="Pilih kelurahan"
            disabled={disabled || !districtId}
          />
          <input type="hidden" name={`${idPrefix}SubdistrictId`} value={subdistrictId} />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700" htmlFor={`${idPrefix}PostalCode`}>
          Kode Pos
        </label>
        <input
          id={`${idPrefix}PostalCode`}
          name={`${idPrefix}PostalCode`}
          type="number"
          inputMode="numeric"
          value={postalCode}
          onChange={(event) => onPostalCodeChange(event.target.value)}
          className={inputClassName}
          placeholder="Masukkan kode pos"
          required={required}
          disabled={disabled}
        />
      </div>
    </>
  );
}
