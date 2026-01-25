"use client";

import { z } from "zod";

import { nonEmptyString } from "./shared";

export const settlementSchema = z.object({
  bankName: nonEmptyString,
  bankAccountNumber: nonEmptyString,
  bankAccountName: nonEmptyString,
  settlementEmail: nonEmptyString,
});
