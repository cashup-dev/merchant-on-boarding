"use client";
import React from "react";
import CreatePromoManagementForm from "@/components/promo-management/CreatePromoManagementForm";

export default function CreatePromoPage() {
  return (
    <CreatePromoManagementForm
      mode="create"
      onSuccess={() => {
        window.location.href = "/promo-management";
      }}
    />
  );
}
