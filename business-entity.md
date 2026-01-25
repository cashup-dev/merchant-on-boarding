# Business Entity Page — Technical Deep Dive

## 1. Page Overview
Halaman onboarding Business Entity kini dipecah menjadi multi-page per step untuk mengurangi re-render global dan mempercepat respons UI. Route utama `/business-entity` hanya melakukan redirect ke step pertama.

Route aktif:
- `/business-entity/merchant` (Step 1: Informasi Merchant / Badan Usaha)
- `/business-entity/owner` (Step 2: Data Pemilik Usaha / Direktur)
- `/business-entity/pic-admin` (Step 3: Data PIC Admin)
- `/business-entity/settlement` (Step 4: Data Rekening Settlement)

Redirect:
- `/business-entity` → `/business-entity/merchant`

## 2. Struktur File Baru
Entry point (App Router):
- `src/app/(admin)/(others-pages)/(onboarding)/business-entity/page.tsx` (redirect)
- `src/app/(admin)/(others-pages)/(onboarding)/business-entity/merchant/page.tsx`
- `src/app/(admin)/(others-pages)/(onboarding)/business-entity/owner/page.tsx`
- `src/app/(admin)/(others-pages)/(onboarding)/business-entity/pic-admin/page.tsx`
- `src/app/(admin)/(others-pages)/(onboarding)/business-entity/settlement/page.tsx`

Komponen step + layout:
- `src/app/(admin)/(others-pages)/(onboarding)/business-entity/_components/PageShell.tsx`
- `src/app/(admin)/(others-pages)/(onboarding)/business-entity/_components/Stepper.tsx`
- `src/app/(admin)/(others-pages)/(onboarding)/business-entity/_components/MerchantStepForm.tsx`
- `src/app/(admin)/(others-pages)/(onboarding)/business-entity/_components/OwnerStepForm.tsx`
- `src/app/(admin)/(others-pages)/(onboarding)/business-entity/_components/PicAdminStepForm.tsx`
- `src/app/(admin)/(others-pages)/(onboarding)/business-entity/_components/SettlementStepForm.tsx`
- `src/app/(admin)/(others-pages)/(onboarding)/business-entity/_components/AddressFields.tsx`
- `src/app/(admin)/(others-pages)/(onboarding)/business-entity/_components/ImageUploadField.tsx`

Hook & utils:
- `src/app/(admin)/(others-pages)/(onboarding)/business-entity/_hooks/useOnboardingDraft.ts`
- `src/app/(admin)/(others-pages)/(onboarding)/business-entity/_hooks/useAddressCascade.ts`
- `src/app/(admin)/(others-pages)/(onboarding)/business-entity/_schema/*.ts`
- `src/app/(admin)/(others-pages)/(onboarding)/business-entity/_utils/normalize.ts`
- `src/app/(admin)/(others-pages)/(onboarding)/business-entity/_utils/file.ts`
- `src/app/(admin)/(others-pages)/(onboarding)/business-entity/_utils/locations.ts`

API draft:
- `src/app/api/onboarding/route.ts` (GET/PATCH draft; merge partial update)
- `src/lib/api/onboarding.ts` (client wrapper)

Komponen umum terkait:
- `src/components/ui/SearchableSelect.tsx` (search + filter di Select)
- `src/components/ui/InfoPopover.tsx`
- `src/components/table-upload.tsx` + `src/hooks/use-file-upload.ts`
- `src/components/form/UploadPreviewField.tsx`
- `src/store/onboardingStore.ts`

## 3. Stepper & Navigasi
- Stepper ditaruh di semua page step melalui `Stepper` + `PageShell`.
- Status step:
  - `active`: berdasarkan route saat ini.
  - `completed`: berdasarkan `completedSteps` dari draft (API/store).
- Tombol `Next`:
  - Validate data di step tersebut menggunakan Zod.
  - Save draft via `PATCH /api/onboarding`.
  - Jika sukses, navigate ke step berikutnya.
- Tombol `Back`: kembali ke step sebelumnya tanpa mengubah data.

