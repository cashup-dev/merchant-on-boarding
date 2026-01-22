# Business Entity Page — Technical Deep Dive

## 1. Page Overview
Halaman `/business-entity` adalah wizard single-page untuk mengumpulkan data onboarding merchant. Page ini merangkum 4 step internal di satu form dan, ketika valid, menyimpan draft `businessEntity` ke Zustand lalu menavigasi ke `/payment-feature`.

File utama:
- `src/app/(admin)/(others-pages)/(onboarding)/business-entity/page.tsx`
- `src/app/(admin)/(others-pages)/(onboarding)/business-entity/BusinessEntityClient.tsx`
- `src/app/(admin)/(others-pages)/(onboarding)/business-entity/BusinessEntityForm.tsx`

Komponen dan dependensi terkait:
- `src/components/form/UploadPreviewField.tsx` (upload image + preview + camera)
- `src/components/table-upload.tsx` + `src/hooks/use-file-upload.ts` (upload dokumen PDF)
- `src/components/ui/select.tsx`, `src/components/ui/popover.tsx` (UI primitives)
- `src/store/onboardingStore.ts` (Zustand store)

## 2. Wizard & Step Architecture
- Wizard diimplementasikan sebagai single form dengan state `currentStep` (1-4) dan array `steps` yang berisi label step.
- Render step dilakukan dengan conditional rendering `currentStep === n` di `BusinessEntityForm.tsx`.
- Stepper UI adalah list indikator (angka + label) yang menandai status aktif/selesai berdasarkan `currentStep`, tanpa navigasi klik.
- Navigasi:
  - `handleNextStep()` memindahkan step jika `isStepValid` true.
  - `handlePrevStep()` memindahkan step ke belakang.
  - Tombol `Selanjutnya` pada step terakhir submit form secara penuh.
- `goToStep()` juga memanggil `window.scrollTo` agar user kembali ke top setiap pergantian step.

## 3. Step-by-Step Breakdown
### Step 1: Informasi Merchant / Badan Usaha
Field dan komponen:
- `businessType` (button toggle: `individual` / `company`).
- `companyType` (hanya jika company, button list: PT/CV/Firma/Koperasi/Nirlaba).
- `merchantName` (text input).
- `companyName` (wajib untuk company, optional untuk individual).
- `establishedYear` (tanggal berdiri, optional; hanya jika company).
- `monthlyVolume` (perkiraan volume transaksi bulanan, optional).
- Alamat usaha: `businessStreetName`, `businessRt`, `businessRw`, `businessProvinceId`, `businessCityId`, `businessDistrictId`, `businessSubdistrictId`, `businessPostalCode`.
- Kontak usaha: `phoneNumber`, `email`, `websiteLink` (optional).
- `businessMode` (radio: `online`/`offline`).
- `ownershipStatus` (radio: `owned`/`rent`).
- `mcc` (Select: MCC 5411/5812/5999).
- Dokumen company (hanya jika `company`):
  - `deedFile` (PDF) via `TableUpload`.
  - `skKemenkumhamFile` (PDF) via `TableUpload`.
  - `nibCompanyFile` (PDF) via `TableUpload` → nama file disimpan ke `nibNumber` (hidden input).
  - `npwpCompanyFile` (image) via `UploadPreviewField` → nama file disimpan ke `npwpNumber` (hidden input).
- Dokumen individual (hanya jika `individual`):
  - `nibSkuFile` (PDF) via `TableUpload`.
- Foto usaha (hanya jika `businessType` terpilih):
  - `frontPhotoFile`, `insidePhotoFile`, `productPhotoFile` (image) via `UploadPreviewField`.
  - `logoFile` (optional image) via `UploadPreviewField`.
  - `additionalDocumentFile` (optional PDF) via `TableUpload`.

Ketergantungan penting:
- Field city/district/subdistrict bergantung pada pilihan region sebelumnya (cascading select).
- Dokumen yang wajib berbeda antara `company` vs `individual`.
- Foto usaha hanya diminta setelah `businessType` terisi.

