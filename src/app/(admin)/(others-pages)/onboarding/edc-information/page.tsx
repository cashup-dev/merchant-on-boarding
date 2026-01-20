import React from "react";
import EDCInformationClient from "./EDCInformationClient";

export const metadata = {
  title: "EDC Information",
  description: "Onboarding - EDC Information.",
};

export default function EDCInformationPage() {
  return (
    <section className="bg-white">
      <EDCInformationClient />
    </section>
  );
}
