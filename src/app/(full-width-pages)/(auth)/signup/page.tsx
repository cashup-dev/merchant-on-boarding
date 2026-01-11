import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merchant Onboarding",
  description: "Register a merchant for SoftPOS onboarding",
};

export default function SignUp() {
  return <SignUpForm />;
}