### Step 2: Data Pemilik Usaha / Direktur
Field dan komponen:
- Identitas owner: `ownerName`, `ownerBirthPlace`, `ownerBirthDate`, `ownerCitizenship`.
- Alamat KTP: `ownerKtpStreetName`, `ownerKtpRt`, `ownerKtpRw`, `ownerKtpProvinceId`, `ownerKtpCityId`, `ownerKtpDistrictId`, `ownerKtpSubdistrictId`, `ownerKtpPostalCode`.
- Alamat domisili: `ownerDomicileStreetName`, `ownerDomicileRt`, `ownerDomicileRw`, `ownerDomicileProvinceId`, `ownerDomicileCityId`, `ownerDomicileDistrictId`, `ownerDomicileSubdistrictId`, `ownerDomicilePostalCode`.
- Checkbox `ownerDomicileSame` untuk mirror alamat KTP ke domisili.
- Upload image: `ownerKtpFile`, `ownerNpwpFile` via `UploadPreviewField`.
- Identitas tambahan: `ownerNik`, `ownerPhone`, `ownerEmail`.

Ketergantungan penting:
- `ownerDomicileSame` mem-bypass validasi domisili dan mengunci input domisili.
- Label owner berubah sesuai `businessType` (Pemilik Usaha vs Direktur).

### Step 3: Data PIC Admin
Field:
- `picName`, `picEmail`, `picPhone`.

### Step 4: Data Rekening Settlement
Field:
- `bankName` (Select: BCA/BNI/BRI/Mandiri).
- `bankAccountNumber`, `bankAccountName`, `settlementEmail`.

Dependency antar step:
- Tidak ada dependency lintas step yang bersifat hard dependency di UI, tapi validasi final memakai semua step.

## 4. Business Type Logic
- `businessType` dipilih lewat tombol toggle dan disimpan di local state `businessType`.
- `handleBusinessTypeChange()`:
  - Reset `companyType`.
  - Menghapus file/dokumen yang tidak relevan.
  - Menghapus semua upload terkait (dokumen, foto, logo, additional doc) dan error upload.
- Dampak ke rendering:
- `companyType` dan dokumen company hanya muncul untuk `company`; `companyName` tampil untuk keduanya tetapi diwajibkan saat `company`.
  - `nibSkuFile` hanya muncul untuk `individual`.
  - Foto usaha tampil untuk kedua tipe, tetapi hanya setelah `businessType` dipilih.
- Dampak ke validasi:
  - `isStep1Valid` mensyaratkan dokumen berbeda tergantung `businessType`.
  - Zod `superRefine` juga menegakkan requirement yang sama di level submit final.
- Reset state:
  - Semua file state (PDF & image) dan error reset setiap perubahan `businessType`, sehingga user harus re-upload.

## 5. Validation Strategy
- Strategi hybrid:
  - Imperatif untuk per-step: `isStep1Valid`, `isStep2Valid`, `isStep3Valid`, `isStep4Valid` berbasis pengecekan string dan keberadaan file.
  - Schema-based untuk submit final: `businessEntitySchema.safeParse(payload)` dengan `superRefine` untuk kondisi company/individual dan alamat domisili.
- Tombol `Selanjutnya`:
  - Step 1-3: disabled jika `isStepValid` false.
  - Step 4: disabled jika `isFormValid` false.
- Validasi per-step bersifat blocking, tetapi tidak ada error message granular di UI (hanya disable tombol).
- Validasi Zod tidak memunculkan error ke UI; jika gagal, submit silently returns.

## 6. File & Image Upload Handling
- PDF:
  - Menggunakan `TableUpload` dengan `accept = application/pdf`, `maxFiles = 1`, `simulateUpload = false`, `showDefaults = false`.
  - `TableUpload` memakai `useFileUpload` untuk validasi type/size dan state file.
  - Default `maxSize` dari `TableUpload` adalah 50 MB (karena tidak di-override di form).
- Image:
  - Menggunakan `UploadPreviewField` dengan `accept = image/jpeg,image/png`.
  - Validasi tipe file dilakukan manual di `handleImageChange` (hanya JPG/JPEG/PNG).
  - Preview URL dikelola di `BusinessEntityForm` via `URL.createObjectURL` dan cleanup di `useEffect`.
  - `UploadPreviewField` mendukung drag-drop dan kamera (WebRTC), walau di form ini tidak memakai `capture` prop.
