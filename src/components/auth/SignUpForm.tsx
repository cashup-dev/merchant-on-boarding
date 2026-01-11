"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function SignUpForm() {
  const { t } = useTranslation("signup");
  const [step, setStep] = useState<"product" | "business" | "account">("product");
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [businessType, setBusinessType] = useState<string>("individual");
  const [companyType, setCompanyType] = useState<string>("pt");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [referralCode, setReferralCode] = useState("");

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full overflow-y-auto no-scrollbar">
      <div className="flex flex-col justify-center flex-1 w-full max-w-2xl mx-auto">
        <div>
          {step === "product" && !selectedProduct && (
            <div className="mb-6 sm:mb-8">
              <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 ">
                {t("title")}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t("subtitle")}
              </p>
            </div>
          )}

          {step === "product" && !selectedProduct && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                {
                  key: "pos",
                  tag: t("options.pos.tag"),
                  title: t("options.pos.title"),
                  description: t("options.pos.description"),
                },
                {
                  key: "cashlez",
                  tag: t("options.cashlez.tag"),
                  title: t("options.cashlez.title"),
                  description: t("options.cashlez.description"),
                },
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => {
                    setSelectedProduct(item.key);
                    setStep("business");
                  }}
                  className="group rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-theme-xs transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-theme-md dark:border-gray-800 dark:bg-gray-900"
                >
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.tag}</p>
                  <h3 className="mt-2 text-lg font-semibold text-gray-800 dark:text-white/90">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </button>
              ))}
            </div>
          )}

          {step === "business" && selectedProduct && (
            <div className="border-gray-200 bg-white p-6">
              <div className="flex flex-col gap-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Pilihan produk: {selectedProduct}
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedProduct(null);
                      setStep("product");
                    }}
                  >
                    Kembali ke pilihan produk
                  </Button>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white/90">
                    Mari kita mulai
                  </h2>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Pertama, kami ingin tahu lebih banyak tentang Anda dan jenis bisnis Anda.
                  </p>
                </div>

                <RadioGroup
                  value={businessType}
                  onValueChange={setBusinessType}
                  className="gap-4"
                >
                  <label className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-brand-300 dark:border-gray-800 dark:bg-gray-950">
                    <RadioGroupItem value="individual" />
                    <div>
                      <p className="text-base font-semibold text-gray-900 dark:text-white/90">
                        Individu
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Bisnis yang dimiliki dan dikelola oleh satu individu.
                      </p>
                    </div>
                  </label>
                  <label className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-brand-300 dark:border-gray-800 dark:bg-gray-950">
                    <RadioGroupItem value="company" />
                    <div>
                      <p className="text-base font-semibold text-gray-900 dark:text-white/90">
                        Perusahaan
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Bisnis yang dimiliki oleh suatu entitas dan memiliki hak dan kewajiban hukum sendiri.
                      </p>
                    </div>
                  </label>
                </RadioGroup>

                <div
                  className={`overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 p-4 transition-all duration-300 ease-out dark:border-gray-800 dark:bg-gray-950 ${
                    businessType === "company"
                      ? "mt-2 max-h-[400px] translate-y-0 opacity-100 blur-0"
                      : "mt-0 max-h-0 -translate-y-2 opacity-0 blur-sm pointer-events-none"
                  }`}
                >
                  <p className="text-sm font-medium text-gray-900 dark:text-white/90">
                    Tipe perusahaan Anda:
                  </p>
                  <RadioGroup
                    value={companyType}
                    onValueChange={setCompanyType}
                    className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3"
                  >
                    {[
                      { value: "pt", label: "PT" },
                      { value: "cv", label: "CV" },
                      { value: "firma", label: "Firma" },
                      { value: "koperasi", label: "Koperasi" },
                      { value: "nirlaba", label: "Nirlaba" },
                    ].map((item) => (
                      <label
                        key={item.value}
                        className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 text-sm font-medium text-gray-900 shadow-sm transition hover:border-brand-300 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90"
                      >
                        <RadioGroupItem value={item.value} />
                        {item.label}
                      </label>
                    ))}
                  </RadioGroup>
                </div>

                <div className="flex flex-col gap-4">
                  <Button
                    type="button"
                    size="lg"
                    className="w-full rounded-full"
                    onClick={() => setStep("account")}
                  >
                    Selanjutnya
                  </Button>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                    Memiliki Akun ?{" "}
                    <Link href="/signin" className="font-medium text-brand-500 hover:text-brand-600">
                      Masuk
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          )}

          {step === "account" && selectedProduct && (
            <div className="border-gray-200 bg-white p-6">
              <div className="flex flex-col gap-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Pilihan produk: {selectedProduct}
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setStep("business")}
                  >
                    Kembali ke step sebelumnya
                  </Button>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white/90">
                    Buat akun Anda
                  </h2>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Lengkapi data di bawah untuk melanjutkan proses onboarding.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Label htmlFor="fullName">
                      Nama lengkap<span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      placeholder="Nama sesuai KTP"
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="email">
                      Email<span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
                    </Label>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="nama@bisnis.com"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                      <Button type="button" variant="outline" className="shrink-0">
                        Verify
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="userId">
                      User ID<span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
                    </Label>
                    <Input
                      id="userId"
                      name="userId"
                      placeholder="contoh: tokonusa"
                      value={userId}
                      onChange={(event) => setUserId(event.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">
                      Password<span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Minimal 8 karakter"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="phoneNumber">
                      Nomor telepon<span className="ml-2 text-xs text-red-500">(wajib diisi)</span>
                    </Label>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder="+62 812 3456 7890"
                        value={phoneNumber}
                        onChange={(event) => setPhoneNumber(event.target.value)}
                      />
                      <Button type="button" variant="outline" className="shrink-0">
                        Verify
                      </Button>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="referralCode">Referral sales code</Label>
                    <Input
                      id="referralCode"
                      name="referralCode"
                      placeholder="Masukkan referral code (opsional)"
                      value={referralCode}
                      onChange={(event) => setReferralCode(event.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <Button type="button" size="lg" className="w-full rounded-full">
                    Selanjutnya
                  </Button>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                    Memiliki Akun ?{" "}
                    <Link href="/signin" className="font-medium text-brand-500 hover:text-brand-600">
                      Masuk
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
