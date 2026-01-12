"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React, { useState } from "react";

export default function SignUpForm() {
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
                  Buat akun Anda
                </h2>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Lengkapi data di bawah untuk melanjutkan proses onboarding.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label htmlFor="fullName">
                    Nama lengkap
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
                  <Label htmlFor="businessName">
                    Nama usaha
                  </Label>
                  <Input
                    id="businessName"
                    name="businessName"
                    placeholder="Nama usaha"
                    value={businessName}
                    onChange={(event) => setBusinessName(event.target.value)}
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="email">
                    Email
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
                    Nomor telepon
                  </Label>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="+62 812 3456 7890"
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
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Masukan password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="confirmPassword">
                    Konfirmasi password
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Konfirmasi password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                  />
                </div>
                
                <div className="sm:col-span-2">
                  <Label htmlFor="referralCode">
                    Referral code<span className="ml-2 text-xs text-gray-400">(opsional)</span>
                  </Label>
                  <Input
                    id="referralCode"
                    name="referralCode"
                    placeholder="Masukkan referral code"
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
        </div>
      </div>
    </div>
  );
}
