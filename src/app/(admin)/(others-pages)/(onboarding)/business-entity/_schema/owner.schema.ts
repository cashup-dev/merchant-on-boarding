"use client";

import { z } from "zod";

import { addressSchema, nonEmptyString } from "./shared";
import { isFilePresent } from "../_utils/file";
import type { OwnerStepData } from "./types";

export const ownerSchema = z
  .object({
    ownerName: nonEmptyString,
    ownerBirthPlace: nonEmptyString,
    ownerBirthDate: nonEmptyString,
    ownerCitizenship: nonEmptyString,
    ownerNik: nonEmptyString,
    ownerPhone: nonEmptyString,
    ownerEmail: nonEmptyString,
    ownerPassportNumber: z.string().optional(),
    ownerKtpFile: z.any().optional(),
    ownerPassportFile: z.any().optional(),
    ownerNpwpFile: z.any().optional(),
    ownerKtpAddress: addressSchema,
    ownerDomicileAddress: addressSchema,
    ownerDomicileSame: z.boolean().optional(),
    existingFiles: z
      .object({
        ownerKtpFileName: z.string().optional(),
        ownerPassportFileName: z.string().optional(),
        ownerNpwpFileName: z.string().optional(),
      })
      .optional(),
  })
  .superRefine((value, ctx) => {
    if (!isFilePresent(value.ownerKtpFile, value.existingFiles?.ownerKtpFileName)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["ownerKtpFile"], message: "Wajib diisi" });
    }
    if (!isFilePresent(value.ownerNpwpFile, value.existingFiles?.ownerNpwpFileName)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["ownerNpwpFile"], message: "Wajib diisi" });
    }

    if (value.ownerCitizenship === "wna") {
      if (!value.ownerPassportNumber || value.ownerPassportNumber.trim().length === 0) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["ownerPassportNumber"], message: "Wajib diisi" });
      }
      if (!isFilePresent(value.ownerPassportFile, value.existingFiles?.ownerPassportFileName)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["ownerPassportFile"], message: "Wajib diisi" });
      }
    }
  });
