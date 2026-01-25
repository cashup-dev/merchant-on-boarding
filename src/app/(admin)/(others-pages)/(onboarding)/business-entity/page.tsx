import { redirect } from "next/navigation";

export const metadata = {
  title: "Informasi Merchant/Badan Usaha",
  description: "Onboarding - informasi merchant atau badan usaha.",
};

export default function BusinessEntityPage() {
  redirect("/business-entity/merchant");
}
