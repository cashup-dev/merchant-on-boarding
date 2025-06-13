// src/app/(admin)/(others-pages)/promo-management/page.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PromoRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/promo-management/list");
  }, [router]);

  return null;
}
