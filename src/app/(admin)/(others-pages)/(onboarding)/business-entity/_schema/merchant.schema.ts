"use client";

import { z } from "zod";

import { addressSchema, nonEmptyString } from "./shared";
import { isFilePresent } from "../_utils/file";
import type { MerchantStepData } from "./types";

export const merchantSchema = z
  .object({
    businessType: nonEmptyString,
    companyType: z.string().optional(),
    merchantName: nonEmptyString,
    companyName: nonEmptyString,
    establishedYear: nonEmptyString,
    monthlyVolume: nonEmptyString,
    phoneNumber: nonEmptyString,
    email: nonEmptyString,
    websiteLink: z.string().optional(),
    businessMode: nonEmptyString,
    ownershipStatus: nonEmptyString,
    mcc: nonEmptyString,
    businessAddress: addressSchema,
    deedFile: z.any().optional(),
    skKemenkumhamFile: z.any().optional(),
    nibCompanyFile: z.any().optional(),
    npwpCompanyFile: z.any().optional(),
    nibSkuFile: z.any().optional(),
    frontPhotoFile: z.any().optional(),
    insidePhotoFile: z.any().optional(),
    productPhotoFile: z.any().optional(),
    logoFile: z.any().optional(),
    additionalDocumentFile: z.any().optional(),
    existingFiles: z
      .object({
        deedFileName: z.string().optional(),
        skKemenkumhamFileName: z.string().optional(),
        nibCompanyFileName: z.string().optional(),
        npwpCompanyFileName: z.string().optional(),
        nibSkuFileName: z.string().optional(),
        frontPhotoFileName: z.string().optional(),
        insidePhotoFileName: z.string().optional(),
        productPhotoFileName: z.string().optional(),
        logoFileName: z.string().optional(),
        additionalDocumentFileName: z.string().optional(),
      })
      .optional(),
  })
  .superRefine((value, ctx) => {
    if (value.businessType === "company") {
      if (!value.companyType || value.companyType.trim().length === 0) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["companyType"], message: "Wajib diisi" });
      }
      if (
        !isFilePresent(value.deedFile, value.existingFiles?.deedFileName)
      ) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["deedFile"], message: "Wajib diisi" });
      }
      if (
        !isFilePresent(value.skKemenkumhamFile, value.existingFiles?.skKemenkumhamFileName)
      ) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["skKemenkumhamFile"], message: "Wajib diisi" });
      }
      if (
        !isFilePresent(value.nibCompanyFile, value.existingFiles?.nibCompanyFileName)
      ) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["nibCompanyFile"], message: "Wajib diisi" });
      }
      if (
        !isFilePresent(value.npwpCompanyFile, value.existingFiles?.npwpCompanyFileName)
      ) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["npwpCompanyFile"], message: "Wajib diisi" });
      }
    }

    if (value.businessType === "individual") {
      if (
        !isFilePresent(value.nibSkuFile, value.existingFiles?.nibSkuFileName)
      ) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["nibSkuFile"], message: "Wajib diisi" });
      }
    }

    if (!isFilePresent(value.frontPhotoFile, value.existingFiles?.frontPhotoFileName)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["frontPhotoFile"], message: "Wajib diisi" });
    }
    if (!isFilePresent(value.insidePhotoFile, value.existingFiles?.insidePhotoFileName)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["insidePhotoFile"], message: "Wajib diisi" });
    }
    if (!isFilePresent(value.productPhotoFile, value.existingFiles?.productPhotoFileName)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["productPhotoFile"], message: "Wajib diisi" });
    }
  });
