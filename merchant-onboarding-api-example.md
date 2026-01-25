# Merchant Onboarding API — Contoh Request & Response

## 1. Penjelasan Singkat
Dokumen ini menjelaskan format payload **Merchant Onboarding** sesuai source code yang ada sekarang.  
Flow utama di frontend:
- **Save draft per step** (partial update).
- **Submit final** (belum diimplementasikan di source code; endpoint disediakan sebagai placeholder).

Catatan penting:
- FE saat ini menyimpan **nama file** (string) di payload, bukan File object / blob.
- Field `establishedYear` dan `monthlyVolume` disimpan di **meta** (bukan di businessEntity).
- Field `ownerPassportNumber` disimpan di **meta** (bukan di businessEntity).

---

## 2. Save Draft — Request
### Save Draft Merchant Onboarding
- **Method**: PATCH  
- **Endpoint**: `/api/onboarding` (sesuai source code)  
- **Headers**:
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`

Contoh payload (partial update friendly — bisa kirim 1 section saja):
```json
{
  "merchant": {
    "businessEntity": {
      "business": {
        "merchantName": "Toko Nusantara Jaya",
        "businessType": "company",
        "companyType": "PT",
        "companyName": "PT Nusantara Jaya Abadi",
        "phoneNumber": "081234567890",
        "email": "admin@nusantarajaya.co.id",
        "websiteLink": "https://nusantarajaya.co.id",
        "businessMode": "offline",
        "ownershipStatus": "owned",
        "mcc": "5411",
        "nibNumber": "nib-company.pdf",          // nama file (bukan file object)
        "npwpNumber": "npwp-company.jpg"         // nama file (bukan file object)
      },
      "businessAddress": {
        "streetName": "Jl. Merdeka No. 10",
        "rt": "05",
        "rw": "02",
        "provinceId": "dki",
        "cityId": "jakarta",
        "districtId": "menteng",
        "subdistrictId": "cikini",
        "postalCode": "10330"
      },
      "documents": {
        "deedFileName": "akta-perusahaan.pdf",
        "skKemenkumhamFileName": "sk-kemenkumham.pdf",
        "nibSkuFileName": "",                    // kosong jika company
        "additionalDocumentFileName": "fpm-bri.pdf"
      },
      "photos": {
        "frontPhotoFileName": "foto-tampak-depan.jpg",
        "insidePhotoFileName": "foto-dalam.jpg",
        "productPhotoFileName": "foto-produk.jpg",
        "logoFileName": "logo.jpg"
      }
    },
    "meta": {
      "merchant": {
        "establishedYear": "2018",
        "monthlyVolume": "50000000"             // string sesuai state FE
      }
    }
  },
  "owner": {
    "businessEntity": {
      "owner": {
        "name": "Budi Santoso",
        "birthPlace": "Jakarta",
        "birthDate": "1988-04-10",
        "citizenship": "wni",
        "ktpFileName": "ktp-budi.jpg",
        "npwpFileName": "npwp-budi.jpg",
        "nik": "3175091204880001",
        "phoneNumber": "081298765432",
        "email": "budi.santoso@mail.com"
      },
      "ownerKtpAddress": {
        "streetName": "Jl. Kebon Sirih No. 5",
        "rt": "03",
        "rw": "04",
        "provinceId": "dki",
        "cityId": "jakarta",
        "districtId": "menteng",
        "subdistrictId": "gondangdia",
        "postalCode": "10310"
      },
      "ownerDomicileAddress": {
        "isSameAsKtp": true,
        "streetName": "Jl. Kebon Sirih No. 5",
        "rt": "03",
        "rw": "04",
        "provinceId": "dki",
        "cityId": "jakarta",
        "districtId": "menteng",
        "subdistrictId": "gondangdia",
        "postalCode": "10310"
      }
    },
    "meta": {
      "owner": {
        "passportNumber": ""                    // diisi jika WNA
      }
    }
  },
  "picAdmin": {
    "businessEntity": {
      "picAdmin": {
        "name": "Siti Aisyah",
        "email": "siti.aisyah@mail.com",
        "phoneNumber": "081377788899"
      }
    }
  },
  "settlement": {
    "businessEntity": {
      "settlement": {
        "bankName": "bca",
        "accountNumber": "1234567890",
        "accountName": "PT Nusantara Jaya Abadi",
        "email": "finance@nusantarajaya.co.id"
      }
    }
  }
}
```

---

## 3. Save Draft — Response
### Response — Save Draft
```json
{
  "success": true,
  "status": "DRAFT",
  "completedSteps": ["merchant", "owner", "pic-admin"],  // sesuai code FE
  "businessEntity": {
    "...": "payload draft merged"
  },
  "meta": {
    "...": "merchant/owner meta"
  },
  "message": "Draft tersimpan"
}
```

---

## 4. Submit Onboarding — Request
### Submit Merchant Onboarding
**Belum ada implementasi submit di source code saat ini.**  
Jika nanti submit dilakukan, FE kemungkinan akan mengirim **payload full** (menggabungkan semua section) dengan struktur yang sama seperti `businessEntity` + `meta`.

- **Method**: POST  
- **Endpoint**: `/api/onboarding/submit` (placeholder)
- **Headers**:
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`

