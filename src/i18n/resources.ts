export const resources = {
  id: {
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
    },
  },
  en: {
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
    },
  },
} as const;
