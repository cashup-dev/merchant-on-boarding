"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function SignUpForm() {
  const { t } = useTranslation();
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [referralCode, setReferralCode] = useState("");

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full overflow-y-auto no-scrollbar">
      <div className="flex flex-col justify-center flex-1 w-full max-w-2xl mx-auto">
        <div>
          <div className="border-gray-200 bg-white p-6">
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white/90">
                  {t("signup.register.title")}
                </h2>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {t("signup.register.subtitle")}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label htmlFor="fullName">
                    {t("signup.register.fields.fullName.label")}
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder={t("signup.register.fields.fullName.placeholder")}
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="businessName">
                    {t("signup.register.fields.businessName.label")}
                  </Label>
                  <Input
                    id="businessName"
                    name="businessName"
                    placeholder={t("signup.register.fields.businessName.placeholder")}
                    value={businessName}
                    onChange={(event) => setBusinessName(event.target.value)}
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="email">
                    {t("signup.register.fields.email.label")}
                  </Label>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder={t("signup.register.fields.email.placeholder")}
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    {/* <Button type="button" variant="outline" className="shrink-0">
                      Verify
                    </Button> */}
                  </div>
                </div>
                {/* <div>
                  <Label htmlFor="userId">
                    User ID
                  </Label>
                  <Input
                    id="userId"
                    name="userId"
                    placeholder="contoh: tokonusa"
                    value={userId}
                    onChange={(event) => setUserId(event.target.value)}
                  />
                </div> */}
                <div className="sm:col-span-2">
                  <Label htmlFor="phoneNumber">
                    {t("signup.register.fields.phoneNumber.label")}
                  </Label>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder={t("signup.register.fields.phoneNumber.placeholder")}
                      value={phoneNumber}
                      onChange={(event) => setPhoneNumber(event.target.value)}
                    />
                    {/* <Button type="button" variant="outline" className="shrink-0">
                      Verify
                    </Button> */}
                  </div>
                </div>
                <div>
                  <Label htmlFor="password">
                    {t("signup.register.fields.password.label")}
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder={t("signup.register.fields.password.placeholder")}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="confirmPassword">
                    {t("signup.register.fields.confirmPassword.label")}
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder={t("signup.register.fields.confirmPassword.placeholder")}
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                  />
                </div>
                
                <div className="sm:col-span-2">
                  <Label htmlFor="referralCode">
                    {t("signup.register.fields.referral.label")}
                    <span className="ml-2 text-xs text-gray-400">
                      {t("signup.register.fields.referral.optional")}
                    </span>
                  </Label>
                  <Input
                    id="referralCode"
                    name="referralCode"
                    placeholder={t("signup.register.fields.referral.placeholder")}
                    value={referralCode}
                    onChange={(event) => setReferralCode(event.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Button type="button" size="lg" className="w-full rounded-full">
                  {t("signup.register.actions.next")}
                </Button>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  {t("signup.register.actions.haveAccount")}{" "}
                  <Link href="/signin" className="font-medium text-brand-500 hover:text-brand-600">
                    {t("signup.register.actions.signIn")}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
