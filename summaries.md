# Project Technical Summary

## 1. Project Overview
Project ini adalah dashboard admin untuk proses merchant onboarding SoftPOS. Flow utamanya memandu merchant melalui wizard multi-step (business entity, fitur pembayaran, terms, review, finish) dengan penyimpanan draft onboarding di sisi client.

## 2. Tech Stack
- Next.js 15 (App Router) dengan React 19 dan TypeScript; routing berbasis folder di `src/app` dan banyak komponen client.
- Tailwind CSS v4 (token CSS custom di `src/app/globals.css`) untuk styling dan layout.
- i18next + react-i18next untuk multi-bahasa (resource statis di `src/i18n/resources.ts`).
- Zustand untuk state onboarding lintas halaman, dipersist ke `sessionStorage` (`src/store/onboardingStore.ts`).
- Zod untuk validasi schema akhir onboarding (`BusinessEntityForm.tsx`).
- Radix UI primitives (select, popover, checkbox, radio) melalui komponen `src/components/ui`.
- Lucide React untuk ikon, Sonner untuk toast global di root layout.
- Lockfile ganda (`package-lock.json`, `pnpm-lock.yaml`) menunjukkan npm/pnpm keduanya dipakai, namun pilihan utama tidak eksplisit.

## 3. Project Structure
- `src/app`: App Router dengan route grouping (mis. `(admin)`, `(full-width-pages)`, `(onboarding)`), memisahkan halaman admin vs auth/full-width.
- `src/layout`: komponen layout global (sidebar, header, backdrop) dan progress onboarding di sidebar.
- `src/components`: komponen reusable (form, table, upload, ui primitives), termasuk form field khusus, tabel upload, dan komponen UI.
- `src/store`: state global onboarding berbasis Zustand (persist ke sessionStorage).
- `src/context`: context UI (sidebar, theme, auth) untuk state tampilan lintas halaman.
- `src/hooks`: custom hooks (file upload, modal, go back) untuk logika reusable.
- `src/i18n`: konfigurasi dan resources terjemahan.
- `src/lib` dan `src/utils`: helper umum dan utilitas class merging.

Struktur ini cenderung route-based di `app`, dengan layer komponen dan store terpisah. Komponen onboarding bersifat page-level di folder onboarding, sementara komponen upload/form UI diletakkan sebagai reusable blocks.

## 4. Core Business Flow
- Onboarding dimulai dari `/business-entity` yang berisi wizard 4 substep dalam satu halaman.
- Setelah validasi akhir, data business entity disimpan ke Zustand (`setBusinessEntity`) lalu navigasi ke `/payment-feature`.
- `/payment-feature` menyimpan pilihan fitur pembayaran ke store lalu lanjut ke `/terms`.
- `/terms` menerapkan gating scroll-to-end + checkbox sebelum dapat submit ke `/in-review`.
- `/in-review` dan `/finish` menampilkan status tanpa input tambahan.
- Sidebar menampilkan timeline step onboarding dan highlight step aktif berdasarkan `pathname`.

## 5. Form & Validation Strategy
- Tidak memakai form library (react-hook-form/formik). Form dikelola dengan `useState` per-field (banyak state lokal di `BusinessEntityForm.tsx`).
- Validasi per-step dilakukan via fungsi `isStepXValid` yang memeriksa isi string dan keberadaan file.
- Validasi global dilakukan dengan Zod schema (`businessEntitySchema`) saat submit final. Ada `superRefine` untuk kondisi `company` vs `individual` dan alamat domicilie.
- Pada submit awal (step < last), hanya step current yang diuji; gating dilakukan sebelum lanjut ke step berikutnya.
- Input HTML `required` dipakai di beberapa field, namun state yang dipakai untuk validasi manual tetap menjadi sumber kebenaran utama.

## 6. File Upload Handling
- Upload image memakai `UploadPreviewField` dengan preview, drag-drop, dan opsi kamera (WebRTC `getUserMedia`).
- Validasi file image bersifat manual: hanya JPG/JPEG/PNG (lihat `imageAccept` dan `handleImageChange`).
- Upload dokumen PDF memakai `TableUpload` + `useFileUpload` dengan `accept: application/pdf` untuk file tertentu.
- `useFileUpload` memvalidasi size/type, membuat preview URL, dan membersihkan object URL saat remove.
- `TableUpload` masih melakukan simulasi progress upload dan memakai default files; belum terlihat integrasi API nyata.
- `buildMultipartPayload()` membuat `FormData`, tetapi hasilnya tidak dipakai untuk request (indikasi placeholder/komponen UI saja).
- Risiko teknikal: belum ada error handling server, upload real tidak terhubung, dan nama file saja yang disimpan ke payload.

## 7. State Management & Data Flow
- Source of truth onboarding disimpan di Zustand store (business type, payment feature, business entity; `edcInformation` masih ada sebagai legacy) dan dipersist di `sessionStorage`.
- Draft data dari tiap step ditulis ke store saat submit step/halaman, lalu halaman berikutnya membaca ulang state untuk prefill.
- Local UI state di form besar (BusinessEntity) tidak disinkron otomatis ke store sampai submit final.
- Reset global tersedia via `reset` pada store, namun reset form lokal dilakukan manual pada event `onReset`.

## 8. UX-driven Technical Decisions
- Wizard substep di `BusinessEntityForm` menggunakan step indicator dan gating agar user tidak melanjutkan sebelum valid.
- Conditional rendering based on business type (individual/company) untuk field dan dokumen berbeda.
- Alamat domisili bisa disamakan dengan KTP (toggling meng-copy field dan mem-bypass validasi).
- Terms flow mewajibkan scroll sampai bawah sebelum checkbox aktif (gating berbasis scroll event).
- Sidebar onboarding menampilkan progress timeline; keputusan ini mengharuskan mapping step statis di `AppSidebar`.
- `dynamic = "force-dynamic"` di root/admin layout untuk menghindari prerender issues (implikasi pada caching/SSR).

## 9. Strengths
- Flow onboarding jelas dan step-based, dengan progress yang konsisten di sidebar.
- Validasi kombinasi manual + Zod memberi kontrol penuh untuk rule conditional.
- Upload image memiliki preview dan camera capture, meningkatkan UX untuk dokumen foto.
- Struktur folder modular: UI primitives, hooks, store, dan pages terpisah dengan rapi.
- i18n terintegrasi sehingga label/teks onboarding siap multi bahasa.

## 10. Risks & Improvement Opportunities
- Upload belum terhubung ke backend; `FormData` dibuat tetapi tidak dipakai, sehingga data file hanya berupa nama file.
- Validasi per-step berbasis string length bisa miss edge cases (format email/phone/nik tidak tervalidasi).
- Banyak state lokal di `BusinessEntityForm` membuat maintenance dan refactor sulit; peluang untuk abstraction (form schema or hook).
- Lockfile ganda berpotensi konflik tooling CI/CD jika tidak disepakati package manager utama.
- Beberapa route onboarding terlihat kosong (contoh folder `business-type` tanpa page), indikasi flow belum lengkap.
- Step EDC masih ada di codebase, namun tidak lagi berada di jalur onboarding utama.
- Tidak terlihat mekanisme API submit atau error handling server pada flow onboarding, berisiko gap saat integrasi backend.

