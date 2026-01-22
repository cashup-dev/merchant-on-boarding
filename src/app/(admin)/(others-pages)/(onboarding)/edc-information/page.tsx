import React from "react";
import { redirect } from "next/navigation";

export const metadata = {
  title: "EDC Information",
  description: "Onboarding - EDC Information.",
};

export default function EDCInformationPage() {
  // Temporary: disable EDC step and route.
  redirect("/terms");
}