Contoh payload (full):
```json
{
  "businessEntity": {
    "business": {
      "merchantName": "Toko Nusantara Jaya",
      "businessType": "company",
      "companyType": "PT",
      "companyName": "PT Nusantara Jaya Abadi",
      "phoneNumber": "081234567890",
      "email": "admin@nusantarajaya.co.id",
      "websiteLink": "https://nusantarajaya.co.id",
      "businessMode": "offline",
      "ownershipStatus": "owned",
      "mcc": "5411",
      "nibNumber": "nib-company.pdf",
      "npwpNumber": "npwp-company.jpg"
    },
    "businessAddress": {
      "streetName": "Jl. Merdeka No. 10",
      "rt": "05",
      "rw": "02",
      "provinceId": "dki",
      "cityId": "jakarta",
      "districtId": "menteng",
      "subdistrictId": "cikini",
      "postalCode": "10330"
    },
    "documents": {
      "deedFileName": "akta-perusahaan.pdf",
      "skKemenkumhamFileName": "sk-kemenkumham.pdf",
      "nibSkuFileName": "",
      "additionalDocumentFileName": "fpm-bri.pdf"
    },
    "photos": {
      "frontPhotoFileName": "foto-tampak-depan.jpg",
      "insidePhotoFileName": "foto-dalam.jpg",
      "productPhotoFileName": "foto-produk.jpg",
      "logoFileName": "logo.jpg"
    },
    "owner": {
      "name": "Budi Santoso",
      "birthPlace": "Jakarta",
      "birthDate": "1988-04-10",
      "citizenship": "wni",
      "ktpFileName": "ktp-budi.jpg",
      "npwpFileName": "npwp-budi.jpg",
      "nik": "3175091204880001",
      "phoneNumber": "081298765432",
      "email": "budi.santoso@mail.com"
    },
    "ownerKtpAddress": {
      "streetName": "Jl. Kebon Sirih No. 5",
      "rt": "03",
      "rw": "04",
      "provinceId": "dki",
      "cityId": "jakarta",
      "districtId": "menteng",
      "subdistrictId": "gondangdia",
      "postalCode": "10310"
    },
    "ownerDomicileAddress": {
      "isSameAsKtp": true,
      "streetName": "Jl. Kebon Sirih No. 5",
      "rt": "03",
      "rw": "04",
      "provinceId": "dki",
      "cityId": "jakarta",
      "districtId": "menteng",
      "subdistrictId": "gondangdia",
      "postalCode": "10310"
    },
    "picAdmin": {
      "name": "Siti Aisyah",
      "email": "siti.aisyah@mail.com",
      "phoneNumber": "081377788899"
    },
    "settlement": {
      "bankName": "bca",
      "accountNumber": "1234567890",
      "accountName": "PT Nusantara Jaya Abadi",
      "email": "finance@nusantarajaya.co.id"
    }
  },
  "meta": {
    "merchant": {
      "establishedYear": "2018",
      "monthlyVolume": "50000000"
    },
    "owner": {
      "passportNumber": ""
    }
  }
}
```

---

## 5. Submit Onboarding — Response
### Response — Submit Onboarding
```json
{
  "success": true,
  "status": "SUBMITTED",
  "submittedAt": "2026-01-24T10:15:00Z",
  "message": "Pengajuan onboarding berhasil dikirim"
}
```