- State upload:
  - Dokumen PDF disimpan sebagai `FileWithPreview` (dari `use-file-upload`).
  - Image disimpan sebagai `File` lokal + `previewUrl` terpisah di state.
- Risiko:
  - File hanya disimpan lokal di state; tidak ada persisten ke store sebelum submit final.
  - `buildMultipartPayload()` menyusun `FormData` tetapi tidak dipakai untuk request.

## 7. Address Handling
- Tiga blok alamat:
  - Alamat usaha (`business*`).
  - Alamat KTP owner (`ownerKtp*`).
  - Alamat domisili owner (`ownerDomicile*`).
- Cascading select:
  - `provinceOptions`, `cityOptionsByProvince`, `districtOptionsByCity`, `subdistrictOptionsByDistrict` didefinisikan statis di file.
  - `SearchableSelect` mem-filter opsi berdasarkan query lokal.
  - `useEffect` mengosongkan city/district/subdistrict ketika parent value berubah, untuk menjaga konsistensi.
- Mirror alamat KTP ke domisili:
  - `ownerDomicileSame` mem-copy semua field dari KTP ke domisili.
  - `useEffect` juga menjaga agar perubahan KTP ikut memperbarui domisili saat checkbox aktif.
- Enable/disable:
  - Saat `ownerDomicileSame` true, field domisili disabled dan required flag dimatikan.

## 8. State Management & Data Flow
- Source of truth utama adalah local state di `BusinessEntityForm` (banyak `useState`).
- Zustand (`useOnboardingStore`) hanya menerima data ketika submit final sukses dan lulus Zod validation.
- Prefill:
  - Jika `storedBusinessEntity` tersedia, `useEffect` mengisi state text/enum dari store.
  - File upload tidak dipulihkan dari store (file states di-reset ke `null`), karena store hanya menyimpan nama file.
- Data flow:
  - User mengisi step-by-step; state hanya lokal.
  - Submit final (step 4) membuat `payload` dengan data + nama file, validasi Zod, lalu `setBusinessEntity` ke store dan `router.push('/payment-feature')`.
- Reset:
  - Form reset manual via `onReset`, mengosongkan semua state lokal dan kembali ke step 1.
  - Tidak ada reset eksplisit untuk store di halaman ini.

## 9. UX-Driven Technical Decisions
- Wizard single-page untuk mengurangi navigasi route dan menjaga konteks data.
- Stepper visual untuk menunjukkan progres, namun navigasi step dibatasi agar flow tetap linear.
- Cascading select + searchable select untuk memudahkan input alamat tanpa dropdown besar.
- Gating upload berdasarkan `businessType` untuk mengurangi field tidak relevan.
- Mirror alamat KTP ke domisili untuk mengurangi input duplikat.

## 10. Risks, Edge Cases & Improvement Opportunities
- Zod validation tidak menampilkan error ke UI; invalid submit hanya silent return tanpa feedback.
- `buildMultipartPayload()` tidak digunakan; tidak ada request API, sehingga upload file hanya lokal dan tidak tersimpan.
- Store hanya menyimpan nama file, bukan file itu sendiri; ketika user kembali ke halaman ini, file harus di-upload ulang.
- `establishedYear` dan `monthlyVolume` hanya tersimpan di local state dan tidak ikut masuk payload/store.
- Address options adalah hardcoded sample; belum ada integrasi API/real data, dan tidak ada validasi format kode pos/telepon/email selain non-empty.
- Reset pada `handleBusinessTypeChange()` menghapus semua file dan preview, termasuk foto usaha, sehingga user kehilangan input jika mengganti tipe bisnis.
- Conditional requirement untuk dokumen company/individual hanya terlihat pada validation logic; UI tidak memberikan ringkasan error per-field.

Catatan: Jika ada logic di luar `BusinessEntityForm.tsx` yang mem-validasi atau mem-prefill `merchantName` via API, hal tersebut tidak terlihat di kode yang diinspeksi.