## 4. Step-by-Step Breakdown
### Step 1: Informasi Merchant / Badan Usaha
Field dan komponen:
- `businessType` (toggle `individual` / `company`).
- `companyType` (hanya jika company, PT/CV/Firma/Koperasi/Nirlaba).
- `merchantName`, `companyName`.
- `establishedYear`, `monthlyVolume`.
- Alamat usaha: `businessStreetName`, `businessRt`, `businessRw`, `businessProvinceId`, `businessCityId`, `businessDistrictId`, `businessSubdistrictId`, `businessPostalCode`.
- Kontak usaha: `phoneNumber`, `email`, `websiteLink` (Optional).
- `businessMode` (online/offline), `ownershipStatus` (owned/rent), `kategoriUsaha` (label UI: "Kategori Usaha", opsi masih berbasis MCC).
- Dokumen company: `deedFile` (label: "Akta Perusahaan (<= 5 tahun)"), `skKemenkumhamFile` ("SK Kemenkumham"), `nibCompanyFile` ("NIB Perusahaan"), `npwpCompanyFile` ("NPWP Perusahaan").
- Dokumen individual: `nibSkuFile`.
- Foto usaha: `productPhotoFile` (label: "Foto Produk / Brosur / Price List"), `frontPhotoFile` ("Foto Usaha Tampak Depan (plang usaha terlihat)"), `insidePhotoFile` ("Foto Usaha Dalam (produk / aktivitas usaha)"), `logoFile` (optional), `additionalDocumentFile` (optional PDF).
- Layout upload company (urutan): row 1 (Akta/Sk Kemenkumham/NIB), row 2 (NPWP + Foto Produk), row 3 (Foto Tampak Depan + Foto Usaha Dalam), row 4 optional (Logo + Dokumen Tambahan).
- Layout upload individual (urutan): row 1 (Foto Tampak Depan + Foto Usaha Dalam), row 2 (Foto Produk + NIB/SKU), row 3 optional (Logo + Dokumen Tambahan).

### Step 2: Data Pemilik Usaha / Direktur
Field dan komponen:
- Identitas owner: `ownerName`, `ownerBirthPlace`, `ownerBirthDate`, `ownerCitizenship` (WNI/WNA).
- Alamat KTP & domisili (cascading select).
- `ownerDomicileSame` untuk mirror alamat.
- Upload: `ownerKtpFile`, `ownerNpwpFile`, dan `ownerPassportFile` jika WNA.
- Field khusus WNA: `ownerPassportNumber`.

### Step 3: Data PIC Admin
Field:
- `picName`, `picEmail`, `picPhone`.

### Step 4: Data Rekening Settlement
Field:
- `bankName`, `bankAccountNumber`, `bankAccountName`, `settlementEmail`.

## 5. Draft, Resume, dan Data Flow
- `useOnboardingDraft()` melakukan:
  - `GET /api/onboarding` saat page load.
  - Sync hasil ke Zustand (`businessEntity`, `businessEntityMeta`, `businessEntityCompletedSteps`).
- `saveDraft()`:
  - `PATCH /api/onboarding` hanya untuk section step yang sedang aktif.
  - Backend melakukan merge partial update (tidak overwrite section lain).
- Resume:
  - Jika user reload atau kembali, data draft otomatis diprefill dari store/response.
- `businessEntityMeta` menyimpan field yang sebelumnya hanya local:
  - `merchant.establishedYear`, `merchant.monthlyVolume`.
  - `owner.passportNumber`.

## 6. Validation Strategy (Per-Step Zod)
- Validasi dilakukan per step dengan schema terpisah:
  - `merchant.schema.ts`, `owner.schema.ts`, `pic.schema.ts`, `settlement.schema.ts`.
- Validasi berjalan saat `onSubmit` step dan menampilkan error per-field.
- Tidak ada lagi `isStepValid()` global yang dieksekusi di setiap keystroke.

## 7. Performance Improvement yang Diimplementasikan
- **Isolasi render**: setiap step hanya menyimpan state lokal untuk field step tersebut.
- **SearchableSelect dioptimasi**:
  - `useDeferredValue` untuk query.
  - `useMemo` untuk filtered options.
- **Upload preview diisolasi**:
  - `ImageUploadField` mengelola preview internal (tidak lagi di parent).
- **Cascade alamat lebih ringan**:
  - `useAddressCascade` melakukan reset city/district/subdistrict dalam satu update per perubahan parent.

## 8. File & Image Upload Handling
- PDF: `TableUpload` (`accept=application/pdf`, `maxFiles=1`, `showDefaults=false`).
- Image: `UploadPreviewField` dibungkus `ImageUploadField` agar preview tidak memicu re-render global.
- File yang tersimpan di draft hanya **nama file**; file fisik tetap lokal di step masing-masing.

## 9. Risiko & Catatan Teknis
- Draft API di `src/app/api/onboarding/route.ts` masih in-memory (belum persisten ke DB).
- File upload tidak disimpan ke backend; draft hanya menyimpan nama file.
- Data lokasi masih hardcoded di `_utils/locations.ts`.
- Tidak ada validasi format spesifik (email/telepon/kode pos) selain non-empty.

Catatan: UI, layout, label, dan urutan field tetap mengikuti tampilan sebelumnya; perubahan fokus pada isolasi render, pemisahan step, dan alur draft per halaman.
