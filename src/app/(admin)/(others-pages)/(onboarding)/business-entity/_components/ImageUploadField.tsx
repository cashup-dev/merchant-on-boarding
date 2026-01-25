"use client";

import React, { useEffect, useState } from "react";

import UploadPreviewField from "@/components/form/UploadPreviewField";

type ImageUploadFieldProps = {
  id: string;
  name: string;
  label: string;
  accept: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
  onClear: () => void;
  previewAlt: string;
  previewHeightClass?: string;
  error?: string;
};

export function ImageUploadField({
  id,
  name,
  label,
  accept,
  file,
  onFileChange,
  onClear,
  previewAlt,
  previewHeightClass,
  error,
}: ImageUploadFieldProps) {
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (!file || !file.type.startsWith("image/")) {
      setPreviewUrl("");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <div>
      <UploadPreviewField
        id={id}
        name={name}
        label={label}
        accept={accept}
        file={file}
        previewUrl={previewUrl}
        onFileChange={onFileChange}
        onClear={onClear}
        previewAlt={previewAlt}
        previewHeightClass={previewHeightClass}
      />
      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
    </div>
  );
}
