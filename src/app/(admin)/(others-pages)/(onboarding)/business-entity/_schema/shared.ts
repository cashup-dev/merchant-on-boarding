"use client";

import { z } from "zod";

export const nonEmptyString = z.string().min(1, "Wajib diisi");

export const addressSchema = z.object({
  streetName: nonEmptyString,
  rt: nonEmptyString,
  rw: nonEmptyString,
  provinceId: nonEmptyString,
  cityId: nonEmptyString,
  districtId: nonEmptyString,
  subdistrictId: nonEmptyString,
  postalCode: nonEmptyString,
});
