import React from "react";
import BusinessTypeForm from "./BusinessTypeForm";

export const metadata = {
  title: "Tipe Bisnis",
  description: "Onboarding - pilih tipe bisnis.",
};

export default function BusinessTypePage() {
  return (
    <section className="bg-white">
      <BusinessTypeForm />
    </section>
  );
}
