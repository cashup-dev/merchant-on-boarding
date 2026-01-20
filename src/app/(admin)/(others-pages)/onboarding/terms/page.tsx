import React from "react";
import TermsAndFinishContent from "./TermsAndFinishContent";

export const metadata = {
  title: "Terms",
  description: "Onboarding - syarat dan persetujuan.",
};

export default function TermsAndFinishPage() {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <TermsAndFinishContent />
    </section>
  );
}



