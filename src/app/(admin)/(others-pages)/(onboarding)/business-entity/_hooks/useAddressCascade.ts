"use client";

import { useCallback, useState } from "react";

import type { AddressState } from "../_schema/types";

type UseAddressCascade = {
  address: AddressState;
  setStreetName: (value: string) => void;
  setRt: (value: string) => void;
  setRw: (value: string) => void;
  setProvinceId: (value: string) => void;
  setCityId: (value: string) => void;
  setDistrictId: (value: string) => void;
  setSubdistrictId: (value: string) => void;
  setPostalCode: (value: string) => void;
  setAddress: (value: AddressState) => void;
};

const emptyAddress: AddressState = {
  streetName: "",
  rt: "",
  rw: "",
  provinceId: "",
  cityId: "",
  districtId: "",
  subdistrictId: "",
  postalCode: "",
};

export function useAddressCascade(initial?: Partial<AddressState>): UseAddressCascade {
  const [address, setAddressState] = useState<AddressState>({ ...emptyAddress, ...initial });

  const setAddress = useCallback((value: AddressState) => {
    setAddressState(value);
  }, []);

  const setStreetName = useCallback((value: string) => {
    setAddressState((prev) => ({ ...prev, streetName: value }));
  }, []);

  const setRt = useCallback((value: string) => {
    setAddressState((prev) => ({ ...prev, rt: value }));
  }, []);

  const setRw = useCallback((value: string) => {
    setAddressState((prev) => ({ ...prev, rw: value }));
  }, []);

  const setProvinceId = useCallback((value: string) => {
    setAddressState((prev) => ({
      ...prev,
      provinceId: value,
      cityId: "",
      districtId: "",
      subdistrictId: "",
    }));
  }, []);

  const setCityId = useCallback((value: string) => {
    setAddressState((prev) => ({
      ...prev,
      cityId: value,
      districtId: "",
      subdistrictId: "",
    }));
  }, []);

  const setDistrictId = useCallback((value: string) => {
    setAddressState((prev) => ({
      ...prev,
      districtId: value,
      subdistrictId: "",
    }));
  }, []);

  const setSubdistrictId = useCallback((value: string) => {
    setAddressState((prev) => ({ ...prev, subdistrictId: value }));
  }, []);

  const setPostalCode = useCallback((value: string) => {
    setAddressState((prev) => ({ ...prev, postalCode: value }));
  }, []);

  return {
    address,
    setStreetName,
    setRt,
    setRw,
    setProvinceId,
    setCityId,
    setDistrictId,
    setSubdistrictId,
    setPostalCode,
    setAddress,
  };
}
