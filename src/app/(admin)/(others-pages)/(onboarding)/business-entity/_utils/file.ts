"use client";

import type { FileWithPreview } from "@/hooks/use-file-upload";

export const isFile = (value: unknown): value is File => value instanceof File;

export const isFileWithPreview = (value: unknown): value is FileWithPreview =>
  !!value && typeof value === "object" && "file" in value && (value as FileWithPreview).file instanceof File;

export const getFileName = (value: unknown): string => {
  if (isFile(value)) {
    return value.name;
  }
  if (isFileWithPreview(value)) {
    return value.file.name;
  }
  return "";
};

export const isFilePresent = (value: unknown, existingName?: string): boolean =>
  isFile(value) || isFileWithPreview(value) || !!existingName;
