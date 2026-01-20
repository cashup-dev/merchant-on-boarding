export const resources = {
  id: {
    translation: {
      signup: {
        title: "Merchant Onboarding",
        subtitle: "Pilih produk yang sesuai untuk memulai registrasi.",
        cta: "Lanjutkan",
        options: {
          pos: {
            tag: "Recommended",
            title: "Ke POS",
            description:
              "Cocok untuk merchant yang ingin register POS dengan data usaha inti.",
          },
          cashlez: {
            tag: "Quick start",
            title: "Cashlez Link",
            description:
              "Ideal untuk bisnis yang butuh link pembayaran cepat tanpa setup rumit.",
          },
          softpos: {
            tag: "Complete",
            title: "SoftPOS",
            description:
              "Pilihan lengkap untuk merchant yang butuh onboarding end-to-end.",
          },
        },
        register: {
          title: "Buat akun Anda",
          subtitle: "Lengkapi data di bawah untuk melanjutkan proses onboarding.",
          fields: {
            fullName: {
              label: "Nama lengkap",
              placeholder: "Nama sesuai KTP",
            },
            businessName: {
              label: "Nama usaha",
              placeholder: "Nama usaha",
            },
            email: {
              label: "Email",
              placeholder: "nama@bisnis.com",
            },
            phoneNumber: {
              label: "Nomor telepon",
              placeholder: "+62 812 3456 7890",
            },
            password: {
              label: "Password",
              placeholder: "Masukan password",
            },
            confirmPassword: {
              label: "Konfirmasi password",
              placeholder: "Konfirmasi password",
            },
            referral: {
              label: "Perwakilan sales Cashlez",
              optional: "(opsional)",
              placeholder: "Masukkan nama sales Cashlez",
            },
          },
          actions: {
            next: "Selanjutnya",
            haveAccount: "Memiliki Akun ?",
            signIn: "Masuk",
          },
        },
      },
      onboarding: {
        businessType: {
          title: "Tipe Bisnis",
          subtitle: "Pilih tipe bisnis Anda untuk melanjutkan proses onboarding.",
          introTitle: "Mari kita mulai",
          introDescription: "Kami ingin tahu lebih banyak tentang Anda dan jenis bisnis Anda.",
          options: {
            individual: {
              title: "Individu",
              description: "Bisnis yang dimiliki dan dikelola oleh satu individu.",
            },
            company: {
              title: "Perusahaan",
              description:
                "Bisnis yang dimiliki oleh suatu entitas dan memiliki hak dan kewajiban hukum sendiri.",
            },
          },
          companyTypeTitle: "Tipe perusahaan Anda:",
          companyTypes: {
            pt: "PT",
            cv: "CV",
            firma: "Firma",
            koperasi: "Koperasi",
            nirlaba: "Nirlaba",
          },
          actions: {
            clear: "Clear all",
            submit: "Submit",
          },
        },
          paymentFeature: {
            title: "Fitur Pembayaran",
            subtitle: "Pilih produk atau fitur pembayaran cashUP yang ingin digunakan.",
            note: "Semua fitur dapat digunakan dalam 1-3 hari setelah tim cashUP menyetujui permintaan Anda.",
          options: {
            cashlez: {
              title: "Cashlez",
              description: "Lorem ipsum dolor sit.",
              detail: "Metode tersedia: VA, transfer bank, e-wallet, QRIS, kartu.",
            },
            czlink: {
              title: "softPOS",
              description: "Kirim pembayaran melalui Link",
              detail: "Lorem ipsum dolor sit amet",
            },
            softpos: {
              title: "Softpos",
              description: "Kirim pembayaran kartu melalui smartphone anda",
              detail: "Lorem ipsum dolor sit amet",
            },
          },
            actions: {
              previous: "Previous",
              submit: "Submit",
            },
          },
          edcInformation: {
            title: "Informasi EDC",
            subtitle: "Lengkapi kebutuhan EDC untuk merchant Anda.",
            fields: {
              edcOwnership: {
                label: "Kepemilikan EDC",
                placeholder: "Pilih kepemilikan EDC",
                options: {
                  buy: "Beli",
                  rent: "Sewa",
                },
              },
              edcType: {
                label: "Tipe EDC",
                placeholder: "Pilih tipe EDC",
                options: {
                  t6d: "T6D",
                  topwiseT1Plus: "Topwise T1 Plus",
                  topwiseQ1: "Topwise Q1",
                  centerm: "Centerm",
                  soundboxNewlandVb90s: "Soundbox Newland VB90S",
                  soundboxNewlandVb80p: "Soundbox Newland VB80P",
                },
              },
              edcCount: {
                label: "Jumlah EDC",
                placeholder: "Masukkan jumlah EDC",
              },
            },
            shippingAddress: {
              title: "Alamat Pengiriman",
              subtitle: "Pastikan alamat ini dapat menerima pengiriman perangkat EDC.",
              streetName: {
                label: "Nama Jalan",
                placeholder: "Nama jalan dan nomor",
              },
              addressNumber: {
                label: "Nomor Alamat",
                placeholder: "Masukkan nomor alamat",
              },
              rt: {
                label: "RT",
                placeholder: "RT",
              },
              rw: {
                label: "RW",
                placeholder: "RW",
              },
              province: {
                label: "Provinsi",
                placeholder: "Masukkan provinsi",
              },
              city: {
                label: "Kota/Kabupaten",
                placeholder: "Masukkan kota/kabupaten",
              },
              district: {
                label: "Kecamatan",
                placeholder: "Masukkan kecamatan",
              },
              subDistrict: {
                label: "Kelurahan",
                placeholder: "Masukkan kelurahan",
              },
              postalCode: {
                label: "Kode Pos",
                placeholder: "Masukkan kode pos",
              },
            },
          },
          businessEntity: {
            title: "Informasi Merchant/Badan Usaha",
            subtitle: "Isi data usaha dan dokumen pendukung untuk proses verifikasi.",
          steps: {
            business: "Informasi Bisnis",
            address: "Alamat Bisnis",
            bank: "Detail Bank & Dokumen",
          },
          actions: {
            previous: "Sebelumnya",
            clearAll: "Bersihkan",
            next: "Lanjut",
            submit: "Kirim",
          },
          common: {
            required: "(wajib diisi)",
            seeGuideline: "Lihat panduan",
          },
          business: {
            companyLogo: {
              label: "Logo Perusahaan",
              previewAlt: "Pratinjau logo",
              helper: "Hanya JPEG/PNG dengan ukuran maksimal 5MB.",
            },
            brandName: {
              label: "Nama Brand",
              placeholder: "Terisi otomatis dari signup",
            },
            legalName: {
              label: "Nama Legal Usaha",
              placeholder: "mis. PT Sejahtera",
            },
            description: {
              label: "Deskripsi Usaha",
              placeholder: "Ceritakan tentang bisnis Anda",
            },
            category: {
              label: "Kategori Usaha",
              placeholder: "Pilih kategori",
              options: {
                food: "Makanan & Minuman",
                retail: "Retail",
                service: "Jasa",
                travel: "Travel",
                health: "Kesehatan",
              },
            },
            establishedYear: {
              label: "Berdiri Sejak",
              placeholder: "Pilih tahun",
            },
            employeeCount: {
              label: "Jumlah Karyawan",
              placeholder: "Pilih",
              options: {
                "1_5": "1-5",
                "6_20": "6-20",
                "21_50": "21-50",
                "51_200": "51-200",
                "200_plus": "200+",
              },
            },
            monthlyVolume: {
              label: "Perkiraan Volume Transaksi Bulanan",
              placeholder: "Pilih volume",
              options: {
                lt_10m: "< 10 juta",
                "10_50m": "10 - 50 juta",
                "50_200m": "50 - 200 juta",
                "200_500m": "200 - 500 juta",
                gt_500m: "> 500 juta",
              },
            },
            socialLink: {
              label: "Website Bisnis atau Media Sosial",
              placeholder: "www.brandanda.com",
              options: {
                website: "Website",
                instagram: "Instagram",
                facebook: "Facebook",
                tiktok: "TikTok",
              },
            },
          },
          address: {
            province: {
              label: "Provinsi",
              placeholder: "Pilih provinsi",
              options: {
                dki: "DKI Jakarta",
                jabar: "Jawa Barat",
                jateng: "Jawa Tengah",
                jatim: "Jawa Timur",
              },
            },
            city: {
              label: "Kota",
              placeholder: "Pilih kota",
              options: {
                jakarta: "Jakarta",
                bandung: "Bandung",
                semarang: "Semarang",
                surabaya: "Surabaya",
              },
            },
            district: {
              label: "Kecamatan",
              placeholder: "Pilih kecamatan",
              options: {
                district1: "Kecamatan 1",
                district2: "Kecamatan 2",
              },
            },
            subDistrict: {
              label: "Kelurahan",
              placeholder: "Pilih kelurahan",
              options: {
                sub1: "Kelurahan 1",
                sub2: "Kelurahan 2",
              },
            },
            addressDetail: {
              label: "Nama jalan",
              placeholder: "Nama jalan",
            },
            houseNumber: {
              label: "Nomor alamat",
              placeholder: "Masukkan nomor alamat",
            },
            rt: {
              label: "RT",
              placeholder: "RT",
            },
            rw: {
              label: "RW",
              placeholder: "RW",
            },
            postalCode: {
              label: "Kode Pos",
              placeholder: "Kode pos",
            },
            officePhoto: {
              title: "Foto Kantor",
              helper: "Hanya JPEG/PNG, maksimal 5MB.",
              inside: {
                label: "Foto Ruangan Dalam",
                previewAlt: "Pratinjau ruangan dalam",
              },
              outside: {
                label: "Foto Ruangan Luar",
                previewAlt: "Pratinjau ruangan luar",
              },
            },
          },
          bank: {
            uploadNote: "Unggah dokumen hanya JPEG, JPG, PNG, PDF dengan ukuran maksimal 5 MB",
            ownerSection: {
              title: "Informasi Pemilik/Direktur",
              ktp: {
                label: "Foto KTP",
                previewAlt: "Pratinjau KTP",
              },
              npwpPhoto: {
                label: "Foto NPWP",
                previewAlt: "Pratinjau NPWP",
              },
              name: {
                label: "Nama",
                placeholder: "Masukkan nama",
                helper: "Sesuai KTP",
              },
              nik: {
                label: "NIK/KITAS",
                placeholder: "123456789101112",
                helper: "Sesuai Akta Pendirian/Perubahan Perusahaan",
              },
              npwp: {
                label: "NPWP",
                placeholder: "1414 1414 1414 1414",
                helper: "Sesuai Akta Pendirian/Perubahan Perusahaan",
              },
              addressKtp: {
                title: "Alamat Sesuai KTP",
                streetName: "Nama jalan",
                streetNamePlaceholder: "Nama jalan, nomor, dan detail alamat",
                addressNumber: "Nomor alamat",
                addressNumberPlaceholder: "Nomor alamat",
                rt: "RT",
                rtPlaceholder: "RT",
                rw: "RW",
                rwPlaceholder: "RW",
                province: "Provinsi",
                city: "Kota",
                district: "Kecamatan",
                subDistrict: "Kelurahan",
                postalCode: "Kode Pos",
              },
              addressDomicile: {
                title: "Alamat Domisili",
                sameAsKtp: "Sama dengan KTP",
                streetName: "Nama jalan",
                streetNamePlaceholder: "Nama jalan, nomor, dan detail alamat",
                addressNumber: "Nomor alamat",
                addressNumberPlaceholder: "Nomor alamat",
                rt: "RT",
                rtPlaceholder: "RT",
                rw: "RW",
                rwPlaceholder: "RW",
                province: "Provinsi",
                city: "Kota",
                district: "Kecamatan",
                subDistrict: "Kelurahan",
                postalCode: "Kode Pos",
              },
              address: {
                label: "Alamat Pemilik",
                placeholder: "Nama jalan, nomor, dan detail alamat",
              },
              addressNumber: {
                label: "Nomor Alamat",
                placeholder: "Masukkan nomor alamat",
              },
              rt: {
                label: "RT",
                placeholder: "RT",
              },
              rw: {
                label: "RW",
                placeholder: "RW",
              },
              postalCode: {
                label: "Kode Pos",
                placeholder: "Masukkan kode pos",
              },
            },
            legalDocuments: {
              title: "Dokumen Legal",
              note: "Format file harus PDF.",
              nibNumber: {
                label: "Nomor Induk Berusaha (NIB)",
              },
              nibDocument: {
                label: "Dokumen NIB",
              },
              deedEstablishment: {
                label: "Akta Pendirian Perusahaan",
              },
              skMenkumhamEstablishment: {
                label: "SK Menkumham Akta Pendirian",
              },
              deedAmendment: {
                label: "Akta Perubahan Akhir (opsional)",
                helper: "Unggah dokumen jika ada perubahan data di Akta Pendirian Perusahaan.",
              },
              skMenkumhamAmendment: {
                label: "SK Menkumham Akta Perubahan Akhir (opsional)",
                helper: "Dokumen ini wajib jika Anda mengunggah Akta Perubahan Akhir.",
              },
              pseLicense: {
                label: "Izin PSE (Penyelenggaraan Sistem Elektronik)",
              },
            },
            bankSection: {
              title: "Informasi Bank",
              subtitle: "Dana akan diterima ke rekening ini",
              bankName: {
                label: "Nama Bank",
                placeholder: "Pilih bank",
              },
              accountNumber: {
                label: "Nomor Rekening Bank",
                placeholder: "Masukkan nomor rekening",
              },
              accountName: {
                label: "Nama Pemilik Rekening",
                placeholder: "Masukkan nama pemilik rekening",
              },
              bankBook: {
                label: "Cover Buku Tabungan",
                previewAlt: "Pratinjau buku tabungan",
              },
              bankMutation: {
                label: "Mutasi Rekening 3 Bulan Terakhir",
                previewAlt: "Pratinjau mutasi rekening",
              },
              sku: {
                label: "Dokumen SKU",
                previewAlt: "Pratinjau dokumen SKU",
              },
            },
          },
        },
        inReview: {
          title: "Pengajuan Dalam Review",
          subtitle: "Tim cashUP sedang meninjau data Anda. Proses ini maksimal 3 hari kerja.",
        },
        finish: {
          title: "Selamat datang di cashUP",
          subtitle:
            "Akun Anda siap melaju. Saatnya membuka peluang baru, melayani lebih banyak pelanggan, dan tumbuh lebih cepat bersama cashUP.",
          cta: "Buka cashPortal",
        },
        landing: {
          note:
            "Data sebelumnya tersimpan otomatis, jadi Anda bisa melanjutkan pendaftaran kapan saja.",
          cta: "Lanjutkan",
        },
      },
        sidebar: {
          sections: {
            menu: "Menu",
            onboarding: "Onboarding",
            language: "Bahasa",
            accessControl: "Access Control",
            app2app: "APP2APP",
            ecr: "ECR",
            host2host: "HOST2HOST",
          },
          menu: {
            dashboard: "Dashboard",
            salesMerchants: "Sales Merchants",
            merchants: "Merchants",
            app2app: "APP2APP",
            cdcpQris: "CDCP & QRIS",
            miniAtmApp2app: "Mini ATM",
            ecr: "ECR",
            erica: "ERICA",
            carla: "CARLA",
            host2host: "HOST2HOST",
            cdcpQprs: "CDCP & QRPS",
            bnpl: "BNPL",
            cnp: "CNP",
            cashlezLink: "Cashlez Link",
            miniAtmHost2host: "Mini ATM",
            roles: "Roles",
            users: "Users",
          },
          onboarding: {
            progress: "Progress",
            steps: {
            businessType: {
              title: "Tipe Bisnis",
              description: "Individu atau perusahaan",
            },
              paymentFeature: {
                title: "Fitur Pembayaran",
                description: "Pilih layanan cashUP",
              },
              edcInformation: {
                title: "Informasi EDC",
                description: "Data mesin EDC merchant",
              },
              representative: {
                title: "Pemilik/Perwakilan Bisnis",
                description: "Data pemilik & perwakilan",
              },
            businessEntity: {
              title: "Informasi Merchant/Badan Usaha",
              description: "Profil usaha & dokumen",
            },
            terms: {
              title: "Terms",
              description: "Syarat & persetujuan",
            },
            inReview: {
              title: "In Review",
              description: "Proses verifikasi",
            },
            finish: {
              title: "Finish",
              description: "Mulai dengan cashUP",
            },
          },
        },
      },
    },
  },
  en: {
    translation: {
      signup: {
        title: "Merchant Onboarding",
        subtitle: "Choose the product that fits your registration needs.",
        cta: "Continue",
        options: {
          pos: {
            tag: "Recommended",
            title: "To POS",
            description:
              "Best for merchants who want POS registration with core business data.",
          },
          cashlez: {
            tag: "Quick start",
            title: "Cashlez Link",
            description:
              "Ideal for businesses that need a fast payment link without a complex setup.",
          },
          softpos: {
            tag: "Complete",
            title: "SoftPOS",
            description:
              "Full onboarding for merchants that need an end-to-end setup.",
          },
        },
        register: {
          title: "Create your account",
          subtitle: "Fill in the details below to continue the onboarding process.",
          fields: {
            fullName: {
              label: "Full name",
              placeholder: "Name as on ID",
            },
            businessName: {
              label: "Business name",
              placeholder: "Business name",
            },
            email: {
              label: "Email",
              placeholder: "name@business.com",
            },
            phoneNumber: {
              label: "Phone number",
              placeholder: "+62 812 3456 7890",
            },
            password: {
              label: "Password",
              placeholder: "Enter password",
            },
            confirmPassword: {
              label: "Confirm password",
              placeholder: "Confirm password",
            },
            referral: {
              label: "Cashlez sales representative",
              optional: "(optional)",
              placeholder: "Enter Cashlez sales name",
            },
          },
          actions: {
            next: "Next",
            haveAccount: "Already have an account?",
            signIn: "Sign in",
          },
        },
      },
      onboarding: {
        businessType: {
          title: "Business Type",
          subtitle: "Choose your business type to continue the onboarding process.",
          introTitle: "Let's get started",
          introDescription: "We want to know more about you and your business type.",
          options: {
            individual: {
              title: "Individual",
              description: "A business owned and managed by a single individual.",
            },
            company: {
              title: "Company",
              description:
                "A business owned by an entity with its own legal rights and obligations.",
            },
          },
          companyTypeTitle: "Your company type:",
          companyTypes: {
            pt: "PT",
            cv: "CV",
            firma: "Firm",
            koperasi: "Cooperative",
            nirlaba: "Non-profit",
          },
          actions: {
            clear: "Clear all",
            submit: "Submit",
          },
        },
          paymentFeature: {
            title: "Payment Features",
            subtitle: "Choose the cashUP payment products or features you want to use.",
            note: "All features can be used within 1-3 days after the cashUP team approves your request.",
          options: {
            cashlez: {
              title: "Cashlez",
              description: "Lorem ipsum dolor sit.",
              detail: "Available methods: VA, bank transfer, e-wallet, QRIS, card.",
            },
            czlink: {
              title: "Cashlez Link",
              description: "Send payments via link",
              detail: "Lorem ipsum dolor sit amet",
            },
            softpos: {
              title: "Softpos",
              description: "Send payments via link",
              detail: "Lorem ipsum dolor sit amet",
            },
          },
            actions: {
              previous: "Previous",
              submit: "Submit",
            },
          },
          edcInformation: {
            title: "EDC Information",
            subtitle: "Provide the EDC requirements for this merchant.",
            fields: {
              edcOwnership: {
                label: "EDC Ownership",
                placeholder: "Select EDC ownership",
                options: {
                  buy: "Buy",
                  rent: "Rent",
                },
              },
              edcType: {
                label: "EDC Type",
                placeholder: "Select EDC type",
                options: {
                  t6d: "T6D",
                  topwiseT1Plus: "Topwise T1 Plus",
                  topwiseQ1: "Topwise Q1",
                  centerm: "Centerm",
                  soundboxNewlandVb90s: "Soundbox Newland VB90S",
                  soundboxNewlandVb80p: "Soundbox Newland VB80P",
                },
              },
              edcCount: {
                label: "EDC Quantity",
                placeholder: "Enter number of EDC units",
              },
            },
            shippingAddress: {
              title: "Shipping Address",
              subtitle: "Make sure this address can receive the EDC shipment.",
              streetName: {
                label: "Street Name",
                placeholder: "Street name and number",
              },
              addressNumber: {
                label: "Address Number",
                placeholder: "Enter address number",
              },
              rt: {
                label: "RT",
                placeholder: "RT",
              },
              rw: {
                label: "RW",
                placeholder: "RW",
              },
              province: {
                label: "Province",
                placeholder: "Enter province",
              },
              city: {
                label: "City/Regency",
                placeholder: "Enter city or regency",
              },
              district: {
                label: "District",
                placeholder: "Enter district",
              },
              subDistrict: {
                label: "Sub-district",
                placeholder: "Enter sub-district",
              },
              postalCode: {
                label: "Postal Code",
                placeholder: "Enter postal code",
              },
            },
          },
          businessEntity: {
            title: "Merchant/Business Entity Information",
            subtitle: "Fill in business data and supporting documents for verification.",
          steps: {
            business: "Business Information",
            address: "Business Address",
            bank: "Bank & Document Detail",
          },
          actions: {
            previous: "Previous",
            clearAll: "Clear all",
            next: "Next",
            submit: "Submit",
          },
          common: {
            required: "(required)",
            seeGuideline: "See guideline",
          },
          business: {
            companyLogo: {
              label: "Company Logo",
              previewAlt: "Logo preview",
              helper: "Only JPEG/PNG with maximum size of 5MB.",
            },
            brandName: {
              label: "Brand Name",
              placeholder: "Autofill from signup",
            },
            legalName: {
              label: "Business Legal Name",
              placeholder: "e.g. PT Sejahtera",
            },
            description: {
              label: "Business Description",
              placeholder: "Tell us about your business",
            },
            category: {
              label: "Business Category",
              placeholder: "Select category",
              options: {
                food: "Food & Beverage",
                retail: "Retail",
                service: "Service",
                travel: "Travel",
                health: "Health",
              },
            },
            establishedYear: {
              label: "Established Since",
              placeholder: "Select year",
            },
            employeeCount: {
              label: "Current Employees",
              placeholder: "Select",
              options: {
                "1_5": "1-5",
                "6_20": "6-20",
                "21_50": "21-50",
                "51_200": "51-200",
                "200_plus": "200+",
              },
            },
            monthlyVolume: {
              label: "Estimated Monthly Transaction Volume",
              placeholder: "Select volume",
              options: {
                lt_10m: "< 10 million",
                "10_50m": "10 - 50 million",
                "50_200m": "50 - 200 million",
                "200_500m": "200 - 500 million",
                gt_500m: "> 500 million",
              },
            },
            socialLink: {
              label: "Business Website or Social Media Link",
              placeholder: "www.yourbrand.com",
              options: {
                website: "Website",
                instagram: "Instagram",
                facebook: "Facebook",
                tiktok: "TikTok",
              },
            },
          },
          address: {
            province: {
              label: "Province",
              placeholder: "Select province",
              options: {
                dki: "DKI Jakarta",
                jabar: "West Java",
                jateng: "Central Java",
                jatim: "East Java",
              },
            },
            city: {
              label: "City",
              placeholder: "Select city",
              options: {
                jakarta: "Jakarta",
                bandung: "Bandung",
                semarang: "Semarang",
                surabaya: "Surabaya",
              },
            },
            district: {
              label: "District",
              placeholder: "Select district",
              options: {
                district1: "District 1",
                district2: "District 2",
              },
            },
            subDistrict: {
              label: "Sub-district",
              placeholder: "Select sub-district",
              options: {
                sub1: "Sub-district 1",
                sub2: "Sub-district 2",
              },
            },
            addressDetail: {
              label: "Street name",
              placeholder: "Street name",
            },
            houseNumber: {
              label: "Address number",
              placeholder: "Enter address number",
            },
            rt: {
              label: "RT",
              placeholder: "RT",
            },
            rw: {
              label: "RW",
              placeholder: "RW",
            },
            postalCode: {
              label: "Postal Code",
              placeholder: "Postal code",
            },
            officePhoto: {
              title: "Office Photo",
              helper: "Only JPEG/PNG, max 5MB.",
              inside: {
                label: "Inside Office Room Photo",
                previewAlt: "Inside office preview",
              },
              outside: {
                label: "Outside Office Room Photo",
                previewAlt: "Outside office preview",
              },
            },
          },
          bank: {
            uploadNote: "Upload documents only in JPEG, JPG, PNG, PDF with maximum file size of 5 MB",
            ownerSection: {
              title: "Owner/Director Information",
              ktp: {
                label: "ID (KTP) Photo",
                previewAlt: "ID preview",
              },
              npwpPhoto: {
                label: "NPWP Photo",
                previewAlt: "NPWP preview",
              },
              name: {
                label: "Name",
                placeholder: "Input name",
                helper: "As per ID",
              },
              nik: {
                label: "NIK/KITAS",
                placeholder: "123456789101112",
                helper: "As per deed of establishment/amendment",
              },
              npwp: {
                label: "NPWP",
                placeholder: "1414 1414 1414 1414",
                helper: "As per deed of establishment/amendment",
              },
              addressKtp: {
                title: "Address As Per ID",
                streetName: "Street name",
                streetNamePlaceholder: "Street name, number, and address details",
                addressNumber: "Address number",
                addressNumberPlaceholder: "Address number",
                rt: "RT",
                rtPlaceholder: "RT",
                rw: "RW",
                rwPlaceholder: "RW",
                province: "Province",
                city: "City",
                district: "District",
                subDistrict: "Sub-district",
                postalCode: "Postal code",
              },
              addressDomicile: {
                title: "Domicile Address",
                sameAsKtp: "Same as ID",
                streetName: "Street name",
                streetNamePlaceholder: "Street name, number, and address details",
                addressNumber: "Address number",
                addressNumberPlaceholder: "Address number",
                rt: "RT",
                rtPlaceholder: "RT",
                rw: "RW",
                rwPlaceholder: "RW",
                province: "Province",
                city: "City",
                district: "District",
                subDistrict: "Sub-district",
                postalCode: "Postal code",
              },
              address: {
                label: "Owner Address",
                placeholder: "Street name, number, and address details",
              },
              addressNumber: {
                label: "Address Number",
                placeholder: "Enter address number",
              },
              rt: {
                label: "RT",
                placeholder: "RT",
              },
              rw: {
                label: "RW",
                placeholder: "RW",
              },
              postalCode: {
                label: "Postal Code",
                placeholder: "Enter postal code",
              },
            },
            legalDocuments: {
              title: "Legal Documents",
              note: "File format must be PDF.",
              nibNumber: {
                label: "Business Registration Number (NIB)",
              },
              nibDocument: {
                label: "NIB Document",
              },
              deedEstablishment: {
                label: "Deed of Establishment",
              },
              skMenkumhamEstablishment: {
                label: "MOLHR Deed Approval Letter",
              },
              deedAmendment: {
                label: "Latest Deed Amendment (optional)",
                helper: "Upload if there are changes from the Deed of Establishment.",
              },
              skMenkumhamAmendment: {
                label: "MOLHR Amendment Approval Letter (optional)",
                helper: "Required if you upload the Latest Deed Amendment.",
              },
              pseLicense: {
                label: "PSE License (Electronic System Operator)",
              },
            },
            bankSection: {
              title: "Bank Information",
              subtitle: "You will receive funds to this account",
              bankName: {
                label: "Bank Name",
                placeholder: "Select bank",
              },
              accountNumber: {
                label: "Bank Account Number",
                placeholder: "Enter account number",
              },
              accountName: {
                label: "Account Holder Name",
                placeholder: "Enter account holder name",
              },
              bankBook: {
                label: "Savings Book Cover",
                previewAlt: "Savings book preview",
              },
              bankMutation: {
                label: "Last 3 Months Account Statement",
                previewAlt: "Account statement preview",
              },
              sku: {
                label: "SKU Document",
                previewAlt: "SKU document preview",
              },
            },
          },
        },
        inReview: {
          title: "Submission Under Review",
          subtitle: "The cashUP team is reviewing your data. This process takes up to 3 business days.",
        },
        finish: {
          title: "Welcome to cashUP",
          subtitle:
            "Your account is ready to go. It's time to unlock new opportunities, serve more customers, and grow faster with cashUP.",
          cta: "Open cashPortal",
        },
        landing: {
          note:
            "Your previous data is saved automatically, so you can continue registration anytime.",
          cta: "Continue",
        },
      },
        sidebar: {
          sections: {
            menu: "Menu",
            onboarding: "Onboarding",
            language: "Language",
            accessControl: "Access Control",
            app2app: "APP2APP",
            ecr: "ECR",
            host2host: "HOST2HOST",
          },
          menu: {
            dashboard: "Dashboard",
            salesMerchants: "Sales Merchants",
            merchants: "Merchants",
            app2app: "APP2APP",
            cdcpQris: "CDCP & QRIS",
            miniAtmApp2app: "Mini ATM",
            ecr: "ECR",
            erica: "ERICA",
            carla: "CARLA",
            host2host: "HOST2HOST",
            cdcpQprs: "CDCP & QRPS",
            bnpl: "BNPL",
            cnp: "CNP",
            cashlezLink: "Cashlez Link",
            miniAtmHost2host: "Mini ATM",
            roles: "Roles",
            users: "Users",
          },
          onboarding: {
            progress: "Progress",
            steps: {
            businessType: {
              title: "Business Type",
              description: "Individual or company",
            },
              paymentFeature: {
                title: "Payment Features",
                description: "Choose cashUP services",
              },
              edcInformation: {
                title: "EDC Information",
                description: "Merchant EDC details",
              },
              representative: {
                title: "Business Representative",
                description: "Owner & representative data",
              },
            businessEntity: {
              title: "Merchant/Business Entity",
              description: "Business profile & documents",
            },
            terms: {
              title: "Terms",
              description: "Agreements & consent",
            },
            inReview: {
              title: "In Review",
              description: "Verification process",
            },
            finish: {
              title: "Finish",
              description: "Start with cashUP",
            },
          },
        },
      },
    },
  },
} as const;
