"use client";

import { Camera, X } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";

type UploadPreviewFieldProps = {
  id: string;
  name: string;
  label: string;
  accept: string;
  capture?: "user" | "environment";
  cameraOnly?: boolean;
  previewHeightClass?: string;
  file: File | null;
  previewUrl: string;
  onFileChange: (file: File | null) => void;
  onClear: () => void;
  previewAlt: string;
};

export default function UploadPreviewField({
  id,
  name,
  label,
  accept,
  capture,
  cameraOnly = false,
  previewHeightClass = "h-48",
  file,
  previewUrl,
  onFileChange,
  onClear,
  previewAlt,
}: UploadPreviewFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const hasPreview = Boolean(previewUrl);
  const hasFile = Boolean(file);
  const [isDragging, setIsDragging] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const heightClass = previewHeightClass;

  const handleClear = () => {
    onClear();
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleOpenFileDialog = () => {
    if (cameraOnly) return;
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0] || null;
    onFileChange(nextFile);
  };

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setIsCameraOpen(false);
  }, []);

  const startCamera = useCallback(async () => {
    setCameraError("");
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError("Browser tidak mendukung akses kamera.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: capture === "environment" ? "environment" : "user",
        },
      });
      streamRef.current = stream;
      setIsCameraOpen(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      setCameraError("Kamera tidak dapat diakses. Periksa izin browser.");
    }
  }, [capture]);

  const handleCapture = useCallback(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const capturedFile = new File([blob], `${name}-capture.jpg`, { type: blob.type });
      onFileChange(capturedFile);
      stopCamera();
    }, "image/jpeg", 0.92);
  }, [name, onFileChange, stopCamera]);

  useEffect(() => {
    if (videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [isCameraOpen]);

  useEffect(() => {
    return () => stopCamera();
  }, [stopCamera]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const handleDragEnter = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    if (event.currentTarget.contains(event.relatedTarget as Node)) {
      return;
    }
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);
      if (cameraOnly) return;
      const nextFile = event.dataTransfer.files?.[0] || null;
      onFileChange(nextFile);
    },
    [cameraOnly, onFileChange]
  );

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700" htmlFor={id}>
        {label}
      </label>
      <div
        className={`group relative overflow-hidden rounded-2xl border transition ${
          hasPreview ? "border-gray-200" : "border-dashed border-gray-300 bg-gray-50"
        } ${isDragging ? "border-gray-900 bg-gray-100" : ""}`}
        onClick={!hasPreview && !cameraOnly ? handleOpenFileDialog : undefined}
        onDragOver={cameraOnly ? undefined : handleDragOver}
        onDragEnter={cameraOnly ? undefined : handleDragEnter}
        onDragLeave={cameraOnly ? undefined : handleDragLeave}
        onDrop={cameraOnly ? undefined : handleDrop}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleOpenFileDialog();
          }
        }}
      >
        <input
          id={id}
          name={name}
          type="file"
          ref={inputRef}
          className="sr-only"
          accept={accept}
          capture={capture}
          onChange={handleFileChange}
        />
        {hasPreview ? (
          <>
            <img src={previewUrl} alt={previewAlt} className={`${heightClass} w-full object-cover`} />
            <div className="absolute inset-0 bg-black/50 opacity-0 transition group-hover:opacity-100" />
            <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 transition group-hover:opacity-100">
              <button
                type="button"
                onClick={handleOpenFileDialog}
                className="rounded-lg bg-white/90 px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm"
              >
                Change image
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm"
              >
                <X className="h-4 w-4" />
                Remove
              </button>
            </div>
          </>
        ) : (
          <div className={`flex ${heightClass} flex-col items-center justify-center gap-2 px-4 py-6 text-center`}>
            <p className="text-sm font-semibold text-gray-900">Upload image</p>
            <p className="text-xs text-gray-500">Tarik & lepas file atau klik untuk memilih</p>
            {hasFile && (
              <p className="text-xs text-gray-600">File terpilih: {file?.name}</p>
            )}
            <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  handleOpenFileDialog();
                }}
                disabled={cameraOnly}
                className={`rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm ${
                  cameraOnly ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                Browse files
              </button>
              {capture && (
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    startCamera();
                  }}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm"
                >
                  <Camera className="h-4 w-4" />
                  Use camera
                </button>
              )}
            </div>
            {cameraError && <p className="text-xs text-red-500">{cameraError}</p>}
          </div>
        )}
        {isCameraOpen && (
          <div className="absolute inset-0 z-10 flex flex-col bg-black/80 p-4">
            <div className="flex-1 overflow-hidden rounded-xl bg-black">
              <video ref={videoRef} autoPlay playsInline className="h-full w-full object-cover" />
            </div>
            <div className="mt-3 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleCapture}
                className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm"
              >
                Capture
              </button>
              <button
                type="button"
                onClick={stopCamera}
                className="rounded-lg bg-gray-700 px-4 py-2 text-sm font-semibold text-white shadow-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
